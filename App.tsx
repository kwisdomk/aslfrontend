import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  Menu, 
  CheckCircle2,
  Shield,
  Server,
  Sun,
  Moon,
  Zap,
  Activity,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { USER_CONTEXT, PROFESSIONAL_ARM, ACADEMIC_ARM, CAREER_MAPS } from './constants';
import RadialProgress from './components/RadialProgress';
import ProtocolCard from './components/ProtocolCard';
import AthenaChat from './components/AthenaChat';
import { Task, Priority, HardwareMode } from './types';

// 1. The Core Data Blueprint (The "Brain")
const INITIAL_CORE_STATE = {
  academic: {
    semester: "Y2 S2",
    units: [
      { id: "DS", name: "Data Science", progress: 15, weight: 1.2 },
      { id: "SE", name: "Software Engineering", progress: 0, weight: 1.0 },
      { id: "MF", name: "Math Foundations", progress: 0, weight: 1.0 }
    ],
    hoursLogged: 45
  },
  professional: {
    internship: "IBM i3",
    tracks: [
      { id: "Q_SALES", name: "QRadar Tech Sales", progress: 57.14, bottleneck: false },
      { id: "Q_DEPLOY", name: "QRadar Deployment", progress: 0, bottleneck: true },
      { id: "CEH", name: "CEH v13", progress: 2, bottleneck: false }
    ],
    hoursLogged: 82
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'professional' | 'academic' | 'athena'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  // State: The Source of Truth
  const [athenaCore, setAthenaCore] = useState(INITIAL_CORE_STATE);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // 2. The Logic Gates (The "Swerve Protocol")
  const calculateLogicGates = () => {
    // A. Progress Calculations
    const acadProgress = athenaCore.academic.units.reduce((acc, u) => acc + u.progress, 0) / athenaCore.academic.units.length;
    const profProgress = athenaCore.professional.tracks.reduce((acc, t) => acc + t.progress, 0) / athenaCore.professional.tracks.length;
    const overallProgress = (acadProgress + profProgress) / 2;

    // B. Balance Check (Swerve Protocol)
    // If academic is < professional by 15%, status = ACADEMIC_LAG
    const isAcademicLag = acadProgress < (profProgress - 15);
    const swerveStatus = isAcademicLag ? 'ACADEMIC_LAG' : 'BALANCED';

    // C. Bottleneck Alert
    // If QRadar Deployment (Q_DEPLOY) is active (>0) or selected, trigger warning. 
    // For now, we check if it is active in the core data.
    const qDeploy = athenaCore.professional.tracks.find(t => t.id === 'Q_DEPLOY');
    const isBottleneckActive = qDeploy && qDeploy.bottleneck && qDeploy.progress > 0 && qDeploy.progress < 100;

    // D. HPI Velocity
    // (Total Progress Points / Total Hours Logged)
    const totalProgressPoints = 
        athenaCore.academic.units.reduce((a, b) => a + b.progress, 0) + 
        athenaCore.professional.tracks.reduce((a, b) => a + b.progress, 0);
    const totalHours = athenaCore.academic.hoursLogged + athenaCore.professional.hoursLogged;
    // Multiplier to make the coefficient look realistic (e.g. around 1.1 - 1.5)
    const velocity = totalHours > 0 ? ((totalProgressPoints / totalHours) * 2).toFixed(2) : "0.00";

    return {
      acadProgress,
      profProgress,
      overallProgress,
      swerveStatus,
      isBottleneckActive,
      velocity
    };
  };

  const { acadProgress, profProgress, overallProgress, swerveStatus, isBottleneckActive, velocity } = calculateLogicGates();

  // Helper to map Core Data back to UI Structures (ProtocolCards)
  const getAugmentedTasks = (arm: 'PROFESSIONAL' | 'ACADEMIC') => {
    const sourceConst = arm === 'PROFESSIONAL' ? PROFESSIONAL_ARM : ACADEMIC_ARM;
    const coreSource = arm === 'PROFESSIONAL' ? athenaCore.professional.tracks : athenaCore.academic.units;

    const allTasks: Task[] = [];
    
    sourceConst.forEach(phase => {
      phase.tasks.forEach(staticTask => {
        // Find dynamic progress from Core
        const coreTask = coreSource.find(t => t.id === staticTask.id);
        const progress = coreTask ? coreTask.progress : staticTask.progress;
        allTasks.push({ ...staticTask, progress });
      });
    });

    return allTasks;
  };

  const getDailyTasks = () => {
    const allTasks = [...getAugmentedTasks('PROFESSIONAL'), ...getAugmentedTasks('ACADEMIC')];
    return allTasks
      .filter(t => t.progress < 100)
      .sort((a, b) => {
        const priorityRank = {
            [Priority.CRITICAL]: 4,
            [Priority.HIGH]: 3,
            [Priority.STANDARD]: 2,
            [Priority.ANCHOR]: 1
        };
        const rankDiff = priorityRank[b.priority] - priorityRank[a.priority];
        if (rankDiff !== 0) return rankDiff;
        return b.progress - a.progress;
      })
      .slice(0, 3);
  };

  const dailyTasks = getDailyTasks();

  const renderDashboard = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* Hero Section - The "One Card" Concept */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-[40px] p-8 md:p-12 shadow-[0_30px_60px_rgb(0,0,0,0.05)] dark:shadow-none flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
         {/* Subtle Ambient Glow */}
         <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-colors duration-1000 ${swerveStatus === 'ACADEMIC_LAG' ? 'bg-amber-100/40 dark:bg-amber-900/10' : 'bg-rose-100/40 dark:bg-rose-900/10'}`}></div>
         
         <div className="relative z-10 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Welcome back, {USER_CONTEXT.name.split(' ')[0]}.
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mb-8 leading-relaxed">
              You are operating at <span className="text-rose-500 font-semibold">{velocity}x Velocity</span>. 
              {dailyTasks.length > 0 && ` Primary focus is ${dailyTasks[0].name}.`}
            </p>
            
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-4 py-2 rounded-full border border-slate-100 dark:border-white/5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">HPI: {velocity}</span>
                </div>
                {swerveStatus === 'ACADEMIC_LAG' ? (
                   <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-full border border-amber-100 dark:border-amber-700/30 animate-pulse">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">Swerve: Academic Lag</span>
                   </div>
                ) : (
                  <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full border border-green-100 dark:border-green-700/30">
                      <Activity className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-green-700 dark:text-green-400">Protocol Balanced</span>
                  </div>
                )}
                {isBottleneckActive && (
                   <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 px-4 py-2 rounded-full border border-rose-100 dark:border-rose-700/30">
                      <Server className="w-4 h-4 text-rose-500" />
                      <span className="text-sm font-semibold text-rose-700 dark:text-rose-400">1200 Hr Warning</span>
                   </div>
                )}
            </div>
         </div>

         <div className="relative z-10 mt-10 md:mt-0 flex-shrink-0">
             <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm p-6 rounded-full border border-slate-100/50 dark:border-white/5">
                <RadialProgress percentage={overallProgress} size={180} strokeWidth={8} />
             </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Col: Daily Briefing */}
        <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Daily Priorities</h2>
                <button className="text-rose-600 dark:text-rose-400 text-sm font-semibold hover:opacity-80 transition-opacity">
                    View Full Plan
                </button>
            </div>
            
            <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none p-2">
                {dailyTasks.map((task, idx) => (
                    <div key={idx} className="group flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-colors border-b border-slate-50 dark:border-white/5 last:border-0 cursor-pointer">
                        <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm ${idx === 0 ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300'}`}>
                                {idx + 1}
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white text-lg mb-1">{task.name}</h4>
                                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="font-medium text-rose-500 dark:text-rose-400 uppercase text-[11px] tracking-wider">{task.priority}</span>
                                    <span>•</span>
                                    <span>{task.mode}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="block text-xl font-bold text-slate-900 dark:text-white">{task.estimatedHours}h</span>
                            <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Remaining</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Right Col: Arm Status Tiles */}
        <div className="lg:col-span-5 space-y-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Systems Status</h2>
            <div className="grid grid-cols-1 gap-6">
                
                {/* Professional Tile */}
                <div 
                    onClick={() => setActiveTab('professional')}
                    className="bg-white dark:bg-[#1C1C1E] p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Briefcase className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">{profProgress.toFixed(0)}%</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">IBM Ecosystem</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        Identity & Data Security phases complete. QRadar active.
                    </p>
                </div>

                {/* Academic Tile */}
                <div 
                    onClick={() => setActiveTab('academic')}
                    className={`bg-white dark:bg-[#1C1C1E] p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none cursor-pointer group hover:scale-[1.02] transition-transform duration-300 ${swerveStatus === 'ACADEMIC_LAG' ? 'ring-2 ring-amber-500/50' : ''}`}
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-purple-50 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <GraduationCap className="w-7 h-7" />
                        </div>
                        <span className={`text-3xl font-bold ${swerveStatus === 'ACADEMIC_LAG' ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>{acadProgress.toFixed(0)}%</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Computer Science</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        {swerveStatus === 'ACADEMIC_LAG' ? 'CRITICAL: Academic Lag Detected. Swerve immediately.' : 'Critical load on Mathematical Foundations.'}
                    </p>
                </div>

            </div>
        </div>
      </div>
      
      {/* Career Matrix - Grid Layout */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">Career Trajectory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {CAREER_MAPS.map((map, idx) => (
                <div key={idx} className={`p-8 rounded-3xl border border-transparent ${map.status === 'Earned' ? 'bg-green-50/50 dark:bg-green-900/10' : 'bg-white dark:bg-[#1C1C1E]'} shadow-[0_4px_20px_rgb(0,0,0,0.02)] dark:shadow-none relative group hover:shadow-lg transition-all`}>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Role Map</p>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{map.technical}</h4>
                    
                    <div className="flex items-center gap-3">
                        <Shield className={`w-5 h-5 ${map.status === 'Earned' ? 'text-green-500' : 'text-slate-300 dark:text-slate-600'}`} />
                        <span className={`text-sm font-semibold ${map.status === 'Earned' ? 'text-green-700 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>
                            {map.status === 'Earned' ? 'Badge Secured' : 'Pending'}
                        </span>
                    </div>

                    {map.status === 'Earned' && (
                        <div className="absolute top-6 right-6 text-green-500">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderPhaseList = (phases: any[], arm: 'PROFESSIONAL' | 'ACADEMIC') => {
    // We need to merge the constant data with the Core state data to render accurate progress
    const augmentedPhases = phases.map(phase => {
        const augmentedTasks = phase.tasks.map((staticTask: Task) => {
            const coreSource = arm === 'PROFESSIONAL' ? athenaCore.professional.tracks : athenaCore.academic.units;
            const coreTask = coreSource.find(t => t.id === staticTask.id);
            return {
                ...staticTask,
                progress: coreTask ? coreTask.progress : staticTask.progress
            };
        });
        return { ...phase, tasks: augmentedTasks };
    });

    return (
        <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
            {augmentedPhases.map((phase) => (
                <div key={phase.id} className="relative">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`w-3 h-3 rounded-full ${phase.status === 'Completed' ? 'bg-green-500' : phase.status === 'In Progress' ? 'bg-rose-500' : 'bg-slate-300'}`}></div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{phase.name}</h3>
                            </div>
                            {phase.description && <p className="text-lg text-slate-500 dark:text-slate-400 pl-6">{phase.description}</p>}
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase ${phase.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'}`}>
                            {phase.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {phase.tasks.map((task: any) => (
                            <ProtocolCard key={task.id} task={task} />
                        ))}
                        {phase.tasks.length === 0 && phase.status !== 'Completed' && (
                            <div className="p-12 bg-slate-50 dark:bg-white/5 rounded-3xl text-center">
                                <p className="text-slate-400 font-medium">No active tasks initiated for this phase.</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
  };

  return (
    <div className="min-h-screen transition-colors duration-500">
      {/* Navbar - Floating Glass */}
      <nav className="fixed top-6 left-0 right-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-50">
        <div className="bg-white/70 dark:bg-[#1C1C1E]/70 backdrop-blur-xl rounded-full border border-white/20 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-black/20 h-16 flex items-center justify-between px-6 transition-all duration-300">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
                <div className="bg-slate-900 dark:bg-white p-1.5 rounded-lg">
                    <Server className="w-5 h-5 text-white dark:text-black" />
                </div>
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">Athena</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              {['dashboard', 'professional', 'academic'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)} 
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab ? 'bg-slate-900 text-white dark:bg-white dark:text-black' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
                <button 
                    onClick={() => setIsDark(!isDark)}
                    className="p-2.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white hover:scale-105 transition-transform"
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button 
                    onClick={() => setActiveTab('athena')} 
                    className={`hidden md:flex items-center px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg ${activeTab === 'athena' ? 'bg-rose-500 text-white shadow-rose-500/30' : 'bg-white dark:bg-white/10 text-rose-500 hover:bg-rose-50'}`}
                >
                    <Cpu className="w-4 h-4 mr-2" />
                    Ask Athena
                </button>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-500">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-24">
        {activeTab === 'dashboard' && renderDashboard()}
        
        {activeTab === 'professional' && (
            <div className="animate-in fade-in space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-200 dark:border-white/10 pb-8">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">IBM Ecosystem</h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400">Professional Arm & Technical Sales</p>
                    </div>
                    <div className="text-right mt-4 md:mt-0">
                         <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Current Target</p>
                         <p className="text-lg font-semibold text-rose-500">Technical Sales Advanced Badge</p>
                    </div>
                </div>
                {renderPhaseList(PROFESSIONAL_ARM, 'PROFESSIONAL')}
            </div>
        )}

        {activeTab === 'academic' && (
            <div className="animate-in fade-in space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-200 dark:border-white/10 pb-8">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Computer Science</h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400">Academic Degree & Foundations</p>
                    </div>
                     <div className="text-right mt-4 md:mt-0">
                         <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Critical Load</p>
                         <p className="text-lg font-semibold text-rose-500">Mathematical Foundations</p>
                    </div>
                </div>
                {renderPhaseList(ACADEMIC_ARM, 'ACADEMIC')}
            </div>
        )}

        {activeTab === 'athena' && (
            <div className="animate-in slide-in-from-bottom-12 duration-500 max-w-5xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Athena Intelligence</h2>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Your HPI strategic advisor. Optimized for Node constraints.
                    </p>
                </div>
                <AthenaChat />
            </div>
        )}
      </main>
    </div>
  );
};

export default App;