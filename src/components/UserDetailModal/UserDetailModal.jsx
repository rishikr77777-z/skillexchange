import React from 'react';
import { TIER_COLORS } from '../../data/constants';
import './UserDetailModal.css';

export default function UserDetailModal({ user, onClose, onChat, onReport }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="udm-card glass-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="udm-header">
          <div className="udm-avatar">{user.avatar}</div>
          <div className="udm-meta">
            <div className="udm-name-row">
              <h2 className="udm-name">{user.name}</h2>
              {user.verified
                ? <span className="verified-badge">✓ Verified</span>
                : <span className="unverified-badge">⚠ Unverified</span>}
            </div>
            <div className="udm-tier" style={{ color: TIER_COLORS[user.tier] }}>
              Tier {user.tier} · ⭐ {user.rating} · {user.exchanges} exchanges
            </div>
            <p className="udm-bio">{user.bio}</p>
          </div>
        </div>

        <div className="udm-section">
          <h4 className="udm-section-title">🎯 Skills They Offer</h4>
          <div className="udm-chips">
            {user.skills.map(s => (
              <span key={s} className="chip chip-skill active">{s}</span>
            ))}
          </div>
        </div>

        <div className="udm-section">
          <h4 className="udm-section-title">📚 Skills They Want</h4>
          <div className="udm-chips">
            {user.wantToLearn.map(s => (
              <span key={s} className="chip chip-interest active">{s}</span>
            ))}
          </div>
        </div>

        <div className="udm-section">
          <h4 className="udm-section-title">❤️ Interests</h4>
          <div className="udm-chips">
            {user.interests.map(s => (
              <span key={s} className="chip chip-skill">{s}</span>
            ))}
          </div>
        </div>

        <div className="udm-footer">
          <button className="btn-primary udm-chat-btn" onClick={onChat}>
            <span>💬 Start Conversation</span>
          </button>
          <button className="btn-ghost" onClick={() => onReport('fake')}>⚑ Report Fake</button>
          <button className="btn-ghost udm-danger-btn" onClick={() => onReport('scam')}>🚨 Report Scam</button>
        </div>
      </div>
    </div>
  );
}
