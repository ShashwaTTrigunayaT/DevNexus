import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const MessageModal = ({ isOpen, onClose, userName }) => {
  const [msg, setMsg] = useState("");

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if(!msg.trim()) return;
    // Mock Send
    console.log(`Sent to ${userName}: ${msg}`);
    setMsg("");
    onClose(); // Close modal after sending (or keep open if you want a full chat)
    alert(`Message sent to ${userName}!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
       <div className="bg-[#1e1e24] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl p-0 overflow-hidden animate-in fade-in zoom-in duration-200">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
             <h3 className="font-bold text-white">Message {userName}</h3>
             <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
             </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSend} className="p-6">
             <textarea 
               autoFocus
               value={msg}
               onChange={(e) => setMsg(e.target.value)}
               placeholder={`Hey ${userName}, check out this code...`}
               className="w-full h-32 bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-primary focus:outline-none resize-none mb-4 placeholder:text-gray-600"
             />
             
             <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                  <Send size={14} />
                  Send
                </button>
             </div>
          </form>
       </div>
    </div>
  );
};

export default MessageModal;