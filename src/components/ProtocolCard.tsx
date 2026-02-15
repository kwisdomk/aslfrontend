import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { Task } from '../types';

interface ProtocolCardProps {
  task: Task;
  onProgressUpdate: (taskId: string, newProgress: number) => void;
}

export function ProtocolCard({ task, onProgressUpdate }: ProtocolCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempProgress, setTempProgress] = useState(task.progress);

  const priorityStyles = {
    Critical: 'bg-rose-100/40 text-rose-600 border border-rose-200',
    Anchor: 'bg-blue-100/40 text-blue-600 border border-blue-200',
    High: 'bg-amber-100/40 text-amber-600 border border-amber-200',
    Medium: 'bg-green-100/40 text-green-600 border border-green-200',
    Low: 'bg-slate-100/40 text-slate-600 border border-slate-200'
  };

  const handleSave = () => {
    onProgressUpdate(task.id, tempProgress);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProgress(task.progress);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-glass hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300 border border-slate-100">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 mb-2 tracking-tight">
            {task.name}
          </h3>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            {task.description}
          </p>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide ${priorityStyles[task.priority]}`}>
              {task.priority}
            </span>
            <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-slate-100/40 text-slate-700 border border-slate-200 tracking-wide">
              {task.phase}
            </span>
            {task.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs bg-slate-50 text-slate-500 font-mono uppercase">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2 ml-6">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
              title="Edit progress"
            >
              <Pencil className="w-4 h-4 text-slate-600" />
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="p-2.5 hover:bg-green-100 rounded-xl transition-colors"
                title="Save"
              >
                <Check className="w-4 h-4 text-green-600" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2.5 hover:bg-rose-100 rounded-xl transition-colors"
                title="Cancel"
              >
                <X className="w-4 h-4 text-rose-600" />
              </button>
            </>
          )}
        </div>
      </div>

      {!isEditing ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-medium">Progress</span>
            <span className="font-mono font-bold text-slate-900 text-base">
              {task.progress}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-medium">Adjust Progress</span>
            <span className="font-mono font-bold text-blue-600 text-base">
              {tempProgress}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={tempProgress}
            onChange={(e) => setTempProgress(Number(e.target.value))}
            className="w-full h-2"
          />
        </div>
      )}
    </div>
  );
}
