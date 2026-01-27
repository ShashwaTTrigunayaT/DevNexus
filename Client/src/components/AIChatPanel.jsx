import React, { useState } from 'react';
import { Send, Sparkles, Bot, User } from 'lucide-react';

const AIChatPanel = () => {
  const [input, setInput] = useState('');
  
  // Mock Chat History
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: 'Hello! I am Gemini. How can I help you optimize your code today?' },
    { id: 2, role: 'user', text: 'I need to fix a memory leak in my React component.' },
    { id: 3, role: 'ai', text: 'I can help with that. Can you highlight the component where you suspect the leak is happening?' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add User Message
    const userMsg = { id: Date.now(), role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate AI Reply
    setTimeout(() => {
      setMessages((prev) => [...prev, { 
        id: Date.now() + 1, 
        role: 'ai', 
        text: 'I am analyzing your request... (This is a UI mock)' 
      }]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-surface border-l border-white/5">
      
      {/* Header */}
      <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-background/50">
        <Sparkles size={14} className="text-secondary" />
        <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Gemini Assistant</span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 
              ${msg.role === 'ai' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
              {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[85%] text-sm p-3 rounded-xl leading-relaxed
              ${msg.role === 'ai' 
                ? 'bg-white/5 text-gray-300 rounded-tl-none' 
                : 'bg-primary text-white rounded-tr-none'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-background/30">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Gemini to refactor..." 
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-secondary/50 transition-all placeholder:text-gray-600"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-secondary/20 text-secondary hover:bg-secondary hover:text-white rounded-lg transition-all"
          >
            <Send size={14} />
          </button>
        </div>
      </form>

    </div>
  );
};

export default AIChatPanel;