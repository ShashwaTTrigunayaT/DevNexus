import React, { useState, useEffect } from "react";
import FileTreeNode from "./FileTreeNode";
import { v4 as uuidv4 } from "uuid"; 
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const FileExplorer = ({ project, roomId, onFileSelect }) => {
  const [fileTree, setFileTree] = useState(null);

  useEffect(() => {
    if (project) {
      let treeToSet = project.fileTree;
      // Sync Root Name with Project Title
      if (treeToSet) {
        treeToSet = JSON.parse(JSON.stringify(treeToSet));
        treeToSet.name = project.title; 
      } else {
        treeToSet = { id: "root", name: project.title, type: "folder", children: [] };
      }
      setFileTree(treeToSet);
    }
  }, [project]);

  const saveTreeToBackend = async (newTree) => {
    try {
      setFileTree(newTree); 
      await fetch(`http://localhost:5000/project/${roomId}/tree`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ fileTree: newTree })
      });
    } catch (err) {
      toast.error("Failed to save changes");
    }
  };

  // --- RECURSIVE OPERATIONS ---

  // 1. ADD
  const handleAddNode = (parentId, name, type) => {
    if (!fileTree) return;
    const newTree = JSON.parse(JSON.stringify(fileTree));
    const addRecursive = (node) => {
      if (node.id === parentId && node.type === "folder") {
        node.children.push({
          id: uuidv4(),
          name,
          type,
          children: type === "folder" ? [] : null,
          content: type === "file" ? "" : null
        });
        return true;
      }
      if (node.children) {
        for (let child of node.children) {
          if (addRecursive(child)) return true;
        }
      }
      return false;
    };
    addRecursive(newTree);
    saveTreeToBackend(newTree);
  };

  // 2. DELETE
  const handleDeleteNode = (nodeId) => {
    if (!fileTree || nodeId === "root") return;
    const newTree = JSON.parse(JSON.stringify(fileTree));
    const deleteRecursive = (node) => {
      if (!node.children) return false;
      const index = node.children.findIndex(child => child.id === nodeId);
      if (index !== -1) {
        node.children.splice(index, 1);
        return true;
      }
      for (let child of node.children) {
        if (deleteRecursive(child)) return true;
      }
      return false;
    };
    deleteRecursive(newTree);
    saveTreeToBackend(newTree);
  };

  // 3. RENAME (NEW)
  const handleRenameNode = (nodeId, newName) => {
    if (!fileTree) return;
    const newTree = JSON.parse(JSON.stringify(fileTree));
    
    // If renaming root, we might want to trigger project rename API, 
    // but for now let's just update the tree view.
    if (nodeId === "root") {
        newTree.name = newName;
        saveTreeToBackend(newTree);
        return;
    }

    const renameRecursive = (node) => {
        if (node.id === nodeId) {
            node.name = newName;
            return true;
        }
        if (node.children) {
            for (let child of node.children) {
                if (renameRecursive(child)) return true;
            }
        }
        return false;
    };

    renameRecursive(newTree);
    saveTreeToBackend(newTree);
  };

  if (!fileTree) return <div className="p-4 text-gray-500"><Loader2 className="animate-spin"/></div>;

  return (
    <div className="h-full flex flex-col text-gray-300">
      <div className="p-3 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 bg-[#0a0a0f]">
        Explorer
      </div>
      <div className="flex-1 overflow-y-auto pt-2 pl-2">
        <FileTreeNode 
            node={fileTree} 
            depth={0}
            onSelect={onFileSelect} 
            onAddFolder={(id, name) => handleAddNode(id, name, "folder")}
            onAddFile={(id, name) => handleAddNode(id, name, "file")}
            onDelete={handleDeleteNode}
            onRename={handleRenameNode} // ✅ Passed Down
        />
      </div>
    </div>
  );
};

export default FileExplorer;