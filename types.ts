export type View = 'overview' | 'tech-stack' | 'components' | 'roadmap' | 'ops-intelligence';

export interface TechItem {
  name: string;
  icon: string;
  color: string;
  description: string;
  role: string;
}

export interface RoadmapItem {
  id: string;
  phase: string;
  duration: string;
  tasks: string[];
  status: 'pending' | 'in-progress' | 'completed';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'opsflow';
  text: string;
  timestamp: Date;
  isActionable?: boolean; // If true, might contain JSON data to render specific UI
  actionData?: any;
}

export interface ProjectStats {
  estimatedHours: number;
  complexityScore: number; // 1-100
  teamSize: number;
  budget: number;
}
