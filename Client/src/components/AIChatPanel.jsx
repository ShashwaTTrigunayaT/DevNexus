import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, User, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
// Optional: Use a markdown parser if you want pretty code blocks
// import ReactMarkdown from 'react-markdown'; 

const AIChatPanel = ({ code }) => { // <--- Receive 'code' prop from Layout
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Initial Welcome Message
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      role: "ai", 
      text: "Hello! I am DevNexus AI. I can see your code. How can I help you today?" 
    },
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");

    // 1. Add User Message immediately
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: userText }]);
    setLoading(true);

    try {
      // 2. Call Backend
      const res = await fetch("http://localhost:5000/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
            prompt: userText,
            code: code // We send the current code context!
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "AI failed to respond");

      // 3. Add AI Response
      setMessages((prev) => [
        ...prev, 
        { id: Date.now() + 1, role: "ai", text: data.reply }
      ]);

    } catch (err) {
      toast.error(err.message);
      setMessages((prev) => [
        ...prev, 
        { id: Date.now() + 1, role: "ai", text: "⚠️ Sorry, I encountered an error. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0a0a0f] text-gray-300">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#050507]">
        <div className="flex items-center gap-2 text-cyan-400">
          <Sparkles size={16} />
          <span className="font-bold text-xs uppercase tracking-wider">DevNexus AI</span>
        </div>
        <button 
            onClick={() => setMessages([])} 
            className="text-gray-500 hover:text-red-400 transition-colors"
            title="Clear Chat"
        >
            <Trash2 size={14} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 
              ${msg.role === "ai" ? "bg-cyan-500/10 text-cyan-400" : "bg-white/10 text-white"}`}>
              {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[85%] text-sm p-3 rounded-2xl leading-relaxed whitespace-pre-wrap
              ${msg.role === "ai" 
                ? "bg-white/5 text-gray-300 rounded-tl-none border border-white/5" 
                : "bg-cyan-600 text-white rounded-tr-none shadow-lg shadow-cyan-900/20"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {loading && (
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Bot size={16} />
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl rounded-tl-none">
                    <Loader2 size={14} className="animate-spin text-cyan-400" />
                    <span className="text-xs text-gray-500">Thinking...</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-[#050507]">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your code..." 
            disabled={loading}
            className="w-full bg-[#1e1e24] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-600 disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 top-2 p-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-black transition-all disabled:opacity-0 disabled:scale-75"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChatPanel;