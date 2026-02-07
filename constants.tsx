import { TechItem, RoadmapItem } from './types';
import React from 'react';

// Using simple SVG strings or emoji for demo purposes where icons aren't imported
export const TECH_STACK: TechItem[] = [
  {
    name: 'MongoDB',
    icon: '🍃',
    color: 'text-green-500',
    description: 'NoSQL database for flexible data storage of users, posts, and comments.',
    role: 'Database',
  },
  {
    name: 'Express.js',
    icon: '🚂',
    color: 'text-gray-400',
    description: 'Minimalist web framework for Node.js to handle API routes and middleware.',
    role: 'Backend Framework',
  },
  {
    name: 'React',
    icon: '⚛️',
    color: 'text-blue-400',
    description: 'Component-based library for building dynamic and interactive user interfaces.',
    role: 'Frontend',
  },
  {
    name: 'Node.js',
    icon: '🟢',
    color: 'text-green-600',
    description: 'JavaScript runtime environment to execute backend logic.',
    role: 'Runtime',
  },
  {
    name: 'Socket.io',
    icon: '⚡',
    color: 'text-yellow-400',
    description: 'Library for real-time, bidirectional communication (Chat features).',
    role: 'Real-time Engine',
  },
];

export const INITIAL_ROADMAP: RoadmapItem[] = [
  {
    id: '1',
    phase: 'Foundation & Setup',
    duration: 'Week 1',
    tasks: ['Project Initialization', 'Git Repository Setup', 'Database Schema Design', 'Basic Express Server'],
    status: 'completed',
  },
  {
    id: '2',
    phase: 'Authentication Core',
    duration: 'Week 2',
    tasks: ['JWT Implementation', 'Login/Register UI', 'Password Hashing (Bcrypt)', 'Auth Middleware'],
    status: 'in-progress',
  },
  {
    id: '3',
    phase: 'User Profiles & Posts',
    duration: 'Week 3-4',
    tasks: ['Profile CRUD', 'Image Upload (Cloudinary)', 'Post Schema', 'Feed Generation Logic'],
    status: 'pending',
  },
  {
    id: '4',
    phase: 'Real-time Chat',
    duration: 'Week 5',
    tasks: ['Socket.io Integration', 'Private Messaging UI', 'Online Status', 'Notifications'],
    status: 'pending',
  },
  {
    id: '5',
    phase: 'Polish & Deploy',
    duration: 'Week 6',
    tasks: ['UI/UX Refinement', 'Deployment (Vercel/Heroku)', 'Performance Testing', 'Final Demo'],
    status: 'pending',
  },
];

export const OPSFLOW_SYSTEM_INSTRUCTION = `
You are OpsFlow Core Intelligence, a professional operations agent for a software development project (Social Media App).
Your goal is to move from information to action.
When asked about the project, provide concise, professional technical advice.
If asked to generate plans, marketing, or tasks, return structured data where possible.
Tone: Efficient, proactive, encouraging.
If the user asks for a "Launch Plan" or "Marketing Strategy", output a valid JSON block inside your response marked with \`\`\`json containing an array of steps.
`;
