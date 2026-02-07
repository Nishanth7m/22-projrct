import React from 'react';
import { TECH_STACK } from '../constants';

const TechStackSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Technology Infrastructure</h2>
        <p className="text-slate-400">The foundational tools powering the OpsFlow Social Application.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TECH_STACK.map((tech) => (
          <div 
            key={tech.name} 
            className="group relative bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-4xl">{tech.icon}</span>
              <span className="text-xs font-mono py-1 px-2 rounded bg-slate-700 text-slate-300 border border-slate-600">
                {tech.role}
              </span>
            </div>
            
            <h3 className={`text-xl font-bold mb-2 ${tech.color} group-hover:brightness-110 transition-colors`}>
              {tech.name}
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {tech.description}
            </p>

            <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center">
                <span className="text-xs text-slate-500">v-Latest</span>
                <button className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center">
                  Docs <span className="ml-1">→</span>
                </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 border border-dashed border-slate-700 rounded-xl bg-slate-900/50">
        <h3 className="text-lg font-semibold text-slate-300 mb-4 text-center">Data Flow Architecture</h3>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 text-sm font-mono text-slate-400">
            <div className="p-3 bg-slate-800 rounded border border-slate-700">Client (React)</div>
            <div className="hidden md:block text-slate-600">── HTTP/WS ──▶</div>
            <div className="block md:hidden text-slate-600">⬇️</div>
            <div className="p-3 bg-slate-800 rounded border border-slate-700">Server (Node/Express)</div>
            <div className="hidden md:block text-slate-600">── Query ──▶</div>
            <div className="block md:hidden text-slate-600">⬇️</div>
            <div className="p-3 bg-slate-800 rounded border border-slate-700">DB (MongoDB)</div>
        </div>
      </div>
    </div>
  );
};

export default TechStackSection;
