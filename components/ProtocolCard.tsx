import React, { useState } from 'react';
import { Task, HardwareMode, Priority } from '../types';
import { Cpu, Battery, BookOpen, Terminal, ShieldAlert, Edit2, Check } from 'lucide-react';

interface ProtocolCardProps {
  task: Task;
  onProgressUpdate?: (id: string, progress: number) => void;
  priorityIndex?: number;
}

const ProtocolCard = ({ task, onProgressUpdate, priorityIndex }: ProtocolCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localProgress, setLocalProgress] = useState(task.progress);

  const handleProgressUpdate = () => {
    if (onProgressUpdate && localProgress !== task.progress) {
      onProgressUpdate(task.id, localProgress);
    }
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'critical': return 'text-rose-500';
      case 'in_progress': return 'text-amber-500';
      case 'blocked': return 'text-red-600';
      case 'completed': return 'text-emerald-500';
      default: return 'text-rose-500';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all duration-300">
      {/* Priority Index Badge */}
      <div className="w-10 h-10 rounded-lg bg-rose-500 flex items-center justify-center text-white font-bold shrink-0">
        {priorityIndex || task.id.charAt(0)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 truncate">{task.title}</h3>
            <div className="flex gap-2 items-center text-[10px] font-bold mt-1">
              <span className={`uppercase ${getStatusColor(task.status)}`}>
                {task.status.replace('_', ' ')}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400 uppercase">{task.arm}</span>
            </div>
          </div>
          
          <div className="text-right ml-4">
            {isEditing ? (
              <input 
                type="number" 
                value={localProgress}
                onChange={(e) => setLocalProgress(parseInt(e.target.value) || 0)}
                onBlur={handleProgressUpdate}
                onKeyDown={(e) => e.key === 'Enter' && handleProgressUpdate()}
                className="w-16 border border-slate-300 rounded-lg p-1 text-sm font-bold text-slate-900 text-center"
                autoFocus
                min="0"
                max="100"
              />
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="text-sm font-bold text-slate-900 hover:text-rose-500 transition"
              >
                {task.progress}%
              </button>
            )}
            <div className="text-[10px] text-slate-400 uppercase tracking-tighter">
              {task.estimated_hours}h total
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-rose-500 to-orange-400 transition-all duration-500"
            style={{ width: `${task.progress}%` }}
          />
        </div>

        {/* Additional Metadata */}
        <div className="flex gap-3 mt-2 text-[10px]">
          {task.is_retiring && (
            <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-full font-bold">
              🚨 RETIRING
            </span>
          )}
          {task.nba_score && task.nba_score > 0.6 && (
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full font-bold">
              ⚡ HIGH IMPACT
            </span>
          )}
          {task.velocity_weight && task.velocity_weight > 1.2 && (
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-bold">
              🎯 PRIORITY
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProtocolCard;