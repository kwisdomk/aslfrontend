export type Priority = 'Critical' | 'Anchor' | 'High' | 'Medium' | 'Low';
export type SwerveStatus = 'BALANCED' | 'ACADEMIC_LAG' | 'PROFESSIONAL_LAG';

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  progress: number;
  phase: string;
  dueDate?: string;
  tags?: string[];
}

export interface Phase {
  id: string;
  name: string;
  description?: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
  tasks: Task[];
}

export interface Arm {
  name: string;
  description?: string;
  targetGoal?: string;
  progress: number;
  phases: Phase[];
}

export interface AthenaCore {
  professional: Arm;
  academic: Arm;
  swerveMode: SwerveStatus | null;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type TabType = 'dashboard' | 'professional' | 'academic' | 'athena';

export interface CareerRole {
  id: string;
  name: string;
  description: string;
  status: 'Earned' | 'In Progress' | 'Pending';
  phase: string;
}

export interface DailyPriority {
  rank: number;
  task: Task;
  hardwareMode?: string;
  remainingHours?: number;
}
