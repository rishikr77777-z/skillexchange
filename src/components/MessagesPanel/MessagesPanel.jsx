import React, { useState, useRef, useEffect } from 'react';
import { MOCK_MESSAGES, AUTO_REPLIES } from '../../data/constants';
import './MessagesPanel.css';

export default function MessagesPanel({ users, chatUser, onClose }) {
  const [activeChat, setActiveChat] = useState(chatUser || users[0]);
  const [messages, setMessages]     = useState(MOCK_MESSAGES);
  const [input, setInput]           = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat, messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { from: 'me', text: input, time: now };
    setMessages(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg],
    }));
    setInput('');
    setTimeout(() => {
      const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      setMessages(prev => ({
        ...prev,
        [activeChat.id]: [
          ...(prev[activeChat.id] || []),
          { from: 'them', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        ],
      }));
    }, 1200);
  };

  const currentMsgs = messages[activeChat?.id] || [];

  return (
    <div className="mp-overlay" onClick={onClose}>
      <div className="mp-panel" onClick={e => e.stopPropagation()}>

        <div className="mp-header">
          <h3 className="mp-title">💬 Messages</h3>
          <button className="mp-close" onClick={onClose}>✕</button>
        </div>

        <div className="mp-body">
          {/* ── User list ── */}
          <div className="mp-sidebar">
            {users.map(u => (
              <button
                key={u.id}
                className={`mp-user-item ${activeChat?.id === u.id ? 'active' : ''}`}
                onClick={() => setActiveChat(u)}
              >
                <div className="mp-avatar">{u.avatar}</div>
                <div className="mp-user-info">
                  <div className="mp-user-name">{u.name}</div>
                  <div className="mp-user-preview">
                    {(messages[u.id] || []).slice(-1)[0]?.text?.slice(0, 28) || 'Start a conversation...'}
                    {((messages[u.id] || []).slice(-1)[0]?.text?.length || 0) > 28 ? '…' : ''}
                  </div>
                </div>
                {!messages[u.id] && <div className="mp-new-dot" />}
              </button>
            ))}
          </div>

          {/* ── Chat area ── */}
          {activeChat && (
            <div className="mp-chat">
              <div className="chat-header">
                <div className="chat-avatar">{activeChat.avatar}</div>
                <div>
                  <div className="chat-name">{activeChat.name}</div>
                  <div className="chat-status">🟢 Online</div>
                </div>
              </div>

              <div className="chat-messages">
                {currentMsgs.length === 0 && (
                  <div className="chat-empty">
                    <div style={{ fontSize: 40, marginBottom: 12 }}>👋</div>
                    <p>Start your skill exchange conversation!</p>
                  </div>
                )}
                {currentMsgs.map((msg, i) => (
                  <div key={i} className={`msg ${msg.from === 'me' ? 'msg-me' : 'msg-them'}`}>
                    {msg.from === 'them' && (
                      <div className="msg-avatar">{activeChat.avatar}</div>
                    )}
                    <div className="msg-bubble">
                      <div className="msg-text">{msg.text}</div>
                      <div className="msg-time">{msg.time}</div>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <div className="chat-input-row">
                <input
                  className="input-field chat-input"
                  placeholder="Type a message..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                />
                <button
                  className="btn-primary chat-send"
                  onClick={sendMessage}
                  disabled={!input.trim()}
                >
                  <span>➤</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
