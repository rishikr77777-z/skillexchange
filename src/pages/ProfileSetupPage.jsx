import React, { useState } from 'react';
import './ProfileSetupPage.css';

// imported from constants
import { ALL_SKILLS, ALL_INTERESTS, TIERS } from '../data/constants';
export default function ProfileSetupPage({ user, onComplete }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    age: '',
    bio: '',
    skills: [],
    skillTiers: {},
    wantToLearn: [],
    interests: [],
    avatar: null,
  });

  const steps = ['About You', 'Your Skills', 'Learn & Interests'];

  const toggleSkill = (skill) => {
    setProfile(p => ({
      ...p,
      skills: p.skills.includes(skill) ? p.skills.filter(s => s !== skill) : [...p.skills, skill],
    }));
  };
  const toggleLearn = (skill) => {
    setProfile(p => ({
      ...p,
      wantToLearn: p.wantToLearn.includes(skill) ? p.wantToLearn.filter(s => s !== skill) : [...p.wantToLearn, skill],
    }));
  };
  const toggleInterest = (interest) => {
    setProfile(p => ({
      ...p,
      interests: p.interests.includes(interest) ? p.interests.filter(i => i !== interest) : [...p.interests, interest],
    }));
  };
  const setSkillTier = (skill, tier) => {
    setProfile(p => ({ ...p, skillTiers: { ...p.skillTiers, [skill]: tier } }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(s => s + 1);
    else onComplete(profile);
  };
  const handleBack = () => setStep(s => s - 1);

  return (
    <div className="setup-page">
      <div className="setup-bg">
        <div className="setup-mesh" />
        <div className="setup-grid" />
      </div>

      <div className="setup-container">
        {/* Progress */}
        <div className="setup-header">
          <div className="setup-brand">
            <div className="logo-circle-sm"><span className="logo-initials">SE</span></div>
            <span className="brand-name">Skill Exchange</span>
          </div>
          <h2 className="setup-title">Set up your profile</h2>
          <p className="setup-sub">Help us personalize your skill exchange experience</p>

          <div className="progress-bar-wrap">
            {steps.map((s, i) => (
              <div key={s} className="progress-step">
                <div className={`progress-dot ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`progress-label ${i === step ? 'active' : ''}`}>{s}</span>
                {i < steps.length - 1 && <div className={`progress-line ${i < step ? 'done' : ''}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="setup-form glass-card">
          {/* Step 0: About You */}
          {step === 0 && (
            <div className="setup-step anim-slide-up">
              <h3 className="step-heading">Tell us about yourself</h3>

              {/* Avatar */}
              <div className="avatar-pick">
                <div className="avatar-circle">
                  <span className="avatar-emoji">👤</span>
                </div>
                <div>
                  <p className="avatar-label">Profile Photo</p>
                  <p className="avatar-sub">Upload a photo or use an emoji</p>
                  <div className="emoji-grid">
                    {['😊','🦸','🧑‍💻','🎨','🎵','📚','🚀','🌟'].map(e => (
                      <button key={e} className="emoji-btn">{e}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Display Name</label>
                  <input className="input-field" placeholder="How should we call you?" defaultValue={user?.name} />
                </div>
                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input
                    className="input-field"
                    type="number"
                    placeholder="Your age"
                    value={profile.age}
                    onChange={e => setProfile(p => ({ ...p, age: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Bio <span className="label-opt">(optional)</span></label>
                <textarea
                  className="input-field"
                  rows={3}
                  placeholder="Tell others what makes you unique, what you've learned, what you're passionate about..."
                  value={profile.bio}
                  onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                  style={{ resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>
            </div>
          )}

          {/* Step 1: Your Skills */}
          {step === 1 && (
            <div className="setup-step anim-slide-up">
              <h3 className="step-heading">What skills do you have?</h3>
              <p className="step-sub">Select all that apply. You'll set your tier level for each.</p>

              <div className="skill-chips">
                {ALL_SKILLS.map(skill => (
                  <button
                    key={skill}
                    className={`chip chip-skill ${profile.skills.includes(skill) ? 'active' : ''}`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {profile.skills.includes(skill) ? '✓ ' : '+ '}
                    {skill}
                  </button>
                ))}
              </div>

              {profile.skills.length > 0 && (
                <div className="tier-assignments">
                  <h4 className="tier-assign-title">Set your tier for each skill</h4>
                  {profile.skills.map(skill => (
                    <div key={skill} className="tier-assign-row">
                      <span className="tier-skill-name">{skill}</span>
                      <div className="tier-options">
                        {TIERS.map(t => (
                          <button
                            key={t.id}
                            className={`tier-btn ${profile.skillTiers[skill] === t.id ? 'active' : ''}`}
                            style={{ '--tier-c': t.color }}
                            onClick={() => setSkillTier(skill, t.id)}
                            title={t.full}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Learn & Interests */}
          {step === 2 && (
            <div className="setup-step anim-slide-up">
              <h3 className="step-heading">What do you want to learn?</h3>
              <p className="step-sub">These are the skills you're looking to acquire through exchanges.</p>

              <div className="skill-chips" style={{ marginBottom: 36 }}>
                {ALL_SKILLS.map(skill => (
                  <button
                    key={skill}
                    className={`chip chip-interest ${profile.wantToLearn.includes(skill) ? 'active' : ''}`}
                    onClick={() => toggleLearn(skill)}
                  >
                    {profile.wantToLearn.includes(skill) ? '✓ ' : '+ '}
                    {skill}
                  </button>
                ))}
              </div>

              <h4 className="step-heading" style={{ fontSize: 18, marginBottom: 12 }}>Your interests</h4>
              <p className="step-sub" style={{ marginBottom: 16 }}>Help us find better matches for you.</p>
              <div className="skill-chips">
                {ALL_INTERESTS.map(interest => (
                  <button
                    key={interest}
                    className={`chip chip-skill ${profile.interests.includes(interest) ? 'active' : ''}`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {profile.interests.includes(interest) ? '✓ ' : '+ '}
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="setup-nav">
            {step > 0 && (
              <button className="btn-ghost" onClick={handleBack}>← Back</button>
            )}
            <button className="btn-primary setup-next" onClick={handleNext}>
              <span>{step === steps.length - 1 ? 'Complete Profile 🚀' : 'Continue →'}</span>
            </button>
          </div>
        </div>

        <p className="setup-skip" onClick={() => onComplete(profile)}>
          Skip for now →
        </p>
      </div>
    </div>
  );
}
