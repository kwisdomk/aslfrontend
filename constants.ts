import { ArmType, HardwareMode, Phase, Priority, CareerMap } from './types';

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
        name: 'QRadar Tech Sales', // Updated to match Blueprint
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
        name: 'QRadar Deployment', // Updated to match Blueprint
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
        name: 'CEH v13', // Updated to match Blueprint
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
        name: 'RHEL System Administration',
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
        name: 'Math Foundations', // Updated to match Blueprint
        progress: 30, // Initial sync
        details: 'Discrete, Calculus, Linear Algebra',
        mode: HardwareMode.SILENT,
        priority: Priority.ANCHOR,
        memoryFocus: 'Paper + Deep Work',
        estimatedHours: 45
      },
      {
        id: 'DS',
        name: 'Data Science', // Updated to match Blueprint
        progress: 15, // Initial sync
        details: 'Big Data, Analytics, Visualizations',
        mode: HardwareMode.EFFICIENCY,
        priority: Priority.STANDARD,
        memoryFocus: 'Reading / Videos',
        estimatedHours: 30
      },
      {
        id: 'SE',
        name: 'Software Engineering', // Updated to match Blueprint
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