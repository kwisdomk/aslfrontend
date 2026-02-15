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
  title: string;
  theater_id: string;
  arm: string; // 'IBM Internship' | 'Bachelors CS'
  progress: number;
  estimated_hours?: number;
  status: 'in_progress' | 'completed' | 'blocked' | 'archived';
  
  // NBA Priority Engine
  is_retiring: boolean;
  nba_score: number;
  velocity_weight: number;
  
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface StrategicTask {
  id: string
  title: string
  progress: number

  details?: string
  bottlenecks?: string[]
  mode?: HardwareMode
  priority?: Priority
  memoryFocus?: string
  hardwareNote?: string
  estimatedHours?: number
}

export interface Phase {
  id: string;
  name: string;
  platform?: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  badges?: string[];
  tasks: StrategicTask[];
  description?: string;
}

export interface CareerMap {
  technical: string;
  sales: string;
  status: 'Earned' | 'Pending';
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Theater {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}
