import React, { useState } from 'react';
import './FeedbackModal.css';

const FEEDBACK_TAGS = ['Feature Request', 'Bug Report', 'General Feedback', 'Suggestion'];
const MOOD_LABELS   = ['', 'Poor 😞', 'Fair 😐', 'Good 🙂', 'Great 😊', 'Amazing! 🤩'];

export default function FeedbackModal({ onClose }) {
  const [rating, setRating]       = useState(0);
  const [hover, setHover]         = useState(0);
  const [tag, setTag]             = useState('');
  const [text, setText]           = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="fm-card glass-card" onClick={e => e.stopPropagation()}>
          <div className="fm-success">
            <div className="fm-success-icon">🌟</div>
            <h3>Thanks for your feedback!</h3>
            <p>Your feedback helps us make Skill Exchange better for everyone. We appreciate it!</p>
            <button className="btn-primary" style={{ marginTop: 20 }} onClick={onClose}>
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="fm-card glass-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h3 className="fm-title">Share Your Feedback ⭐</h3>
        <p className="fm-desc">How's your Skill Exchange experience? Help us improve!</p>

        {/* Star rating */}
        <div className="fm-stars">
          {[1, 2, 3, 4, 5].map(s => (
            <button
              key={s}
              className={`fm-star ${s <= (hover || rating) ? 'lit' : ''}`}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(s)}
            >★</button>
          ))}
        </div>
        {rating > 0 && (
          <p className="fm-mood">{MOOD_LABELS[rating]}</p>
        )}

        {/* Tags */}
        <div className="fm-tags">
          {FEEDBACK_TAGS.map(t => (
            <button
              key={t}
              className={`chip chip-skill ${tag === t ? 'active' : ''}`}
              onClick={() => setTag(t)}
              style={{ fontSize: 12 }}
            >{t}</button>
          ))}
        </div>

        <textarea
          className="input-field fm-textarea"
          rows={4}
          placeholder="Tell us more about your experience or suggestions..."
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ resize: 'vertical', lineHeight: 1.6 }}
        />

        <button
          className="btn-primary fm-submit"
          disabled={!rating}
          onClick={() => setSubmitted(true)}
        >
          <span>Send Feedback</span>
        </button>
      </div>
    </div>
  );
}
