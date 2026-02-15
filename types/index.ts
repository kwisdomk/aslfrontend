// Move HardwareMode enum here from constants.ts
export enum HardwareMode {
  PERFORMANCE = 'PERFORMANCE',
  EFFICIENCY = 'EFFICIENCY',
  BALANCED = 'BALANCED',
  SILENT = 'SILENT'
}

// Strategic planner task model (for Phase.tasks)
export interface StrategicTask {
  id: string;
  title: string;
  progress: number;
  details?: string;
  bottlenecks?: string[];
  mode?: HardwareMode;
  priority?: Priority;
  memoryFocus?: string;
  hardwareNote?: string;
  estimatedHours?: number;
}

// Database/operational task model (for INITIAL_TASKS)
export interface Task {
  id: string;
  title: string;
  theater_id: string;
  arm: string;
  progress: number;
  estimated_hours?: number;
  status: 'in_progress' | 'completed' | 'blocked' | 'archived';
  is_retiring: boolean;
  nba_score: number;
  velocity_weight: number;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

// Update Phase to use StrategicTask
export interface Phase {
  id: string;
  name: string;
  status: string;
  description?: string;
  platform?: string;
  badges?: string[];
  tasks: StrategicTask[];
}