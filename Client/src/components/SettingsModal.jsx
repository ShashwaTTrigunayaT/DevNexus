import React from 'react';
import { X, Type, WrapText, Monitor } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, settings, setSettings }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e1e24] border border-white/10 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Monitor size={20} className="text-primary" />
            Editor Settings
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Option 1: Font Size */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <Type size={16} /> Font Size: <span className="text-primary font-bold">{settings.fontSize}px</span>
          </label>
          <input 
            type="range" 
            min="12" 
            max="24" 
            step="1"
            value={settings.fontSize}
            onChange={(e) => setSettings({...settings, fontSize: parseInt(e.target.value)})}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Small (12px)</span>
            <span>Huge (24px)</span>
          </div>
        </div>

        {/* Option 2: Word Wrap */}
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
           <div className="flex items-center gap-3">
              <WrapText size={18} className="text-gray-400" />
              <span className="text-gray-200 font-medium">Word Wrap</span>
           </div>
           
           {/* Custom Toggle Switch */}
           <button 
             onClick={() => setSettings({...settings, wordWrap: !settings.wordWrap})}
             className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${settings.wordWrap ? 'bg-primary' : 'bg-white/10'}`}
           >
             <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${settings.wordWrap ? 'translate-x-6' : 'translate-x-0'}`} />
           </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;
