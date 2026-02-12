import React from 'react';

interface RadialProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string; // Optional override
  label?: string;
  subLabel?: string;
}

const RadialProgress: React.FC<RadialProgressProps> = ({
  percentage,
  size = 120,
  strokeWidth = 6, // Thinner stroke for elegance
  color,
  label,
  subLabel
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  // Apple-style gradient logic handled via classes or defaults
  const activeColor = color || "text-rose-500 dark:text-rose-400";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90 w-full h-full">
          {/* Background Circle */}
          <circle
            className="text-gray-200/60 dark:text-gray-800"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress Circle */}
          <circle
            className={`${activeColor} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-slate-800 dark:text-slate-100">
          <span className="text-3xl font-bold tracking-tighter">{percentage.toFixed(0)}%</span>
        </div>
      </div>
      {label && <span className="mt-4 text-base font-medium text-slate-500 dark:text-slate-400">{label}</span>}
      {subLabel && <span className="text-sm text-slate-400 dark:text-slate-500">{subLabel}</span>}
    </div>
  );
};

export default RadialProgress;