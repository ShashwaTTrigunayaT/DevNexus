import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Folder,
  Clock,
  MoreVertical,
  Terminal,
  AlertCircle,
  ArrowUpRight,
  Search,
  LayoutGrid,
  List,
  Sparkles,
  LogIn,
  Copy,
  Trash2,
  ExternalLink,
  X,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Join Room
  const [roomInput, setRoomInput] = useState("");
  const [joining, setJoining] = useState(false);

  // ✅ 3-dot menu
  const [openMenuId, setOpenMenuId] = useState(null);

  // ✅ Create modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const [newProject, setNewProject] = useState({
    title: "",
    language: "javascript",
  });

  // ✅ Rename modal
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [renameData, setRenameData] = useState({
    roomID: "",
    title: "",
  });

  // ✅ Grid/List view
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) setUser(JSON.parse(userInfo));
    fetchProjects();
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5000/project", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setProjects(data.projects || []);
      } else {
        setError(data?.error || "Failed to load projects");
      }
    } catch (err) {
      setError("Server connection failed. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setNewProject({ title: "", language: "javascript" });
    setIsCreateOpen(true);
  };

  const createNewProject = async () => {
    if (!newProject.title.trim()) {
      return toast.error("Enter a project title");
    }

    setCreating(true);

    try {
      const res = await fetch("http://localhost:5000/project/create", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newProject.title.trim(),
          language: newProject.language,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data?.error || "Failed to create project");
      }

      const roomID = data.project?.roomID || data.roomID;

      toast.success("Project created ✅");
      setIsCreateOpen(false);

      if (data.project) {
        setProjects((prev) => [data.project, ...prev]);
      }

      navigate(`/editor/${roomID}`);
    } catch (err) {
      toast.error("Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  const openRenameModal = (project) => {
    setRenameData({
      roomID: project.roomID,
      title: project.title || "",
    });
    setIsRenameOpen(true);
  };

  const renameProject = async () => {
    if (!renameData.roomID) return toast.error("Room ID missing");
    if (!renameData.title.trim()) return toast.error("Enter new title");

    setRenaming(true);

    try {
      const res = await fetch(
        `http://localhost:5000/project/${renameData.roomID}/rename`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: renameData.title.trim() }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data?.error || "Rename failed");
      }

      toast.success("Project renamed ✅");
      setIsRenameOpen(false);
      setOpenMenuId(null);

      setProjects((prev) =>
        prev.map((p) => (p.roomID === renameData.roomID ? data.project : p))
      );
    } catch (err) {
      toast.error("Server error while renaming");
    } finally {
      setRenaming(false);
    }
  };

  const joinRoom = async () => {
    const roomID = roomInput.trim();
    if (!roomID) return toast.error("Enter Room ID");

    setJoining(true);

    try {
      const res = await fetch(`http://localhost:5000/project/${roomID}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data?.error || "Room not found");
      }

      toast.success("Joining room ✅");
      navigate(`/editor/${roomID}`);
    } catch (err) {
      toast.error("Server not reachable");
    } finally {
      setJoining(false);
    }
  };

  const deleteProject = async (roomID) => {
    if (!roomID) return;

    const ok = window.confirm("Delete this project? This cannot be undone.");
    if (!ok) return;

    try {
      const res = await fetch(`http://localhost:5000/project/${roomID}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data?.error || "Delete failed");
      }

      toast.success("Project deleted ✅");
      setProjects((prev) => prev.filter((p) => p.roomID !== roomID));
    } catch (err) {
      toast.error("Server error while deleting");
    }
  };

  const copyRoomId = async (roomID) => {
    try {
      await navigator.clipboard.writeText(roomID);
      toast.success("Room ID copied ✅");
    } catch {
      toast.error("Copy failed");
    }
  };

  const copyInviteLink = async (roomID) => {
    const link = `http://localhost:5173/editor/${roomID}`;
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Invite link copied ✅");
    } catch {
      toast.error("Copy failed");
    }
  };

  // ✅ Search is WORKING
  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return projects;

    return projects.filter((p) => {
      const title = (p.title || "").toLowerCase();
      const room = (p.roomID || "").toLowerCase();
      const lang = (p.language || "").toLowerCase();
      return title.includes(q) || room.includes(q) || lang.includes(q);
    });
  }, [projects, searchQuery]);

  const latestUpdatedAt = useMemo(() => {
    if (!projects.length) return null;
    const sorted = [...projects].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    return sorted[0]?.updatedAt || null;
  }, [projects]);

  return (
    <div className="relative min-h-screen bg-[#050507] text-gray-300 flex flex-col selection:bg-cyan-500/30">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />

      <Navbar />

      {/* ✅ Create Modal */}
      {isCreateOpen && (
        <ModalShell
          title="Create Workspace"
          subtitle="Choose title + language"
          onClose={() => setIsCreateOpen(false)}
        >
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                Project Title
              </label>
              <input
                autoFocus
                value={newProject.title}
                onChange={(e) =>
                  setNewProject((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="e.g. DevNexus IDE"
                className="mt-2 w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-cyan-500/50 transition-all text-xs font-bold tracking-widest text-white placeholder:text-gray-700"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                Language
              </label>
              <select
                value={newProject.language}
                onChange={(e) =>
                  setNewProject((p) => ({ ...p, language: e.target.value }))
                }
                className="mt-2 w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-cyan-500/50 transition-all text-xs font-bold tracking-widest text-white"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>

            <div className="flex gap-3 justify-end pt-3">
              <button
                onClick={() => setIsCreateOpen(false)}
                className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition"
              >
                Cancel
              </button>

              <button
                disabled={creating}
                onClick={createNewProject}
                className="px-6 py-2 rounded-xl bg-cyan-500 text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition disabled:opacity-60"
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {/* ✅ Rename Modal */}
      {isRenameOpen && (
        <ModalShell
          title="Rename Workspace"
          subtitle="Change project title"
          onClose={() => setIsRenameOpen(false)}
        >
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                New Title
              </label>
              <input
                autoFocus
                value={renameData.title}
                onChange={(e) =>
                  setRenameData((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Enter new name..."
                className="mt-2 w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-cyan-500/50 transition-all text-xs font-bold tracking-widest text-white placeholder:text-gray-700"
              />
            </div>

            <div className="flex gap-3 justify-end pt-3">
              <button
                onClick={() => setIsRenameOpen(false)}
                className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition"
              >
                Cancel
              </button>

              <button
                disabled={renaming}
                onClick={renameProject}
                className="px-6 py-2 rounded-xl bg-cyan-500 text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition disabled:opacity-60"
              >
                {renaming ? "Renaming..." : "Rename"}
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Sparkles size={12} />
              Cloud Environments Ready
            </div>

            <h1 className="text-4xl font-black text-white tracking-tight uppercase">
              Terminal:{" "}
              <span className="text-cyan-400">
                {user?.name?.split(" ")[0] || "Developer"}
              </span>
            </h1>

            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
              Active Workspaces: {projects.length}
            </p>
          </div>

          {/* Join + New */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-[280px]">
              <input
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
                placeholder="ENTER ROOM ID..."
                className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 px-4 outline-none focus:border-cyan-500/50 transition-all text-[10px] font-bold tracking-widest text-white placeholder:text-gray-700 uppercase"
              />
            </div>

            <button
              onClick={joinRoom}
              disabled={joining}
              className="group flex items-center justify-center gap-3 bg-white text-black px-7 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all hover:bg-cyan-500 active:scale-95 shadow-lg shadow-white/5 disabled:opacity-60"
            >
              <LogIn size={18} />
              <span>{joining ? "Joining..." : "Join Room"}</span>
            </button>

            <button
              onClick={openCreateModal}
              className="group flex items-center justify-center gap-3 bg-cyan-500 text-black px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all hover:bg-white active:scale-95 shadow-lg shadow-cyan-500/10"
            >
              <Plus size={18} />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            icon={<Terminal size={20} />}
            label="Total Projects"
            value={projects.length}
            color="text-cyan-400"
          />
          <StatCard
            icon={<Clock size={20} />}
            label="Last Updated"
            value={latestUpdatedAt ? timeAgo(latestUpdatedAt) : "—"}
            color="text-blue-400"
          />
          <StatCard
            icon={<Folder size={20} />}
            label="Workspace Status"
            value="Online"
            color="text-emerald-400"
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="SEARCH (TITLE / ROOM / LANGUAGE)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-cyan-500/50 transition-all text-[10px] font-bold tracking-widest text-white placeholder:text-gray-700"
            />
          </div>

          <div className="flex items-center bg-white/[0.02] p-1.5 rounded-xl border border-white/5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-gray-600 hover:text-white"
              }`}
            >
              <LayoutGrid size={18} />
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-gray-600 hover:text-white"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Projects */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-52 rounded-2xl bg-white/[0.02] animate-pulse border border-white/5"
              />
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-500/5 border border-red-500/10 p-12 rounded-3xl flex flex-col items-center gap-4 text-center">
            <AlertCircle size={32} className="text-red-500/50" />
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              {error}
            </p>
            <button
              onClick={fetchProjects}
              className="mt-2 text-[10px] font-black uppercase tracking-widest bg-white text-black px-6 py-2.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <>
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CreateCard onClick={openCreateModal} />

                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    navigate={navigate}
                    openMenuId={openMenuId}
                    setOpenMenuId={setOpenMenuId}
                    onCopyRoom={copyRoomId}
                    onCopyInvite={copyInviteLink}
                    onDelete={deleteProject}
                    onRename={() => openRenameModal(project)}
                  />
                ))}
              </div>
            )}

            {viewMode === "list" && (
              <div className="space-y-3">
                <div
                  onClick={openCreateModal}
                  className="cursor-pointer bg-white/[0.02] border border-dashed border-white/10 rounded-2xl p-5 hover:border-cyan-500/40 hover:bg-cyan-500/[0.02] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-cyan-400">
                        <Plus size={20} />
                      </div>
                      <div>
                        <p className="text-white font-black uppercase tracking-widest text-xs">
                          Create New Workspace
                        </p>
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">
                          Add a new project instance
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight className="text-cyan-400" size={18} />
                  </div>
                </div>

                {filteredProjects.map((project) => (
                  <ProjectRow
                    key={project._id}
                    project={project}
                    navigate={navigate}
                    openMenuId={openMenuId}
                    setOpenMenuId={setOpenMenuId}
                    onCopyRoom={copyRoomId}
                    onCopyInvite={copyInviteLink}
                    onDelete={deleteProject}
                    onRename={() => openRenameModal(project)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

/* ----------------- UI Components ----------------- */

const ModalShell = ({ title, subtitle, onClose, children }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#0b0b10] border border-white/10 rounded-2xl p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-white font-black text-lg uppercase tracking-widest">
              {title}
            </h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
              {subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

const CreateCard = ({ onClick }) => (
  <div
    onClick={onClick}
    className="group border-2 border-dashed border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] transition-all min-h-[220px]"
  >
    <div className="w-14 h-14 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all">
      <Plus size={28} />
    </div>
    <div className="text-center">
      <p className="text-xs font-black uppercase tracking-widest text-white">
        Initialize New
      </p>
      <p className="text-[10px] font-bold text-gray-600 mt-1 uppercase">
        Instance Workspace
      </p>
    </div>
  </div>
);

// ✅ CYBERPUNK DROPDOWN MENU (fixed)
const CyberMenu = ({ children }) => {
  return (
    <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-cyan-500/20 bg-[#06060a]/95 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 z-[9999] overflow-hidden">
      {/* top neon line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400/70 via-white/30 to-cyan-400/70" />
      <div className="p-2">{children}</div>
    </div>
  );
};

const MenuItem = ({ icon, label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all
      ${
        danger
          ? "text-red-400 hover:bg-red-500/10"
          : "text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300"
      }
    `}
  >
    <span className={`${danger ? "text-red-400" : "text-cyan-400/70"}`}>
      {icon}
    </span>
    <span className="truncate">{label}</span>
  </button>
);

const Divider = () => <div className="my-2 h-[1px] bg-white/10" />;

const ProjectCard = ({
  project,
  navigate,
  openMenuId,
  setOpenMenuId,
  onCopyRoom,
  onCopyInvite,
  onDelete,
  onRename,
}) => {
  const menuOpen = openMenuId === project._id;

  return (
    <div
      onClick={() => navigate(`/editor/${project.roomID}`)}
      // ✅ removed overflow-hidden so dropdown won't cut
      className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col justify-between min-h-[220px]"
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black border border-white/10 bg-cyan-500/10 text-cyan-400">
            {(project.language || "JS").toUpperCase().slice(0, 2)}
          </div>

          {/* ✅ 3 Dot Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId(menuOpen ? null : project._id);
              }}
              className="p-2 rounded-lg text-gray-600 hover:text-white hover:bg-white/5 transition-all"
            >
              <MoreVertical size={18} />
            </button>

            {menuOpen && (
              <div onClick={(e) => e.stopPropagation()}>
                <CyberMenu>
                  <MenuItem
                    icon={<ExternalLink size={14} />}
                    label="Open Workspace"
                    onClick={() => navigate(`/editor/${project.roomID}`)}
                  />
                  <MenuItem
                    icon={<Pencil size={14} />}
                    label="Rename"
                    onClick={onRename}
                  />
                  <Divider />
                  <MenuItem
                    icon={<Copy size={14} />}
                    label="Copy Room ID"
                    onClick={() => onCopyRoom(project.roomID)}
                  />
                  <MenuItem
                    icon={<Copy size={14} />}
                    label="Copy Invite Link"
                    onClick={() => onCopyInvite(project.roomID)}
                  />
                  <Divider />
                  <MenuItem
                    danger
                    icon={<Trash2 size={14} />}
                    label="Delete"
                    onClick={() => onDelete(project.roomID)}
                  />
                </CyberMenu>
              </div>
            )}
          </div>
        </div>

        <h3 className="text-md font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors truncate uppercase tracking-tight">
          {project.title || "Untitled"}
        </h3>

        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
          ID: {project.roomID?.substring(0, 8)}
        </p>
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-500">
          <Clock size={10} />
          {project.updatedAt ? timeAgo(project.updatedAt) : "--"}
        </div>

        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-cyan-400 opacity-0 group-hover:opacity-100 transition-all">
          Launch <ArrowUpRight size={14} />
        </div>
      </div>
    </div>
  );
};

const ProjectRow = ({
  project,
  navigate,
  openMenuId,
  setOpenMenuId,
  onCopyRoom,
  onCopyInvite,
  onDelete,
  onRename,
}) => {
  const menuOpen = openMenuId === project._id;

  return (
    <div
      onClick={() => navigate(`/editor/${project.roomID}`)}
      className="cursor-pointer bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-cyan-500/40 transition-all flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-cyan-400 text-xs font-black">
          {(project.language || "JS").toUpperCase().slice(0, 2)}
        </div>

        <div>
          <p className="text-white font-black uppercase tracking-widest text-xs">
            {project.title || "Untitled"}
          </p>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">
            Room: {project.roomID?.substring(0, 10)} • Updated{" "}
            {project.updatedAt ? timeAgo(project.updatedAt) : "--"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuId(menuOpen ? null : project._id);
            }}
            className="p-2 rounded-lg text-gray-600 hover:text-white hover:bg-white/5 transition-all"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div onClick={(e) => e.stopPropagation()}>
              <CyberMenu>
                <MenuItem
                  icon={<ExternalLink size={14} />}
                  label="Open Workspace"
                  onClick={() => navigate(`/editor/${project.roomID}`)}
                />
                <MenuItem
                  icon={<Pencil size={14} />}
                  label="Rename"
                  onClick={onRename}
                />
                <Divider />
                <MenuItem
                  icon={<Copy size={14} />}
                  label="Copy Room ID"
                  onClick={() => onCopyRoom(project.roomID)}
                />
                <MenuItem
                  icon={<Copy size={14} />}
                  label="Copy Invite Link"
                  onClick={() => onCopyInvite(project.roomID)}
                />
                <Divider />
                <MenuItem
                  danger
                  icon={<Trash2 size={14} />}
                  label="Delete"
                  onClick={() => onDelete(project.roomID)}
                />
              </CyberMenu>
            </div>
          )}
        </div>

        <ArrowUpRight className="text-cyan-400" size={18} />
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 flex items-center gap-5 hover:border-white/10 transition-all group">
    <div
      className={`p-3 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-cyan-500/30 transition-colors ${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-[9px] text-gray-600 uppercase font-black tracking-[0.2em]">
        {label}
      </p>
      <p className="text-xl font-bold text-white leading-none mt-1.5 tabular-nums">
        {value}
      </p>
    </div>
  </div>
);

function timeAgo(dateInput) {
  const d = new Date(dateInput);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);

  if (diff < 5) return "just now";
  if (diff < 60) return `${diff}s ago`;

  const mins = Math.floor(diff / 60);
  if (mins < 60) return `${mins}m ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;

  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default Dashboard;
