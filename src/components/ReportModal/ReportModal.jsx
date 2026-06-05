import React, { useState } from 'react';
import './ReportModal.css';

const REPORT_TYPES = [
  { id: 'fake',  label: '👤 Fake Profile',     desc: "This person's identity seems false" },
  { id: 'scam',  label: '🚨 Scam / Fraud',      desc: 'Attempting to deceive or defraud' },
  { id: 'abuse', label: '⚠ Abusive Behavior',   desc: 'Harassment or inappropriate conduct' },
  { id: 'skill', label: '📋 False Skills',       desc: "Claiming skills they don't have" },
  { id: 'spam',  label: '📩 Spam',               desc: 'Sending unwanted messages' },
];

export default function ReportModal({ target, onClose }) {
  const [selected, setSelected]   = useState('');
  const [desc, setDesc]           = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="rm-card glass-card" onClick={e => e.stopPropagation()}>
          <div className="rm-success">
            <div className="rm-success-icon">✅</div>
            <h3>Report Submitted</h3>
            <p>Thank you for helping keep Skill Exchange safe. Our team will review this report within 24 hours.</p>
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
      <div className="rm-card glass-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h3 className="rm-title">Report {target?.user?.name}</h3>
        <p className="rm-desc">Help us understand what's happening. Your report is confidential.</p>

        <div className="rm-types">
          {REPORT_TYPES.map(r => (
            <button
              key={r.id}
              className={`rm-type-btn ${selected === r.id ? 'active' : ''}`}
              onClick={() => setSelected(r.id)}
            >
              <span className="rm-type-label">{r.label}</span>
              <span className="rm-type-desc">{r.desc}</span>
            </button>
          ))}
        </div>

        <div className="rm-detail">
          <label className="rm-label">Additional details (optional)</label>
          <textarea
            className="input-field"
            rows={3}
            placeholder="Describe what happened..."
            value={desc}
            onChange={e => setDesc(e.target.value)}
            style={{ resize: 'vertical', lineHeight: 1.6 }}
          />
        </div>

        <button
          className="btn-primary rm-submit"
          disabled={!selected}
          onClick={() => setSubmitted(true)}
        >
          <span>Submit Report</span>
        </button>
      </div>
    </div>
  );
}
