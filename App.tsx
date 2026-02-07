import React, { useState } from 'react';
import Navigation from './components/Navigation';
import OverviewSection from './components/OverviewSection';
import TechStackSection from './components/TechStackSection';
import RoadmapSection from './components/RoadmapSection';
import OpsAssistant from './components/OpsAssistant';
import ComponentBreakdown from './components/ComponentBreakdown';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('overview');

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewSection />;
      case 'tech-stack':
        return <TechStackSection />;
      case 'components':
        return <ComponentBreakdown />;
      case 'roadmap':
        return <RoadmapSection />;
      case 'ops-intelligence':
        return <OpsAssistant />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-1 ml-64 p-8 h-full overflow-hidden flex flex-col relative">
        {/* Background Ambient Glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 h-full">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
