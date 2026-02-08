import React, { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { toast } from "sonner";

const InviteButton = ({ roomId }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // ✅ Generates the real URL: http://localhost:5173/editor/123xyz
      const url = `${window.location.origin}/editor/${roomId}`;
      
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard! Share it with friends.");
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-lg transition-all text-xs font-bold uppercase tracking-wider"
    >
      {copied ? <Check size={14} /> : <Share2 size={14} />}
      {copied ? "Copied" : "Invite"}
    </button>
  );
};

export default InviteButton;