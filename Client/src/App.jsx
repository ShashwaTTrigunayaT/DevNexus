import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext'; // Import Provider

// Import Pages
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound'; // Import 404

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Global Toast Notifications */}
        <Toaster position="top-center" theme="dark" richColors />
        
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Auth */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          
          {/* Protected Area (Logic handled in components for now) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          
          {/* Editor */}
          <Route path="/editor/:roomId" element={<EditorPage />} />
          
          {/* Catch All - 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;