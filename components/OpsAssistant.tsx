import React, { useState, useEffect, useRef } from 'react';
import { generateOpsResponse, parseJsonFromResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const OpsAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'opsflow',
      text: "OpsFlow Core Intelligence online. I can assist with architectural decisions, generate marketing strategies, or clarify technical requirements. How can I help?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateOpsResponse(userMsg.text);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'opsflow',
        text: responseText,
        timestamp: new Date()
      };

      // Check for JSON actions
      const jsonData = parseJsonFromResponse(responseText);
      if (jsonData) {
        aiMsg.isActionable = true;
        aiMsg.actionData = jsonData;
      }

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: 'opsflow',
            text: "System Error: Connection to Core interrupted.",
            timestamp: new Date()
        }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    // Optional: auto-send
    // handleSend(); 
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl animate-fade-in">
        <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                <h2 className="font-mono text-slate-200 font-bold tracking-tight">OPSFLOW CORE <span className="text-slate-600">/ CHAT</span></h2>
            </div>
            <div className="text-xs text-slate-500 font-mono">LATENCY: 42ms</div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-4 ${
                        msg.sender === 'user' 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                    }`}>
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-[10px] font-mono opacity-50 uppercase">{msg.sender === 'user' ? 'Operator' : 'AI Core'}</span>
                            <span className="text-[10px] opacity-30">{msg.timestamp.toLocaleTimeString()}</span>
                        </div>
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {msg.text.replace(/```json[\s\S]*?```/g, '')}
                        </div>
                        
                        {/* Actionable Data Renderer */}
                        {msg.isActionable && Array.isArray(msg.actionData) && (
                            <div className="mt-4 bg-slate-900/80 rounded p-3 border border-slate-700/50">
                                <h4 className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider">Generated Action Plan</h4>
                                <ul className="space-y-2">
                                    {msg.actionData.map((step: any, idx: number) => (
                                        <li key={idx} className="text-xs flex items-start text-slate-300">
                                            <span className="mr-2 text-emerald-500">✓</span>
                                            {typeof step === 'string' ? step : JSON.stringify(step)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
            {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-slate-800 p-4 rounded-lg rounded-bl-none border border-slate-700">
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                 </div>
            )}
        </div>

        <div className="p-4 bg-slate-800 border-t border-slate-700">
            {/* Quick Actions */}
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                {['Create Launch Plan', 'Explain Socket.io', 'Generate Marketing Tasks', 'Security Best Practices'].map(action => (
                    <button 
                        key={action}
                        onClick={() => handleQuickAction(action)}
                        className="whitespace-nowrap px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs text-slate-300 rounded border border-slate-600 transition-colors"
                    >
                        {action}
                    </button>
                ))}
            </div>

            <div className="flex space-x-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Enter command or query..."
                    className="flex-1 bg-slate-900 text-white px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-600"
                    disabled={isLoading}
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    SEND
                </button>
            </div>
        </div>
    </div>
  );
};

export default OpsAssistant;
