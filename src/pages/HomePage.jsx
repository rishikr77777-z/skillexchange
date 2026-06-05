import React, { useState } from 'react';
import { MOCK_USERS, TIER_COLORS, SKILL_CATEGORIES } from '../data/constants';
import UserCard from '../components/UserCard';
import UserDetailModal from '../components/UserDetailModal';
import MessagesPanel from '../components/MessagesPanel';
import ReportModal from '../components/ReportModal';
import FeedbackModal from '../components/FeedbackModal';
import './HomePage.css';

export default function HomePage({ user, navigate }) {
  const [activeTab, setActiveTab]       = useState('explore');
  const [searchQuery, setSearchQuery]   = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMessages, setShowMessages] = useState(false);
  const [showReport, setShowReport]     = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);
  const [chatUser, setChatUser]         = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState([]);

  const currentUser = {
    name: user?.name || 'You',
    tier: 'B', skills: ['React', 'UI/UX Design'],
    wantToLearn: ['Guitar', 'Spanish'],
    verified: uploadedDocs.length > 0,
    avatar: '🧑‍💻', rating: 4.5, exchanges: 5,
  };

  const filteredUsers = MOCK_USERS.filter(u => {
    const q = searchQuery.toLowerCase();
    return !q
      || u.name.toLowerCase().includes(q)
      || u.skills.some(s => s.toLowerCase().includes(q))
      || u.wantToLearn.some(s => s.toLowerCase().includes(q));
  });

  const handleChat   = u => { setChatUser(u); setShowMessages(true); setSelectedUser(null); };
  const handleReport = (u, type) => { setReportTarget({ user: u, type }); setShowReport(true); setSelectedUser(null); };
  const handleDocUpload = e => {
    const files = Array.from(e.target.files);
    setUploadedDocs(prev => [...prev, ...files.map(f => ({ name: f.name, date: new Date().toLocaleDateString() }))]);
  };

  return (
    <div className="home-page">
      <div className="home-bg">
        <div className="home-mesh-1" /><div className="home-mesh-2" /><div className="home-grid" />
      </div>

      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="logo-circle-sm"><span className="logo-initials">SE</span></div>
          <span className="brand-name">Skill Exchange</span>
        </div>

        <div className="sidebar-user-card glass-card">
          <div className="suc-avatar">{currentUser.avatar}</div>
          <div className="suc-info">
            <div className="suc-name">
              {currentUser.name}
              {currentUser.verified && <span className="verified-dot" title="Verified">✓</span>}
            </div>
            <div className="suc-tier" style={{ color: TIER_COLORS[currentUser.tier] }}>
              Tier {currentUser.tier}
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {[
            { id: 'home',    icon: '🏠', label: 'Home' },
            { id: 'explore', icon: '🔍', label: 'Explore' },
            { id: 'matches', icon: '🔄', label: 'Matches' },
            { id: 'profile', icon: '👤', label: 'Profile' },
          ].map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <button className="nav-item nav-item-msg" onClick={() => setShowMessages(true)}>
            <span className="nav-icon">💬</span>
            <span>Chat</span>
            <div className="nav-notif-dot" />
          </button>
        </nav>

        <div className="sidebar-divider" />

        <div className="sidebar-actions">
          <button className="action-btn" onClick={() => setShowMessages(true)}>
            <span>💬</span> Messages <div className="notif-badge">3</div>
          </button>
          <button className="action-btn" onClick={() => setShowFeedback(true)}>
            <span>⭐</span> Feedback
          </button>
          <button className="action-btn danger" onClick={() => navigate('landing')}>
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="main-content">
        <div className="main-header">
          <div>
            <h1 className="main-title">
              {activeTab === 'home'    && <>Welcome back, <span className="glow-text">{currentUser.name.split(' ')[0]}</span></>}
              {activeTab === 'explore' && <>Explore <span className="glow-text">Skills</span></>}
              {activeTab === 'matches' && <>Your <span className="glow-text">Matches</span></>}
              {activeTab === 'profile' && <>Your <span className="glow-text">Profile</span></>}
            </h1>
            <p className="main-subtitle">
              {activeTab === 'home'    && "Here's what's happening in your skill exchange world"}
              {activeTab === 'explore' && 'Find people with the skills you want to learn'}
              {activeTab === 'matches' && "People you've connected with"}
              {activeTab === 'profile' && 'Manage your skills and documents'}
            </p>
          </div>
          <div className="header-actions">
            <button className="header-notif" onClick={() => setShowMessages(true)}>
              🔔 <span className="notif-count">3</span>
            </button>
            <div className="header-avatar">{currentUser.avatar}</div>
          </div>
        </div>

        {/* ── Home Tab ── */}
        {activeTab === 'home' && (
          <div className="tab-content">
            <div className="stats-row">
              {[
                { icon: '🔄', value: currentUser.exchanges, label: 'Exchanges Done',  cls: 'stat-purple' },
                { icon: '⭐', value: `${currentUser.rating}/5`, label: 'Your Rating', cls: 'stat-gold'   },
                { icon: '📚', value: currentUser.skills.length,      label: 'Skills Offered', cls: 'stat-blue' },
                { icon: '🎯', value: currentUser.wantToLearn.length,  label: 'Skills Wanted',  cls: 'stat-pink' },
              ].map(s => (
                <div key={s.label} className={`stat-card glass-card ${s.cls}`}>
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="section-block">
              <div className="section-row-header">
                <h2 className="section-h2">🌟 Suggested for You</h2>
                <button className="see-all-btn" onClick={() => setActiveTab('explore')}>See all →</button>
              </div>
              <div className="cards-row scroll-x">
                {MOCK_USERS.slice(0, 4).map(u => (
                  <UserCard key={u.id} user={u}
                    onChat={() => handleChat(u)}
                    onView={() => setSelectedUser(u)}
                    onReport={() => handleReport(u, 'abuse')} />
                ))}
              </div>
            </div>

            <div className="section-block">
              <h2 className="section-h2">📌 Recent Activity</h2>
              <div className="activity-list glass-card">
                {[
                  { icon: '🔄', text: 'Marco Rivera accepted your exchange request', time: '2h ago', color: '#7c3aed' },
                  { icon: '⭐', text: 'Aisha Patel left you a 5-star review',        time: '5h ago', color: '#f59e0b' },
                  { icon: '💬', text: 'New message from Raj Sharma',                  time: '1d ago', color: '#3b82f6' },
                  { icon: '✅', text: 'Your Python tutorial was verified',             time: '2d ago', color: '#4ade80' },
                ].map((a, i) => (
                  <div key={i} className="activity-item">
                    <div className="activity-dot" style={{ background: a.color }}>{a.icon}</div>
                    <span className="activity-text">{a.text}</span>
                    <span className="activity-time">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Explore Tab ── */}
        {activeTab === 'explore' && (
          <div className="tab-content">
            <div className="search-bar-wrap">
              <div className="search-bar glass-card">
                <span className="search-icon">🔍</span>
                <input
                  className="search-input"
                  placeholder="Search skills, users, interests..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
                )}
              </div>
            </div>

            <div className="category-row scroll-x" style={{ marginBottom: 24 }}>
              {SKILL_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`chip chip-skill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >{cat}</button>
              ))}
            </div>

            <div className="users-grid">
              {filteredUsers.map(u => (
                <UserCard key={u.id} user={u} large
                  onChat={() => handleChat(u)}
                  onView={() => setSelectedUser(u)}
                  onReport={() => handleReport(u, 'abuse')} />
              ))}
              {filteredUsers.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">🔍</div>
                  <p>No users found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Matches Tab ── */}
        {activeTab === 'matches' && (
          <div className="tab-content">
            <div className="matches-list">
              {MOCK_USERS.slice(0, 4).map(u => (
                <div key={u.id} className="match-row glass-card">
                  <div className="match-avatar">{u.avatar}</div>
                  <div className="match-info">
                    <div className="match-name">
                      {u.name}
                      {u.verified && <span className="verified-badge">✓ Verified</span>}
                    </div>
                    <div className="match-tags">
                      {u.skills.slice(0, 2).map(s => (
                        <span key={s} className="chip chip-skill" style={{ fontSize: 11, padding: '3px 10px' }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="match-tier" style={{ color: TIER_COLORS[u.tier] }}>Tier {u.tier}</div>
                  <div className="match-actions">
                    <button className="btn-primary" style={{ padding: '8px 18px', fontSize: 13 }} onClick={() => handleChat(u)}>
                      <span>Chat</span>
                    </button>
                    <button className="btn-ghost" style={{ padding: '8px 18px', fontSize: 13 }} onClick={() => setSelectedUser(u)}>
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Profile Tab ── */}
        {activeTab === 'profile' && (
          <div className="tab-content">
            <div className="profile-layout">
              <div className="profile-main glass-card">
                <div className="profile-hero">
                  <div className="profile-avatar-big">{currentUser.avatar}</div>
                  <div>
                    <div className="profile-name-row">
                      <h2 className="profile-name-big">{currentUser.name}</h2>
                      {currentUser.verified
                        ? <span className="verified-badge">✓ Verified</span>
                        : <span className="unverified-badge">⚠ Unverified</span>}
                    </div>
                    <div className="profile-tier-display" style={{ color: TIER_COLORS[currentUser.tier] }}>
                      ● Tier {currentUser.tier}
                    </div>
                    <p className="profile-bio-text">React developer passionate about design. Always learning something new.</p>
                  </div>
                </div>

                <div className="profile-section">
                  <h3 className="profile-section-title">🎯 Skills I Offer</h3>
                  <div className="skill-chips">
                    {currentUser.skills.map(s => <span key={s} className="chip chip-skill active">{s}</span>)}
                  </div>
                </div>

                <div className="profile-section">
                  <h3 className="profile-section-title">📚 Skills I Want to Learn</h3>
                  <div className="skill-chips">
                    {currentUser.wantToLearn.map(s => <span key={s} className="chip chip-interest active">{s}</span>)}
                  </div>
                </div>
              </div>

              <div className="profile-side">
                {/* Document upload */}
                <div className="doc-upload-card glass-card">
                  <h3 className="profile-section-title">📂 Skill Verification</h3>
                  <p className="doc-desc">Upload certificates or portfolios to become a verified user and earn a green badge.</p>
                  <label className="upload-area">
                    <input type="file" multiple accept=".pdf,.jpg,.png,.doc,.docx" onChange={handleDocUpload} style={{ display: 'none' }} />
                    <div className="upload-icon">📤</div>
                    <div className="upload-text">Click to upload documents</div>
                    <div className="upload-sub">PDF, PNG, JPG, DOC (max 10MB)</div>
                  </label>
                  {uploadedDocs.length > 0 && (
                    <div className="uploaded-list">
                      {uploadedDocs.map((doc, i) => (
                        <div key={i} className="uploaded-file">
                          <span>📄 {doc.name}</span>
                          <span className="file-date">{doc.date}</span>
                          <span className="file-status">✓</span>
                        </div>
                      ))}
                      <div className="verified-badge" style={{ marginTop: 12, padding: '8px 16px', fontSize: 13, justifyContent: 'center' }}>
                        ✓ Documents submitted for verification
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="profile-stats-card glass-card">
                  <h3 className="profile-section-title">📊 My Stats</h3>
                  <div className="stats-mini">
                    {[
                      ['🔄', 'Exchanges', currentUser.exchanges],
                      ['⭐', 'Rating', `${currentUser.rating}/5`],
                      ['👥', 'Connections', 12],
                      ['🏆', 'Tier', currentUser.tier],
                    ].map(([icon, label, val]) => (
                      <div key={label} className="stats-mini-item">
                        <div className="stats-mini-icon">{icon}</div>
                        <div className="stats-mini-val">{val}</div>
                        <div className="stats-mini-label">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── Modals / Panels ── */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onChat={() => handleChat(selectedUser)}
          onReport={type => handleReport(selectedUser, type)}
        />
      )}
      {showMessages && (
        <MessagesPanel
          users={MOCK_USERS}
          chatUser={chatUser}
          onClose={() => { setShowMessages(false); setChatUser(null); }}
        />
      )}
      {showReport   && <ReportModal   target={reportTarget} onClose={() => setShowReport(false)} />}
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </div>
  );
}
