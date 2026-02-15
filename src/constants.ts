import { Arm, CareerRole } from './types';

export const PROFESSIONAL_ARM: Arm = {
  name: 'IBM Ecosystem',
  description: 'Professional development focused on IBM technologies and enterprise solutions',
  targetGoal: 'Technical Sales Advanced Badge',
  progress: 0,
  phases: [
    {
      id: 'phase-foundation',
      name: 'Foundation & Portfolio',
      description: 'Build professional presence and foundational skills',
      status: 'In Progress',
      tasks: [
        {
          id: 'prof-1',
          name: 'Portfolio Website',
          description: 'Build and deploy personal portfolio with case studies',
          priority: 'Critical',
          progress: 0,
          phase: 'Foundation',
          tags: ['frontend', 'design', 'branding']
        },
        {
          id: 'prof-2',
          name: 'LinkedIn Optimization',
          description: 'Complete professional profile with recommendations',
          priority: 'Anchor',
          progress: 0,
          phase: 'Foundation',
          tags: ['networking', 'branding']
        }
      ]
    },
    {
      id: 'phase-security',
      name: 'Security Operations & SIEM',
      description: 'Master IBM QRadar and security operations',
      status: 'In Progress',
      tasks: [
        {
          id: 'prof-3',
          name: 'QRadar SIEM Administration',
          description: 'Complete QRadar Technical Sales certification',
          priority: 'Critical',
          progress: 0,
          phase: 'Security Operations',
          tags: ['qradar', 'siem', 'security']
        },
        {
          id: 'prof-4',
          name: 'Open Source Contributions',
          description: 'Contribute to 3 meaningful security-focused projects',
          priority: 'High',
          progress: 0,
          phase: 'Security Operations',
          tags: ['github', 'security', 'collaboration']
        }
      ]
    },
    {
      id: 'phase-specialization',
      name: 'Advanced Specialization',
      description: 'Industry certifications and thought leadership',
      status: 'Not Started',
      tasks: [
        {
          id: 'prof-5',
          name: 'Technical Blog Series',
          description: 'Write 5 technical articles on IBM technologies',
          priority: 'Medium',
          progress: 0,
          phase: 'Specialization',
          tags: ['writing', 'thought-leadership']
        },
        {
          id: 'prof-6',
          name: 'IBM Cloud Certification',
          description: 'Complete IBM Cloud Professional certification',
          priority: 'High',
          progress: 0,
          phase: 'Specialization',
          tags: ['cloud', 'certification', 'ibm']
        }
      ]
    }
  ]
};

export const ACADEMIC_ARM: Arm = {
  name: 'Computer Science Core',
  description: 'Academic excellence in core CS fundamentals and theory',
  targetGoal: 'Complete Capstone with Research Publication',
  progress: 0,
  phases: [
    {
      id: 'phase-cs-foundation',
      name: 'CS Fundamentals',
      description: 'Core computer science knowledge',
      status: 'In Progress',
      tasks: [
        {
          id: 'acad-1',
          name: 'Data Structures & Algorithms',
          description: 'Master core CS fundamentals and solve 100 problems',
          priority: 'Critical',
          progress: 0,
          phase: 'Foundation',
          tags: ['algorithms', 'leetcode', 'problem-solving']
        },
        {
          id: 'acad-2',
          name: 'System Design',
          description: 'Complete system design course and design 5 systems',
          priority: 'Anchor',
          progress: 0,
          phase: 'Foundation',
          tags: ['architecture', 'scalability', 'databases']
        }
      ]
    },
    {
      id: 'phase-cs-advanced',
      name: 'Advanced Topics',
      description: 'Mathematics and theoretical foundations',
      status: 'In Progress',
      tasks: [
        {
          id: 'acad-3',
          name: 'Mathematics for ML',
          description: 'Linear algebra, calculus, and probability theory',
          priority: 'High',
          progress: 0,
          phase: 'Advanced',
          tags: ['math', 'ml', 'theory']
        },
        {
          id: 'acad-4',
          name: 'Research Paper Reading',
          description: 'Read and summarize 10 papers in your field',
          priority: 'Medium',
          progress: 0,
          phase: 'Advanced',
          tags: ['research', 'academia']
        }
      ]
    },
    {
      id: 'phase-cs-capstone',
      name: 'Capstone & Research',
      description: 'Major thesis and research contribution',
      status: 'Not Started',
      tasks: [
        {
          id: 'acad-5',
          name: 'Capstone Project',
          description: 'Complete major thesis with research publication',
          priority: 'Critical',
          progress: 0,
          phase: 'Capstone',
          tags: ['project', 'thesis', 'research']
        }
      ]
    }
  ]
};

export const CAREER_MAPS: CareerRole[] = [
  {
    id: 'role-1',
    name: 'QRadar SIEM Admin',
    description: 'Security Operations Center specialist',
    status: 'In Progress',
    phase: 'Security Operations'
  },
  {
    id: 'role-2',
    name: 'IBM Cloud Architect',
    description: 'Enterprise cloud solutions designer',
    status: 'Pending',
    phase: 'Cloud Specialization'
  },
  {
    id: 'role-3',
    name: 'Technical Sales Engineer',
    description: 'Pre-sales technical consultant',
    status: 'Pending',
    phase: 'Advanced Specialization'
  },
  {
    id: 'role-4',
    name: 'Security Researcher',
    description: 'Research and development specialist',
    status: 'Pending',
    phase: 'Research Track'
  }
];

export const SYSTEM_PROMPTS = {
  welcome: "Welcome to Athena Strategic Planner. I'm your AI assistant to help you balance professional and academic goals.",
  academicLag: "⚠️ ACADEMIC LAG DETECTED\nYour academic progress is lagging behind professional by >15%. Consider focusing on academic tasks to restore balance.",
  professionalLag: "⚠️ PROFESSIONAL LAG DETECTED\nYour professional progress is lagging behind academic by >15%. Consider focusing on professional tasks to restore balance.",
  balanced: "✓ PROTOCOL BALANCED\nYour progress is well balanced across both arms. Current velocity is optimal."
};
