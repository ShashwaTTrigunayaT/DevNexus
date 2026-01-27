import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />

      <div className="relative z-10">
        <h1 className="text-[150px] font-black text-white/5 leading-none select-none">404</h1>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <AlertTriangle size={64} className="text-primary mx-auto mb-4" />
             <h2 className="text-3xl font-bold text-white mb-2">Lost in Space?</h2>
             <p className="text-gray-400 max-w-md mx-auto mb-8">
               The page you are looking for has drifted into a black hole or never existed.
             </p>
             
             <Link 
               to="/dashboard"
               className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
             >
               <Home size={18} />
               Return to Base
             </Link>
        </div>
      </div>

    </div>
  );
};

export default NotFound;