import React, { useState } from 'react';
import './AuthPage.css';

export default function AuthPage({ mode, onAuth, navigate }) {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) return setError('Please fill all fields');
    if (!isLogin && !form.name) return setError('Please enter your name');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onAuth({ name: form.name || 'User', email: form.email, id: Date.now() });
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-mesh auth-mesh-1" />
        <div className="auth-mesh auth-mesh-2" />
        <div className="auth-grid" />
      </div>

      <button className="back-btn" onClick={() => navigate('landing')}>
        ← Back
      </button>

      <div className="auth-container">
        {/* Left side */}
        <div className="auth-left">
          <div className="auth-brand">
            <div className="logo-circle-sm"><span className="logo-initials">SE</span></div>
            <span className="brand-name">Skill Exchange</span>
          </div>
          <h2 className="auth-tagline">
            Where <span className="glow-text">Skills</span><br />
            become <span className="glow-text">Connections</span>
          </h2>
          <p className="auth-left-desc">
            Join a community of curious learners and passionate teachers. Exchange what you know for what you want to learn.
          </p>
          <div className="auth-perks">
            {['Verified skill profiles', 'Smart matching system', 'Secure messaging', 'Tier progression system'].map(p => (
              <div key={p} className="perk-item">
                <div className="perk-dot" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Form */}
        <div className="auth-right glass-card">
          <div className="auth-toggle">
            <button className={`toggle-btn ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>
              Sign In
            </button>
            <button className={`toggle-btn ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>
              Register
            </button>
          </div>

          <h3 className="auth-form-title">
            {isLogin ? 'Welcome back 👋' : 'Join Skill Exchange 🚀'}
          </h3>
          <p className="auth-form-sub">
            {isLogin ? 'Sign in to continue your skill journey' : 'Create your account and start exchanging'}
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                />
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="input-field"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="input-field"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className={`btn-primary auth-submit ${loading ? 'loading' : ''}`} disabled={loading}>
              <span>{loading ? 'Processing...' : isLogin ? 'Sign In →' : 'Create Account →'}</span>
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="social-btns">
              <button type="button" className="social-btn">
                <span>🌐</span> Continue with Google
              </button>
              <button type="button" className="social-btn">
                <span>🐙</span> Continue with GitHub
              </button>
            </div>
          </form>

          <p className="auth-switch">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="auth-link">
              {isLogin ? 'Register free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
