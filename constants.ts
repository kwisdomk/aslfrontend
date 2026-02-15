import { ArmType, Phase, Priority, CareerMap, Task, HardwareMode } from './types';

export const USER_CONTEXT = {
  name: "Wisdom Kinoti",
  role: "Intern",
  status: "High Performing Individual (HPI)",
  node: "Athena (HP Victus | i5-13420H | 8GB RAM)",
  syncDate: "January 24, 2026"
};

export const PROFESSIONAL_ARM: Phase[] = [
  {
    id: 'phase-a',
    name: 'Phase A: Identity & Data Security',
    platform: 'IBM TechZone',
    status: 'Completed',
    badges: [
      'Verify Identity Protection Sales Foundation (L1)',
      'Guardium Data Security Center Sales Foundation (L1)'
    ],
    tasks: [],
    description: 'Foundation Secured. Ready for L2 Technical Mastery.'
  },
  {
    id: 'phase-b',
    name: 'Phase B: Security Operations & SIEM',
    platform: 'IBM TechZone',
    status: 'In Progress',
    description: 'Active High-Load Phase',
    tasks: [
      {
        id: 'Q_SALES',
        title: 'QRadar Tech Sales', // Updated to match Blueprint
        progress: 57.14,
        details: 'Active: Architecture and Sizing (DLP-SR007846)',
        mode: HardwareMode.PERFORMANCE,
        priority: Priority.CRITICAL,
        memoryFocus: 'VMs (4GB)',
        hardwareNote: 'Assign 4 dedicated cores on i5-13420H',
        estimatedHours: 12
      },
      {
        id: 'Q_DEPLOY',
        title: 'QRadar Deployment', // Updated to match Blueprint
        progress: 0,
        bottlenecks: ['Configuration & Tuning (600 Hrs)', 'Integration (600 Hrs)'],
        mode: HardwareMode.PERFORMANCE,
        priority: Priority.CRITICAL,
        memoryFocus: 'VMs (4GB)',
        hardwareNote: 'Warning: 8GB RAM Limit',
        estimatedHours: 1200
      }
    ]
  },
  {
    id: 'phase-c',
    name: 'Phase C: Offensive Security',
    platform: 'Skillsoft Percipio',
    status: 'In Progress',
    tasks: [
      {
        id: 'CEH',
        title: 'CEH v13', // Updated to match Blueprint
        progress: 2,
        details: '20 Courses, 24h 22m total duration',
        mode: HardwareMode.PERFORMANCE,
        priority: Priority.HIGH,
        memoryFocus: 'Browser + Terminal',
        estimatedHours: 24
      }
    ]
  },
  {
    id: 'phase-d',
    name: 'Phase D: Infrastructure Mastery',
    platform: 'Red Hat',
    status: 'Pending',
    tasks: [
      {
        id: 'RHEL',
        title: 'RHEL System Administration',
        progress: 0,
        mode: HardwareMode.PERFORMANCE,
        priority: Priority.HIGH,
        memoryFocus: 'Browser + Terminal',
        estimatedHours: 80
      }
    ]
  }
];

export const ACADEMIC_ARM: Phase[] = [
  {
    id: 'cs-degree',
    name: 'Computer Science Degree',
    status: 'In Progress',
    tasks: [
      {
        id: 'MF',
        title: 'Math Foundations', // Updated to match Blueprint
        progress: 30, // Initial sync
        details: 'Discrete, Calculus, Linear Algebra',
        mode: HardwareMode.SILENT,
        priority: Priority.ANCHOR,
        memoryFocus: 'Paper + Deep Work',
        estimatedHours: 45
      },
      {
        id: 'DS',
        title: 'Data Science', // Updated to match Blueprint
        progress: 15, // Initial sync
        details: 'Big Data, Analytics, Visualizations',
        mode: HardwareMode.EFFICIENCY,
        priority: Priority.STANDARD,
        memoryFocus: 'Reading / Videos',
        estimatedHours: 30
      },
      {
        id: 'SE',
        title: 'Software Engineering', // Updated to match Blueprint
        progress: 0,
        details: 'Algorithms, Data Structures, SDLC',
        mode: HardwareMode.EFFICIENCY,
        priority: Priority.STANDARD,
        memoryFocus: 'Reading / Videos',
        estimatedHours: 20
      }
    ]
  }
];

