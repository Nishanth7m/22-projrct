import React from 'react';
import { INITIAL_ROADMAP } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RoadmapSection: React.FC = () => {
  // Mock data for resource allocation chart
  const resourceData = INITIAL_ROADMAP.map(item => ({
    name: item.phase.split(' ')[0], // First word for brevity
    complexity: item.status === 'completed' ? 20 : item.status === 'in-progress' ? 80 : 50,
    status: item.status
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'in-progress': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      default: return 'text-slate-400 border-slate-700 bg-slate-800/50';
    }
  };

  const getBarColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#3b82f6';
      default: return '#64748b';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in h-full flex flex-col">
      <header className="flex-shrink-0">
        <h2 className="text-3xl font-bold text-white mb-2">Development Roadmap</h2>
        <p className="text-slate-400">Strategic timeline and milestone tracking.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Timeline List */}
        <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar max-h-[600px]">
            {INITIAL_ROADMAP.map((item, index) => (
                <div key={item.id} className="relative pl-8 border-l border-slate-800">
                    <div className={`absolute left-[-5px] top-4 w-2.5 h-2.5 rounded-full ${item.status === 'completed' ? 'bg-emerald-500' : item.status === 'in-progress' ? 'bg-blue-500 animate-pulse' : 'bg-slate-700'}`}></div>
                    
                    <div className={`p-5 rounded-lg border transition-all ${getStatusColor(item.status)}`}>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">{item.phase}</h3>
                            <span className="text-xs font-mono opacity-70 px-2 py-1 bg-black/20 rounded">{item.duration}</span>
                        </div>
                        
                        <ul className="space-y-2 mt-3">
                            {item.tasks.map((task, i) => (
                                <li key={i} className="flex items-center text-sm opacity-80">
                                    <span className="mr-2 text-xs">↪</span> {task}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>

        {/* Charts/Analysis */}
        <div className="flex flex-col space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl flex-1 min-h-[300px]">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Estimated Complexity Load</h3>
                {/* Fixed height container to resolve Recharts warning */}
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={resourceData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                            <XAxis type="number" stroke="#94a3b8" />
                            <YAxis dataKey="name" type="category" stroke="#94a3b8" width={80} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                cursor={{fill: '#334155', opacity: 0.2}}
                            />
                            <Bar dataKey="complexity" radius={[0, 4, 4, 0]} barSize={20}>
                                {resourceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 p-6 rounded-xl">
                <div className="flex items-start space-x-4">
                    <div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-300">
                        🧠
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-1">OpsFlow Insight</h4>
                        <p className="text-sm text-indigo-200/80">
                            Current velocity indicates the "Auth Core" phase requires 20% more testing resources. Recommendation: Implement automated Jest tests before proceeding to "User Profiles".
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapSection;