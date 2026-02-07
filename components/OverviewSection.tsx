import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

const OverviewSection: React.FC = () => {
  const data = [
    { name: 'Backend', value: 35, color: '#10b981' }, // Emerald
    { name: 'Frontend', value: 45, color: '#3b82f6' }, // Blue
    { name: 'DevOps', value: 20, color: '#6366f1' }, // Indigo
  ];

  const engagementData = [
    { name: 'Users', val: 0 },
    { name: 'Posts', val: 0 },
    { name: 'Comments', val: 0 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Project Mission Control</h2>
        <p className="text-slate-400 max-w-2xl">
          Welcome to the OpsFlow Social Media Project Demo. This dashboard provides a real-time overview of the development lifecycle, architectural decisions, and project milestones.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Metrics Card */}
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Development Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4 text-xs text-slate-300">
            {data.map((item) => (
              <div key={item.name} className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Objectives Card */}
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl backdrop-blur-sm col-span-2">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Core Objectives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-colors">
              <div className="text-blue-400 text-xl mb-2">🔐</div>
              <h4 className="font-medium text-slate-200">Secure Authentication</h4>
              <p className="text-sm text-slate-400 mt-1">Robust JWT-based auth flow with secure password hashing.</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-700 hover:border-emerald-500/50 transition-colors">
              <div className="text-emerald-400 text-xl mb-2">⚡</div>
              <h4 className="font-medium text-slate-200">Real-time Interaction</h4>
              <p className="text-sm text-slate-400 mt-1">Instant messaging and notifications via Socket.io.</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-700 hover:border-indigo-500/50 transition-colors">
              <div className="text-indigo-400 text-xl mb-2">📱</div>
              <h4 className="font-medium text-slate-200">Responsive UI</h4>
              <p className="text-sm text-slate-400 mt-1">Mobile-first React design using Tailwind CSS.</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-700 hover:border-yellow-500/50 transition-colors">
              <div className="text-yellow-400 text-xl mb-2">📊</div>
              <h4 className="font-medium text-slate-200">Scalable Data</h4>
              <p className="text-sm text-slate-400 mt-1">Flexible MongoDB schema design for high-volume posts.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Target Audience / Scope */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <h3 className="text-xl font-bold text-white mb-4 relative z-10">Why this stack?</h3>
        <p className="text-slate-400 leading-relaxed max-w-3xl relative z-10">
          The MERN (MongoDB, Express, React, Node) stack combined with Socket.io provides a unified JavaScript development experience from client to server. This consistency reduces context switching and accelerates development for real-time applications like social media platforms.
        </p>
      </div>
    </div>
  );
};

export default OverviewSection;
