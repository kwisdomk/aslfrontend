import { useState, useEffect, useMemo } from 'react';
import { Target, BookOpen, Briefcase, MessageSquare, AlertTriangle, GraduationCap, Zap, CheckCircle, Clock } from 'lucide-react';
import { AthenaCore, TabType, Task, SwerveStatus, DailyPriority, Phase } from './types';
import { PROFESSIONAL_ARM, ACADEMIC_ARM, SYSTEM_PROMPTS, CAREER_MAPS } from './constants';
import { ProtocolCard } from './components/ProtocolCard';
import { RadialProgress } from './components/RadialProgress';
import { AthenaChat } from './components/AthenaChat';

const STORAGE_KEY = 'athena_core_state';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Initialize state from localStorage or defaults
  const [athenaCore, setAthenaCore] = useState<AthenaCore>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          professional: {
            ...PROFESSIONAL_ARM,
            phases: PROFESSIONAL_ARM.phases.map(phase => ({
              ...phase,
              tasks: phase.tasks.map(task => {
                const savedPhase = parsed.professional?.phases?.find((p: Phase) => p.id === phase.id);
                const savedTask = savedPhase?.tasks?.find((t: Task) => t.id === task.id);
                return savedTask ? { ...task, progress: savedTask.progress } : task;
              })
            }))
          },
          academic: {
            ...ACADEMIC_ARM,
            phases: ACADEMIC_ARM.phases.map(phase => ({
              ...phase,
              tasks: phase.tasks.map(task => {
                const savedPhase = parsed.academic?.phases?.find((p: Phase) => p.id === phase.id);
                const savedTask = savedPhase?.tasks?.find((t: Task) => t.id === task.id);
                return savedTask ? { ...task, progress: savedTask.progress } : task;
              })
            }))
          },
          swerveMode: parsed.swerveMode || null
        };
      }
    } catch (error) {
      console.error('Failed to load saved state:', error);
    }
    return {
      professional: PROFESSIONAL_ARM,
      academic: ACADEMIC_ARM,
      swerveMode: null
    };
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(athenaCore));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }, [athenaCore]);

  // Calculate arm progress from all tasks in all phases
  const calculateArmProgress = (phases: Phase[]): number => {
    const allTasks = phases.flatMap(phase => phase.tasks);
    if (allTasks.length === 0) return 0;
    const total = allTasks.reduce((sum, task) => sum + task.progress, 0);
    return total / allTasks.length;
  };

  // Swerve Protocol Logic Gates
  const calculateLogicGates = (): SwerveStatus => {
    const profProgress = calculateArmProgress(athenaCore.professional.phases);
    const acadProgress = calculateArmProgress(athenaCore.academic.phases);
    const diff = profProgress - acadProgress;
    
    if (Math.abs(diff) <= 15) {
      return 'BALANCED';
    } else if (diff > 15) {
      return 'ACADEMIC_LAG';
    } else {
      return 'PROFESSIONAL_LAG';
    }
  };

  const swerveStatus = calculateLogicGates();
  const professionalProgress = calculateArmProgress(athenaCore.professional.phases);
  const academicProgress = calculateArmProgress(athenaCore.academic.phases);
  const overallProgress = (professionalProgress + academicProgress) / 2;

  // Calculate HPI Velocity
  const hpiVelocity = useMemo(() => {
    const totalProgress = overallProgress;
    const mockHoursLogged = 120;
    return ((totalProgress / mockHoursLogged) * 10).toFixed(2);
  }, [overallProgress]);

  // Get Daily Priorities
  const dailyPriorities = useMemo((): DailyPriority[] => {
    const allTasks: Task[] = [
      ...athenaCore.professional.phases.flatMap(p => p.tasks),
      ...athenaCore.academic.phases.flatMap(p => p.tasks)
    ];

    const priorityWeight = { Critical: 4, Anchor: 3, High: 2, Medium: 1, Low: 0 };
    
    const incompleteTasks = allTasks
      .filter(task => task.progress < 100)
      .sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority])
      .slice(0, 3);

    return incompleteTasks.map((task, index) => ({
      rank: index + 1,
      task,
      hardwareMode: index === 0 ? 'Performance Mode' : 'Balanced Mode',
      remainingHours: Math.ceil((100 - task.progress) / 10)
    }));
  }, [athenaCore]);

  // Update progress handler
  const handleProgressUpdate = (taskId: string, newProgress: number) => {
    setAthenaCore(prev => {
      const updateArm = (arm: typeof prev.professional | typeof prev.academic) => ({
        ...arm,
        phases: arm.phases.map(phase => ({
          ...phase,
          tasks: phase.tasks.map(task =>
            task.id === taskId ? { ...task, progress: newProgress } : task
          )
        }))
      });

      // Check which arm contains the task
      const profTask = prev.professional.phases.some(p => 
        p.tasks.some(t => t.id === taskId)
      );
      const acadTask = prev.academic.phases.some(p => 
        p.tasks.some(t => t.id === taskId)
      );

      return {
        ...prev,
        professional: profTask ? updateArm(prev.professional) : prev.professional,
        academic: acadTask ? updateArm(prev.academic) : prev.academic,
        swerveMode: swerveStatus
      };
    });
  };

  // Render phase list
  const renderPhaseList = (phases: Phase[]) => {
    return phases.map(phase => {
      const phaseProgress = calculateArmProgress([phase]);
      const phaseStatus = phaseProgress === 100 ? 'Completed' : phaseProgress > 0 ? 'In Progress' : 'Not Started';
      
      return (
        <div key={phase.id} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                {phase.name}
              </h4>
              {phase.description && (
                <p className="text-sm text-slate-600 mt-1">{phase.description}</p>
              )}
            </div>
            <span className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide ${
              phaseStatus === 'Completed' 
                ? 'bg-green-100/40 text-green-600 border border-green-200'
                : phaseStatus === 'In Progress'
                ? 'bg-blue-100/40 text-blue-600 border border-blue-200'
                : 'bg-slate-100/40 text-slate-600 border border-slate-200'
            }`}>
              {phaseStatus}
            </span>
          </div>
          
          <div className="space-y-4">
            {phase.tasks.map(task => (
              <ProtocolCard
                key={task.id}
                task={task}
                onProgressUpdate={handleProgressUpdate}
              />
            ))}
          </div>
        </div>
      );
    });
  };

  // Swerve alert configuration
  const getSwerveAlert = () => {
    switch (swerveStatus) {
      case 'ACADEMIC_LAG':
        return {
          message: SYSTEM_PROMPTS.academicLag,
          bgColor: 'bg-amber-500',
          textColor: 'text-amber-50',
          glowColor: 'bg-amber-400'
        };
      case 'PROFESSIONAL_LAG':
        return {
          message: SYSTEM_PROMPTS.professionalLag,
          bgColor: 'bg-amber-500',
          textColor: 'text-amber-50',
          glowColor: 'bg-amber-400'
        };
      default:
        return {
          message: SYSTEM_PROMPTS.balanced,
          bgColor: 'bg-rose-500',
          textColor: 'text-white',
          glowColor: 'bg-rose-400'
        };
    }
  };

  const alert = getSwerveAlert();
  const contextForAI = `Professional: ${professionalProgress.toFixed(1)}%, Academic: ${academicProgress.toFixed(1)}%, Status: ${swerveStatus}`;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5F7' }}>
      {/* Floating Glass Navbar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="max-w-7xl px-8 py-4 bg-white/70 backdrop-blur-xl border border-white/20 rounded-full shadow-glass">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-sm">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-slate-900 tracking-tight">Athena HPI</span>
                <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">v2.4.1</p>
              </div>
            </div>
            
            <div className="h-8 w-px bg-slate-200" />
            
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('professional')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'professional'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              >
                Professional
              </button>
              <button
                onClick={() => setActiveTab('academic')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'academic'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              >
                Academic
              </button>
            </div>
            
            <div className="h-8 w-px bg-slate-200" />
            
            <button
              onClick={() => setActiveTab('athena')}
              className={`px-5 py-2.5 rounded-full transition-all flex items-center gap-2 text-sm font-medium shadow-sm ${
                activeTab === 'athena'
                  ? 'bg-gradient-to-tr from-rose-500 to-orange-500 text-white'
                  : 'bg-rose-500 text-white hover:bg-rose-600'
              }`
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask Athena</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        {/* Mission Control Hero - Only on Dashboard */}
        {activeTab === 'dashboard' && (
          <div className={`relative rounded-[40px] p-12 mb-12 overflow-hidden ${alert.bgColor}`}>
            {/* Ambient Glow Orb */}
            <div 
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-glow opacity-40`}
              style={{ 
                backgroundColor: swerveStatus === 'BALANCED' ? 'rgba(244, 63, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'
              }}
            />
            
            <div className="relative z-10 flex items-center justify-between gap-12">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-white tracking-tight">Velocity Engine</h2>
                    <p className="text-xs text-white/70 font-mono uppercase tracking-wider mt-1">
                      HPI {hpiVelocity}x MULTIPLIER
                    </p>
                  </div>
                </div>

                {swerveStatus !== 'BALANCED' && (
                  <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 mb-8 max-w-2xl">
                    <AlertTriangle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold mb-1">SWERVE PROTOCOL ACTIVE</p>
                      <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                    <p className="text-xs text-white/70 font-mono uppercase tracking-wider mb-2">
                      Professional
                    </p>
                    <p className="text-4xl font-bold text-white font-mono tracking-tight">
                      {professionalProgress.toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                    <p className="text-xs text-white/70 font-mono uppercase tracking-wider mb-2">
                      Academic
                    </p>
                    <p className="text-4xl font-bold text-white font-mono tracking-tight">
                      {academicProgress.toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                    <p className="text-xs text-white/70 font-mono uppercase tracking-wider mb-2">
                      Swerve Status
                    </p>
                    <p className={`text-2xl font-bold font-mono tracking-tight ${
                      swerveStatus === 'BALANCED' ? 'text-green-300' : 'text-amber-300'
                    }`}>
                      {swerveStatus === 'BALANCED' ? '✓ BALANCED' : '⚠ LAG'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-full p-10 shadow-glass">
                <RadialProgress
                  progress={overallProgress}
                  size={180}
                  strokeWidth={14}
                  color="#FFFFFF"
                  label="Overall"
                />
              </div>
            </div>
          </div>
        )}

        {/* Ask Athena Full Page */}
        {activeTab === 'athena' && (
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-tr from-rose-400 to-orange-400 rounded-3xl flex items-center justify-center shadow-sm">
                  <MessageSquare className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Ask Athena</h2>
                  <p className="text-slate-600 mt-1">Your AI Strategic Planning Assistant</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-3xl p-6 border border-rose-200">
                <p className="text-sm text-slate-700 leading-relaxed">
                  <span className="font-semibold text-rose-600">Context-Aware Intelligence:</span> Athena has access to your current progress
                  (Professional: {professionalProgress.toFixed(1)}%, Academic: {academicProgress.toFixed(1)}%) 
                  and can provide personalized strategic advice based on your Swerve Status: <span className="font-mono font-semibold">{swerveStatus}</span>
                </p>
              </div>
            </div>
            
            <AthenaChat context={contextForAI} />
          </div>
        )}

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
              {/* Daily Priorities */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Daily Priorities</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Full Plan →
                  </button>
                </div>
                
                {dailyPriorities.map((priority) => (
                  <div key={priority.task.id} className="bg-white rounded-3xl p-6 shadow-glass hover:shadow-glass-hover transition-all border border-slate-100">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                        priority.rank === 1 
                          ? 'bg-rose-500 text-white' 
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {priority.rank}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-slate-900 mb-1">
                          {priority.task.name}
                        </h4>
                        <p className="text-sm text-slate-600 mb-3">
                          {priority.task.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-mono">
                            {priority.hardwareMode}
                          </span>
                          <span className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-4 h-4" />
                            {priority.remainingHours}h remaining
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-900 font-mono">
                          {priority.task.progress}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Systems Status */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">Systems Status</h3>
                
                <button
                  onClick={() => setActiveTab('professional')}
                  className={`w-full bg-white rounded-3xl p-8 shadow-glass hover:shadow-glass-hover transition-all border ${
                    swerveStatus === 'PROFESSIONAL_LAG' 
                      ? 'border-amber-500 ring-2 ring-amber-500' 
                      : 'border-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center">
                      <Briefcase className="w-8 h-8 text-rose-500" />
                    </div>
                    <p className="text-4xl font-bold text-slate-900 font-mono">
                      {professionalProgress.toFixed(0)}%
                    </p>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 text-left">
                    {PROFESSIONAL_ARM.name}
                  </h4>
                  <p className="text-sm text-slate-600 text-left mt-1">
                    {PROFESSIONAL_ARM.description}
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab('academic')}
                  className={`w-full bg-white rounded-3xl p-8 shadow-glass hover:shadow-glass-hover transition-all border ${
                    swerveStatus === 'ACADEMIC_LAG' 
                      ? 'border-amber-500 ring-2 ring-amber-500' 
                      : 'border-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-4xl font-bold text-slate-900 font-mono">
                      {academicProgress.toFixed(0)}%
                    </p>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 text-left">
                    {ACADEMIC_ARM.name}
                  </h4>
                  <p className="text-sm text-slate-600 text-left mt-1">
                    {ACADEMIC_ARM.description}
                  </p>
                </button>
              </div>
            </div>

            {/* Career Trajectory */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">Career Trajectory</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {CAREER_MAPS.map(role => (
                  <div key={role.id} className={`rounded-3xl p-6 border-2 transition-all ${
                    role.status === 'Earned'
                      ? 'bg-green-50 border-green-500'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-base font-semibold text-slate-900">
                        {role.name}
                      </h4>
                      {role.status === 'Earned' && (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      {role.description}
                    </p>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      role.status === 'Earned'
                        ? 'bg-green-100 text-green-700'
                        : role.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {role.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Professional & Academic Pages */}
        {(activeTab === 'professional' || activeTab === 'academic') && (
          <div>
            {activeTab === 'professional' && (
              <div>
                {/* ...existing professional content... */}
              </div>
            )}

            {activeTab === 'academic' && (
              <div>
                {/* ...existing academic content... */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
