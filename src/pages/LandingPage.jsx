import React, { useEffect, useState } from 'react';
import './LandingPage.css';

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 4,
  size: 3 + Math.random() * 5,
}));

const ORBIT_SKILLS = [
  { label: 'Python', icon: '🐍', angle: 0 },
  { label: 'Guitar', icon: '🎸', angle: 60 },
  { label: 'UI/UX', icon: '🎨', angle: 120 },
  { label: 'Spanish', icon: '🌍', angle: 180 },
  { label: 'Chess', icon: '♟', angle: 240 },
  { label: 'Finance', icon: '📈', angle: 300 },
];

export default function LandingPage({ navigate }) {
  const [loaded, setLoaded] = useState(false);
  const [activeWord, setActiveWord] = useState(0);
  const words = ['Skills', 'Knowledge', 'Talent', 'Expertise'];

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const interval = setInterval(() => {
      setActiveWord(p => (p + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`landing ${loaded ? 'loaded' : ''}`}>
      {/* Background mesh */}
      <div className="landing-bg">
        <div className="mesh mesh-1" />
        <div className="mesh mesh-2" />
        <div className="mesh mesh-3" />
        <div className="grid-overlay" />
      </div>

      {/* Floating particles */}
      <div className="particles">
        {PARTICLES.map(p => (
          <div key={p.id} className="particle" style={{
            left: `${p.left}%`, top: `${p.top}%`,
            width: p.size, height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }} />
        ))}
      </div>

      {/* Navbar */}
      <nav className="land-nav">
        <div className="land-nav-inner">
          <div className="nav-logo-wrap">
            <div className="logo-circle-sm">
              <span className="logo-initials">SE</span>
            </div>
            <span className="brand-name">Skill Exchange</span>
          </div>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#tiers">Tiers</a>
          </div>
          <div className="nav-actions">
            <button className="btn-ghost" onClick={() => navigate('auth', { authMode: 'login' })}>
              Sign In
            </button>
            <button className="btn-primary" onClick={() => navigate('auth', { authMode: 'register' })}>
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag anim-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="tag-dot" />
            Skill Exchange Platform
          </div>

          <h1 className="hero-title anim-slide-up" style={{ animationDelay: '0.2s' }}>
            Exchange your
            <br />
            <span className="word-rotate">
              <span key={activeWord} className="word-anim glow-text">
                {words[activeWord]}
              </span>
            </span>
            <br />
            with the world
          </h1>

          <p className="hero-desc anim-slide-up" style={{ animationDelay: '0.35s' }}>
            Skill Exchange connects learners and teachers in a peer-to-peer exchange — you teach what you know, 
            you learn what you want. No money, just mutual growth.
          </p>

          <div className="hero-cta anim-slide-up" style={{ animationDelay: '0.5s' }}>
            <button className="btn-primary btn-lg" onClick={() => navigate('auth', { authMode: 'register' })}>
              <span>Start Exchanging →</span>
            </button>
            <button className="btn-ghost btn-lg" onClick={() => navigate('auth', { authMode: 'login' })}>
              Sign In
            </button>
          </div>

          <div className="hero-stats anim-slide-up" style={{ animationDelay: '0.65s' }}>
            {[['12K+', 'Active Users'], ['340+', 'Skills Listed'], ['98%', 'Match Rate']].map(([n, l]) => (
              <div key={l} className="stat-item">
                <span className="stat-num">{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right anim-fade-in" style={{ animationDelay: '0.3s' }}>
          {/* Logo Space - Circular */}
          <div className="logo-orbit-container">
            {/* Outer ring */}
            <div className="orbit-ring ring-outer" />
            <div className="orbit-ring ring-middle" />

            {/* Orbiting skill icons */}
            {ORBIT_SKILLS.map((s, i) => (
              <div key={s.label} className="orbit-item" style={{
                animationDelay: `${i * 0.5}s`,
                '--orbit-duration': `${8 + i * 0.5}s`,
                '--start-angle': `${s.angle}deg`,
              }}>
                <div className="orbit-bubble">
                  <span>{s.icon}</span>
                  <span className="orbit-label">{s.label}</span>
                </div>
              </div>
            ))}

            {/* CENTER — Logo */}
            <div className="logo-center">
              <div className="logo-glow" />
              <div className="logo-ring logo-ring-1" />
              <div className="logo-ring logo-ring-2" />
              <div className="logo-core">
                <img src="/skill-exchange-logo.svg" alt="Skill Exchange Logo" className="logo-img" />
                <div className="logo-sub">Skill Exchange</div>
              </div>
            </div>

            {/* Floating exchange cards */}
            <div className="exchange-card ex-card-1">
              <div className="ex-card-avatar" style={{ background: 'linear-gradient(135deg,#7c3aed,#3b82f6)' }}>A</div>
              <div className="ex-card-info">
                <div className="ex-card-name">Aryan teaches</div>
                <div className="ex-card-skill">React Development</div>
              </div>
            </div>
            <div className="exchange-card ex-card-2">
              <div className="ex-card-avatar" style={{ background: 'linear-gradient(135deg,#ec4899,#7c3aed)' }}>B</div>
              <div className="ex-card-info">
                <div className="ex-card-name">Beatriz teaches</div>
                <div className="ex-card-skill">Spanish Language</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section" id="how">
        <div className="section-header">
          <span className="section-tag">Simple Process</span>
          <h2 className="section-title">How <span className="glow-text">Skill Exchange</span> works</h2>
        </div>
        <div className="steps-grid">
          {[
            { num: '01', icon: '👤', title: 'Create Profile', desc: 'Set up your profile, list your skills, pick a tier level, and define what you want to learn.' },
            { num: '02', icon: '🔍', title: 'Find a Match', desc: 'Explore users with skills you want. Our algorithm matches you with compatible learners & teachers.' },
            { num: '03', icon: '💬', title: 'Connect & Chat', desc: 'Message them directly. Agree on a skill exchange schedule that works for both of you.' },
            { num: '04', icon: '🔄', title: 'Swap & Grow', desc: 'You teach, they teach. Both grow. Level up your tier as you gain experience and verified reviews.' },
          ].map((step, i) => (
            <div key={step.num} className="step-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="step-num">{step.num}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tier section */}
      <section className="tiers-section" id="tiers">
        <div className="section-header">
          <span className="section-tag">Skill Levels</span>
          <h2 className="section-title">Your <span className="glow-text">Skill Tier</span> System</h2>
          <p className="section-desc">Progress through tiers as you teach, learn, and get verified by the community.</p>
        </div>
        <div className="tiers-scroll scroll-x">
          {[
            { tier: 'E', label: 'Beginner', color: '#9ca3af', glow: 'rgba(156,163,175,0.3)', desc: 'Just starting out' },
            { tier: 'D', label: 'Novice', color: '#6ee7b7', glow: 'rgba(110,231,183,0.3)', desc: 'Learning basics' },
            { tier: 'C', label: 'Adept', color: '#60a5fa', glow: 'rgba(96,165,250,0.3)', desc: 'Getting skilled' },
            { tier: 'B', label: 'Skilled', color: '#a78bfa', glow: 'rgba(167,139,250,0.3)', desc: 'Strong foundation' },
            { tier: 'A', label: 'Expert', color: '#f59e0b', glow: 'rgba(245,158,11,0.3)', desc: 'Near mastery' },
            { tier: 'S', label: 'Master', color: '#f97316', glow: 'rgba(249,115,22,0.3)', desc: 'Community master' },
            { tier: 'S+', label: 'Elite', color: '#ec4899', glow: 'rgba(236,72,153,0.3)', desc: 'Elite tier' },
            { tier: 'S++', label: 'Legendary', color: '#fbbf24', glow: 'rgba(251,191,36,0.5)', desc: 'Absolute legend' },
          ].map((t) => (
            <div key={t.tier} className="tier-card glass-card" style={{ '--tier-color': t.color, '--tier-glow': t.glow }}>
              <div className="tier-badge-big">{t.tier}</div>
              <div className="tier-name">{t.label}</div>
              <div className="tier-desc-text">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2 className="cta-title">Ready to start <span className="glow-text">exchanging?</span></h2>
          <p className="cta-desc">Join thousands already growing together through skill exchange.</p>
          <button className="btn-primary btn-xl" onClick={() => navigate('auth', { authMode: 'register' })}>
            <span>Create Free Account →</span>
          </button>
        </div>
        <div className="cta-glow" />
      </section>

      {/* Footer */}
      <footer className="land-footer">
        <div className="footer-logo">
          <div className="logo-circle-sm"><span className="logo-initials">SE</span></div>
          <span>Skill Exchange</span>
        </div>
        <p className="footer-copy">© 2025 Skill Exchange. Built for learning, made with ♥</p>
      </footer>
    </div>
  );
}
