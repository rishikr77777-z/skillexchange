import React from 'react';
import { TIER_COLORS } from '../../data/constants';
import './UserCard.css';

export default function UserCard({ user, onChat, onView, onReport, large }) {
  return (
    <div className={`user-card glass-card ${large ? 'user-card-large' : ''}`}>
      <div className="uc-header">
        <div className="uc-avatar">{user.avatar}</div>
        <div className="uc-info">
          <div className="uc-name">
            {user.name}
            {user.verified && <span className="verified-dot" title="Verified">✓</span>}
          </div>
          <div className="uc-tier" style={{ color: TIER_COLORS[user.tier] }}>
            Tier {user.tier}
          </div>
        </div>
        <div className="uc-rating">⭐ {user.rating}</div>
      </div>

      {large && <p className="uc-bio">{user.bio}</p>}

      <div className="uc-skills">
        <div className="uc-skill-label">Teaches:</div>
        <div className="uc-chips">
          {user.skills.slice(0, 2).map(s => (
            <span key={s} className="chip chip-skill">{s}</span>
          ))}
        </div>
      </div>

      <div className="uc-skills">
        <div className="uc-skill-label">Wants:</div>
        <div className="uc-chips">
          {user.wantToLearn.slice(0, 2).map(s => (
            <span key={s} className="chip chip-interest">{s}</span>
          ))}
        </div>
      </div>

      <div className="uc-actions">
        <button className="btn-primary uc-chat-btn" onClick={onChat}>
          <span>💬 Chat</span>
        </button>
        <button className="btn-ghost uc-view-btn" onClick={onView}>👁</button>
        <button className="uc-report-btn" onClick={onReport} title="Report">⚑</button>
      </div>
    </div>
  );
}
