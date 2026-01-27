import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Import the brain

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Go back to home
  };

  return (
    <nav className="h-14 border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <Code2 size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            Dev<span className="text-primary">Nexus</span>
          </span>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          
          {user ? (
            // LOGGED IN VIEW
            <>
              <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white flex items-center gap-2">
                 <LayoutDashboard size={16} />
                 <span className="hidden sm:inline">Dashboard</span>
              </Link>
              
              <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
              
              <Link to="/profile" className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-white/5 transition-colors">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-[10px] font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-white hidden sm:block">{user.name}</span>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            // GUEST VIEW
            <>
              <Link to="/signin" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-primary/20"
              >
                Get Started
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;