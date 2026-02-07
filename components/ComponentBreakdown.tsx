import React, { useState } from 'react';

const ComponentBreakdown: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<string | null>(null);

    const components = [
        {
            id: 'auth',
            title: 'User Authentication',
            icon: '🛡️',
            details: 'JWT-based stateless authentication. Features secure password hashing via bcrypt, token refreshing, and protected route middleware.',
            position: 'top-10 left-10'
        },
        {
            id: 'profile',
            title: 'Profile Management',
            icon: '👤',
            details: 'Comprehensive user dashboard allowing avatar uploads, bio editing, and privacy settings configuration. Connects to MongoDB user collections.',
            position: 'top-10 right-10'
        },
        {
            id: 'feed',
            title: 'News Feed',
            icon: '📰',
            details: 'Aggregated post stream with pagination. Uses complex aggregation pipelines in MongoDB to merge friend posts and public content.',
            position: 'bottom-10 left-10'
        },
        {
            id: 'chat',
            title: 'Real-Time Chat',
            icon: '💬',
            details: 'WebSocket server powered by Socket.io. Handles private rooms, typing indicators, and online presence broadcasting.',
            position: 'bottom-10 right-10'
        }
    ];

    return (
        <div className="space-y-6 h-full flex flex-col animate-fade-in">
             <header>
                <h2 className="text-3xl font-bold text-white mb-2">System Architecture</h2>
                <p className="text-slate-400">Interactive component topology. Hover for details.</p>
            </header>

            <div className="flex-1 relative bg-slate-800/30 rounded-xl border border-slate-700/50 backdrop-blur-sm overflow-hidden min-h-[500px] flex items-center justify-center">
                
                {/* Central Hub */}
                <div className="relative z-10 w-48 h-48 bg-slate-900 border-2 border-blue-500/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)] animate-pulse-slow">
                    <div className="text-center">
                        <div className="text-4xl mb-2">⚛️</div>
                        <div className="font-bold text-blue-400">CORE APP</div>
                        <div className="text-xs text-slate-500 mt-1">State Manager</div>
                    </div>
                </div>

                {/* Satellite Components */}
                <div className="absolute inset-0">
                    {components.map((comp, idx) => {
                        // Calculate positions circularly for better responsiveness
                        const angle = (idx * 90 + 45) * (Math.PI / 180);
                        const radius = 180; // Distance from center
                        // We use translate to position them from center
                        const style = {
                            transform: `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`,
                        };

                        return (
                            <div 
                                key={comp.id}
                                className="absolute left-1/2 top-1/2 -ml-16 -mt-16 w-32 h-32 cursor-pointer group"
                                style={style}
                                onMouseEnter={() => setActiveComponent(comp.id)}
                                onMouseLeave={() => setActiveComponent(null)}
                            >
                                {/* Connection Line (Pseudo) */}
                                <div className="absolute left-1/2 top-1/2 w-full h-[2px] bg-slate-700 -z-10 origin-left scale-0 group-hover:scale-100 transition-transform duration-300" 
                                     style={{ transform: `rotate(${angle + 180}deg)`, width: '100px', left: '50%', top: '50%' }}></div>

                                <div className={`w-full h-full rounded-2xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center transition-all duration-300 ${activeComponent === comp.id ? 'scale-110 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'hover:border-slate-500'}`}>
                                    <span className="text-3xl mb-2">{comp.icon}</span>
                                    <span className="text-xs font-bold text-slate-300 text-center px-2">{comp.title}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Detail Panel Overlay */}
                <div className={`absolute bottom-6 left-6 right-6 bg-slate-900/90 border border-slate-600 p-6 rounded-lg backdrop-blur-md transition-all duration-500 transform ${activeComponent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
                    {activeComponent && (
                        <div>
                            <div className="flex items-center space-x-3 mb-2">
                                <span className="text-2xl">{components.find(c => c.id === activeComponent)?.icon}</span>
                                <h3 className="text-xl font-bold text-white">{components.find(c => c.id === activeComponent)?.title}</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                {components.find(c => c.id === activeComponent)?.details}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComponentBreakdown;
