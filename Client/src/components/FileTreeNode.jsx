import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, FileCode, Folder, FolderOpen, Trash2, Edit2, File } from "lucide-react";

const FileTreeNode = ({ node, depth = 0, onSelect, onAddFolder, onAddFile, onDelete, onRename }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // --- STATE FOR CREATION & RENAMING ---
  const [isCreating, setIsCreating] = useState(null); // 'file' | 'folder' | null
  const [isRenaming, setIsRenaming] = useState(false); // New Rename State
  
  const [newItemName, setNewItemName] = useState("");
  const [renameValue, setRenameValue] = useState(node.name); // Store current name for editing

  const inputRef = useRef(null);
  const renameRef = useRef(null);

  const paddingLeft = `${depth * 12 + 10}px`;

  // Focus inputs automatically
  useEffect(() => {
    if (isCreating && inputRef.current) inputRef.current.focus();
    if (isRenaming && renameRef.current) renameRef.current.focus();
  }, [isCreating, isRenaming]);

  // --- HANDLERS ---

  const handleToggle = (e) => {
    e.stopPropagation();
    if (isRenaming) return; // Don't toggle if typing
    if (node.type === "folder") setIsOpen(!isOpen);
    else onSelect(node);
  };

  // 1. Creation Logic (New File/Folder)
  const handleCreateConfirm = () => {
    if (!newItemName.trim()) { setIsCreating(null); return; }
    if (isCreating === "folder") onAddFolder(node.id, newItemName);
    else onAddFile(node.id, newItemName);
    setIsCreating(null); setNewItemName("");
  };

  // 2. Rename Logic (NEW)
  const handleRenameConfirm = () => {
    if (!renameValue.trim() || renameValue === node.name) {
        setIsRenaming(false);
        return;
    }
    onRename(node.id, renameValue);
    setIsRenaming(false);
  };

  return (
    <div className="select-none text-sm">
      
      {/* --- NODE ROW --- */}
      <div
        className={`flex items-center gap-1 py-1 pr-2 cursor-pointer transition-colors relative group
          ${isHovered ? "bg-white/5" : ""}
          ${node.type === "file" ? "text-gray-300" : "text-blue-300 font-medium"}
        `}
        style={{ paddingLeft }}
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="opacity-70 w-4 flex justify-center shrink-0">
           {node.type === "folder" && (
             isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
           )}
        </span>
        
        {/* Icon */}
        {node.type === "folder" ? (
          isOpen ? <FolderOpen size={16} className="text-blue-400 shrink-0" /> : <Folder size={16} className="text-blue-400 shrink-0" />
        ) : (
          <FileCode size={16} className="text-yellow-400 shrink-0" />
        )}

        {/* --- NAME OR RENAME INPUT --- */}
        {isRenaming ? (
            <input
                ref={renameRef}
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleRenameConfirm();
                    if (e.key === "Escape") setIsRenaming(false);
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing folder
                onBlur={handleRenameConfirm}
                className="bg-black/50 border border-blue-500 rounded px-1 text-white text-xs outline-none w-full ml-1"
            />
        ) : (
            <span className="truncate flex-1 ml-1">{node.name}</span>
        )}

        {/* --- HOVER ACTIONS --- */}
        {isHovered && !isRenaming && (
          <div className="flex items-center gap-1 mr-2 bg-[#0a0a0f] shadow-sm">
            
            {/* Rename Button (Pencil) */}
            <button 
                onClick={(e) => { e.stopPropagation(); setIsRenaming(true); }} 
                title="Rename" 
                className="hover:text-white text-gray-400 p-0.5 hover:bg-white/10 rounded"
            >
               <Edit2 size={12} />
            </button>

            {node.type === "folder" && (
              <>
                <button onClick={(e) => { e.stopPropagation(); setIsCreating("file"); setIsOpen(true); }} className="hover:text-white text-gray-400 p-0.5 hover:bg-white/10 rounded">
                   <File size={12} /><span className="text-[8px] absolute top-0.5 right-0">+</span>
                </button>
                <button onClick={(e) => { e.stopPropagation(); setIsCreating("folder"); setIsOpen(true); }} className="hover:text-white text-gray-400 p-0.5 hover:bg-white/10 rounded">
                   <Folder size={12} /><span className="text-[8px] absolute top-0.5 right-0">+</span>
                </button>
              </>
            )}
            
            {node.id !== "root" && (
                <button onClick={(e) => { e.stopPropagation(); onDelete(node.id); }} className="hover:text-red-400 text-gray-500 p-0.5 hover:bg-red-500/10 rounded">
                    <Trash2 size={12} />
                </button>
            )}
          </div>
        )}
      </div>

      {/* --- CHILDREN & NEW ITEM INPUT --- */}
      {isOpen && (
        <div>
          {/* Inline Input for New Items */}
          {isCreating && (
             <div className="flex items-center gap-1 py-1 pr-2 bg-white/5" style={{ paddingLeft: `${(depth + 1) * 12 + 10}px` }}>
                <span className="w-4" />
                {isCreating === "folder" ? <Folder size={16} className="text-gray-400" /> : <FileCode size={16} className="text-gray-400" />}
                <input
                  ref={inputRef}
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.key === "Enter") handleCreateConfirm();
                      if (e.key === "Escape") setIsCreating(null);
                  }}
                  onBlur={() => setIsCreating(null)}
                  className="bg-transparent border border-blue-500 rounded px-1 text-white text-xs outline-none w-full ml-1"
                  placeholder={`Name...`}
                />
             </div>
          )}

          {node.children && node.children.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
              onAddFolder={onAddFolder}
              onAddFile={onAddFile}
              onDelete={onDelete}
              onRename={onRename} // Pass it down recursively
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileTreeNode;