export enum ArmType {
  PROFESSIONAL = 'IBM Ecosystem',
  ACADEMIC = 'Computer Science'
}

export enum HardwareMode {
  PERFORMANCE = 'Performance Mode',
  EFFICIENCY = 'Efficiency Mode',
  SILENT = 'Airplane/Silent Mode'
}

export enum Priority {
  CRITICAL = 'Critical',
  HIGH = 'High',
  STANDARD = 'Standard',
  ANCHOR = 'Anchor'
}

export interface Task {
  id: string;
  name: string;
  progress: number; // 0 to 100
  details?: string;
  bottlenecks?: string[];
  hardwareNote?: string;
  mode: HardwareMode;
  priority: Priority;
  memoryFocus: string;
  estimatedHours?: number; // Estimated hours remaining to completion
}

export interface Phase {
  id: string;
  name: string;
  platform?: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  badges?: string[];
  tasks: Task[];
  description?: string;
}

export interface CareerMap {
  technical: string;
  sales: string;
  status: 'Earned' | 'Pending';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
