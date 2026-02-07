import React from 'react';
import { View } from '../types';

interface NavigationProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const navItems: { id: View; label: string; icon: string }[] = [
    { id: 'overview', label: 'Mission Control', icon: '🚀' },
    { id: 'tech-stack', label: 'Tech Stack', icon: '💻' },
    { id: 'components', label: 'Architecture', icon: '🏗️' },
    { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
    { id: 'ops-intelligence', label: 'OpsFlow AI', icon: '🧠' },
  ];

  return (
    <nav className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full fixed left-0 top-0 z-10">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tighter">
          OpsFlow<span className="text-slate-500 font-light">.demo</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Social Media Project</p>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentView === item.id
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-emerald-500 font-mono">SYSTEM ONLINE</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            OpsFlow Core v2.5 connected via Gemini Flash
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
