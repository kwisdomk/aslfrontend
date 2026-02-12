import React from 'react';
import { Task, HardwareMode, Priority } from '../types';
import { Cpu, Battery, ShieldAlert, BookOpen, Terminal, Clock, Activity } from 'lucide-react';

interface ProtocolCardProps {
  task: Task;
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({ task }) => {
  const getModeIcon = (mode: HardwareMode) => {
    switch (mode) {
      case HardwareMode.PERFORMANCE: return <Cpu className="w-4 h-4 text-rose-500" />;
      case HardwareMode.EFFICIENCY: return <Battery className="w-4 h-4 text-green-500" />;
      case HardwareMode.SILENT: return <BookOpen className="w-4 h-4 text-blue-500" />;
      default: return <Terminal className="w-4 h-4 text-slate-500" />;
    }
  };

  const getPriorityBadge = (priority: Priority) => {
    let classes = "";
    switch (priority) {
      case Priority.CRITICAL: classes = 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300'; break;
      case Priority.HIGH: classes = 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300'; break;
      case Priority.ANCHOR: classes = 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300'; break;
      default: classes = 'bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400'; break;
    }
    return (
        <span className={`px-3 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider ${classes}`}>
          {priority}
        </span>
    );
  };

  return (
    <div className="group bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">{task.name}</h3>
        {getPriorityBadge(task.priority)}
      </div>
      
      <div className="flex items-center gap-6 text-sm mb-6">
        <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
            {getModeIcon(task.mode)}
            <span className="font-medium">{task.mode}</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
            <Terminal className="w-4 h-4" />
            <span className="font-medium">{task.memoryFocus}</span>
        </div>
      </div>

      {task.hardwareNote && (
        <div className="mb-6 flex items-start space-x-3 bg-amber-50/50 dark:bg-amber-900/10 p-4 rounded-2xl">
            <ShieldAlert className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">{task.hardwareNote}</p>
        </div>
      )}

      {/* Clean Progress */}
      <div>
        <div className="flex justify-between text-sm font-medium text-slate-400 dark:text-slate-500 mb-2">
            <span>Progress</span>
            <span className="flex items-center text-rose-500 dark:text-rose-400">
                {task.estimatedHours ? `${task.estimatedHours}h left` : 'TBD'}
            </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
                className="bg-slate-900 dark:bg-white h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${task.progress}%` }}
            ></div>
        </div>
      </div>
    </div>
  );
};

export default ProtocolCard;