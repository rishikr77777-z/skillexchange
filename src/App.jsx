import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import HomePage from './pages/HomePage';
import './styles/global.css';

export default function App() {
  const [page, setPage] = useState('landing');
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);

  const navigate = (p, opts = {}) => {
    if (opts.authMode) setAuthMode(opts.authMode);
    setPage(p);
    window.scrollTo(0, 0);
  };

  const handleAuth = (userData) => {
    setUser(userData);
    if (authMode === 'register') {
      navigate('profile-setup');
    } else {
      navigate('home');
    }
  };

  const handleProfileComplete = (profileData) => {
    setUser(prev => ({ ...prev, ...profileData }));
    navigate('home');
  };

  return (
    <div className="app">
      {page === 'landing' && <LandingPage navigate={navigate} />}
      {page === 'auth' && <AuthPage mode={authMode} onAuth={handleAuth} navigate={navigate} />}
      {page === 'profile-setup' && <ProfileSetupPage user={user} onComplete={handleProfileComplete} />}
      {page === 'home' && <HomePage user={user} navigate={navigate} />}
    </div>
  );
}
