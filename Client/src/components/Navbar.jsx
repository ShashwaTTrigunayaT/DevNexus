import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code2, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const displayName =
    user?.name ||
    userInfo?.name ||
    user?.email?.split("@")[0] ||
    userInfo?.email?.split("@")[0] ||
    "User";

  const avatarLetter = (displayName?.charAt(0) || "U").toUpperCase();

  // ✅ Profile Image Priority: AuthContext > localStorage
  const profileImage = user?.profileImage || userInfo?.profileImage || "";

  return (
    <nav className="h-16 border-b border-white/5 bg-[#050507]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 transition-all">
            <Code2 size={20} />
          </div>
          <span className="text-white font-bold text-lg tracking-tight uppercase">
            DevNexus
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-cyan-400 flex items-center gap-2 transition-colors"
              >
                <LayoutDashboard size={14} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              {/* Divider */}
              <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

              <Link to="/profile" className="flex items-center gap-3 group">
                {/* ✅ Avatar with image */}
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-cyan-400 group-hover:border-cyan-500/50 transition-all">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    avatarLetter
                  )}
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white hidden sm:block">
                  {displayName}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-8">
              <Link
                to="/signin"
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-black rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