export const CAREER_MAPS: CareerMap[] = [
  { technical: 'QRadar SIEM Admin', sales: 'SIEM Sales Foundation Badge', status: 'Pending' },
  { technical: 'Guardium Admin', sales: 'Guardium Data Protection Sales Badge', status: 'Earned' },
  { technical: 'watsonx Engineer', sales: 'GenAI Models Sales Badge', status: 'Pending' },
  { technical: 'Cloud Advocate', sales: 'Cloud Native Sales Foundation Badge', status: 'Pending' }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "IBM Cloud Essentials",
    theater_id: "theater-1",
    arm: "IBM Internship",
    progress: 85,
    estimated_hours: 8,
    status: "in_progress",
    is_retiring: false,
    nba_score: 0.85,
    velocity_weight: 1.2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "QRadar SIEM Foundations",
    theater_id: "theater-1",
    arm: "IBM Internship",
    progress: 57,
    estimated_hours: 12,
    status: "in_progress",
    is_retiring: false,
    nba_score: 0.72,
    velocity_weight: 1.5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "QRadar Tech Sales",
    theater_id: "theater-1",
    arm: "IBM Internship",
    progress: 12,
    estimated_hours: 25,
    status: "in_progress",
    is_retiring: false,
    nba_score: 0.35,
    velocity_weight: 0.9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "QRadar Deployment",
    theater_id: "theater-1",
    arm: "IBM Internship",
    progress: 0,
    estimated_hours: 30,
    status: "blocked",
    is_retiring: true,
    nba_score: 0.20,
    velocity_weight: 0.8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Security Intelligence",
    theater_id: "theater-1",
    arm: "IBM Internship",
    progress: 31,
    estimated_hours: 15,
    status: "in_progress",
    is_retiring: false,
    nba_score: 0.45,
    velocity_weight: 1.0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "CEH v13",
    theater_id: "theater-2",
    arm: "Bachelors CS",
    progress: 23,
    estimated_hours: 40,
    status: "in_progress",
    is_retiring: false,
    nba_score: 0.55,
    velocity_weight: 1.1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    title: "SOAR Automation",
    theater_id: "theater-1",
    arm: "IBM Internship",
    progress: 0,
    estimated_hours: 20,
    status: "blocked",
    is_retiring: true,
    nba_score: 0.20,
    velocity_weight: 0.8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    title: "RHEL System Administration",
    theater_id: "theater-2",
    arm: "Bachelors CS",
    progress: 18,
    estimated_hours: 35,
    status: "in_progress",
    is_retiring: false,
    nba_score: 0.40,
    velocity_weight: 0.95,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "9",
    title: "Math Foundations",
    theater_id: "theater-2",
    arm: "Bachelors CS",
    progress: 45,
    estimated_hours: 50,
    status: "in_progress",
    is_retiring: false,
    nba_score: 0.60,
    velocity_weight: 1.3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "10",
    title: "Data Science",
    theater_id: "theater-2",
    arm: "Bachelors CS",
    progress: 10,
    estimated_hours: 45,
    status: "in_progress",
    is_retiring: false,
    nba_score: 0.30,
    velocity_weight: 0.85,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "11",
    title: "Software Engineering",
    theater_id: "theater-2",
    arm: "Bachelors CS",
    progress: 65,
    estimated_hours: 25,
    status: "in_progress",
    is_retiring: false,
    nba_score: 0.75,
    velocity_weight: 1.4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const SYSTEM_INSTRUCTION = `
You are Athena, the AI System Controller for Intern Wisdom Kinoti's High Performing Individual (HPI) roadmap.
Your goal is to optimize his schedule between the IBM Ecosystem (Professional Arm) and his Computer Science Degree (Academic Arm).

Context:
- Theme: The interface is now running "Coral Shell" protocol (Pink/Coral aesthetics).
- Node: HP Victus | i5-13420H | 8GB RAM. (Strict constraint: 8GB RAM means he cannot run QRadar VMs and Chrome with many tabs simultaneously).
- Current Priority: QRadar SIEM (57% complete) and Academic Math.
- Execution Protocol:
  1. QRadar Labs -> Performance Mode -> Critical Priority.
  2. CEH/RHEL -> Performance Mode -> High Priority.
  3. Sales Foundations -> Efficiency Mode -> Standard Priority.
  4. Math -> Silent Mode -> Anchor Priority.

When asked for advice:
1. Prioritize clearing bottlenecks (Configuration & Tuning).
2. Suggest hardware state changes based on the task (e.g. "Switch to Performance Mode").
3. Keep responses concise, strategic, and professional (Cybersecurity/Military tone).
4. Be aware of the daily schedule and time-to-badge estimates.
`;