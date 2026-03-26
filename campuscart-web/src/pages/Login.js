import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate                = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) { setError('Email aur password daalo!'); return; }
    setLoading(true); setError('');
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data);
      navigate('/');
    } catch { setError('Wrong email ya password!'); }
    setLoading(false);
  };

  return (
    <div style={s.page}>
      <div style={s.left}>
        <div style={s.brand}>🛒</div>
        <h1 style={s.brandName}>CampusCart</h1>
        <p style={s.brandSub}>Students ke liye sabse sasta<br/>aur aasaan shopping experience</p>
        <div style={s.features}>
          {['🎓 Students ke liye special deals','⚡ Fast delivery on campus','🔒 100% Secure payments','📦 Easy returns & refunds'].map((f,i) => (
            <div key={i} style={s.feature}>{f}</div>
          ))}
        </div>
      </div>
      <div style={s.right}>
        <div style={s.card}>
          <h2 style={s.title}>Welcome Back! 👋</h2>
          <p style={s.sub}>Apne account mein login karo</p>

          {error && (
            <div style={s.error}>
              <span>⚠️</span> {error}
            </div>
          )}

          <div style={s.inputGroup}>
            <label style={s.label}>Email Address</label>
            <div style={s.inputWrap}>
              <span style={s.icon}>📧</span>
              <input style={s.input} placeholder="email@college.com"
                value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            </div>
          </div>

          <div style={s.inputGroup}>
            <label style={s.label}>Password</label>
            <div style={s.inputWrap}>
              <span style={s.icon}>🔒</span>
              <input style={s.input} placeholder="Password daalo"
                type={showPass ? 'text' : 'password'}
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
              <span style={s.eye} onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          <button style={{...s.btn, opacity: loading ? 0.7 : 1}}
            onClick={handleLogin} disabled={loading}>
            {loading
              ? <span>⏳ Logging in...</span>
              : <span>🚀 Login Karo</span>}
          </button>

          <div style={s.divider}><span style={s.dividerText}>ya</span></div>

          <button style={s.btnOutline} onClick={() => navigate('/register')}>
            ✨ Naya Account Banao
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  page:       { display:'flex', minHeight:'100vh', fontFamily:"'Segoe UI', sans-serif" },
  left:       { flex:1, background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                 display:'flex', flexDirection:'column', justifyContent:'center',
                 padding:'60px', color:'#fff' },
  brand:      { fontSize:'64px', marginBottom:'8px' },
  brandName:  { fontSize:'42px', fontWeight:'800', margin:'0 0 12px', letterSpacing:'-1px' },
  brandSub:   { fontSize:'18px', opacity:0.85, lineHeight:1.6, marginBottom:'48px' },
  features:   { display:'flex', flexDirection:'column', gap:'14px' },
  feature:    { background:'rgba(255,255,255,0.15)', backdropFilter:'blur(10px)',
                 padding:'14px 20px', borderRadius:'12px', fontSize:'15px',
                 border:'1px solid rgba(255,255,255,0.2)' },
  right:      { flex:1, background:'#f8faff', display:'flex',
                 alignItems:'center', justifyContent:'center', padding:'40px' },
  card:       { background:'#fff', padding:'48px', borderRadius:'24px', width:'100%',
                 maxWidth:'420px', boxShadow:'0 20px 60px rgba(102,126,234,0.15)' },
  title:      { fontSize:'28px', fontWeight:'700', color:'#1a1a2e', margin:'0 0 8px' },
  sub:        { color:'#94a3b8', marginBottom:'32px', fontSize:'15px' },
  error:      { background:'#fff0f0', color:'#e53e3e', padding:'12px 16px',
                 borderRadius:'10px', marginBottom:'20px', fontSize:'14px',
                 border:'1px solid #fed7d7', display:'flex', gap:'8px', alignItems:'center' },
  inputGroup: { marginBottom:'20px' },
  label:      { fontSize:'13px', fontWeight:'600', color:'#374151',
                 marginBottom:'8px', display:'block', letterSpacing:'0.5px' },
  inputWrap:  { display:'flex', alignItems:'center', border:'1.5px solid #e2e8f0',
                 borderRadius:'12px', overflow:'hidden', background:'#f8faff',
                 transition:'all 0.2s' },
  icon:       { padding:'0 12px', fontSize:'16px' },
  input:      { flex:1, padding:'14px 8px', border:'none', background:'transparent',
                 fontSize:'15px', outline:'none', color:'#1a1a2e' },
  eye:        { padding:'0 14px', cursor:'pointer', fontSize:'16px' },
  btn:        { width:'100%', padding:'15px', background:'linear-gradient(135deg, #667eea, #764ba2)',
                 color:'#fff', border:'none', borderRadius:'12px', fontSize:'16px',
                 fontWeight:'600', cursor:'pointer', marginBottom:'16px',
                 boxShadow:'0 8px 20px rgba(102,126,234,0.4)', transition:'all 0.2s' },
  divider:    { textAlign:'center', position:'relative', margin:'8px 0 16px',
                 borderTop:'1px solid #e2e8f0' },
  dividerText:{ background:'#fff', padding:'0 12px', color:'#94a3b8',
                 fontSize:'13px', position:'relative', top:'-10px' },
  btnOutline: { width:'100%', padding:'14px', background:'#fff', color:'#667eea',
                 border:'2px solid #667eea', borderRadius:'12px', fontSize:'15px',
                 fontWeight:'600', cursor:'pointer', transition:'all 0.2s' },
};