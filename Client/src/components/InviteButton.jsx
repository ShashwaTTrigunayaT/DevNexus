import React from 'react';
import { UserPlus, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const InviteButton = ({ roomId }) => {
  const [copied, setCopied] = React.useState(false);

  const copyLink = () => {
    // This copies the current browser URL
    navigator.clipboard.writeText(window.location.href);
    
    setCopied(true);
    toast.success('Room link copied to clipboard!');
    
    // Reset icon after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={copyLink}
      className="group relative flex items-center gap-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all border border-primary/20 hover:border-primary/50"
    >
      <UserPlus size={16} />
      <span className="text-sm font-medium">Invite</span>
      
      {/* Tooltip on Click */}
      {copied && (
        <span className="absolute top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
          Copied!
        </span>
      )}
    </button>
  );
};

export default InviteButton;