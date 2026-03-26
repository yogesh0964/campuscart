import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate                = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) { setError('Saari fields bharo!'); return; }
    if (password.length < 6) { setError('Password kam se kam 6 characters ka hona chahiye!'); return; }
    setLoading(true); setError('');
    try {
      await API.post('/auth/register', { name, email, password });
      alert('✅ Registration successful! Ab login karo.');
      navigate('/login');
    } catch { setError('Registration failed! Email already exists.'); }
    setLoading(false);
  };

  return (
    <div style={s.page}>
      <div style={s.left}>
        <div style={s.brand}>🛒</div>
        <h1 style={s.brandName}>CampusCart</h1>
        <p style={s.brandSub}>Abhi join karo aur pao<br/>exclusive student discounts!</p>
        <div style={s.stats}>
          {[['10K+','Students'],['500+','Products'],['4.9★','Rating'],['Free','Delivery']].map(([v,l],i) => (
            <div key={i} style={s.stat}>
              <div style={s.statVal}>{v}</div>
              <div style={s.statLabel}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={s.right}>
        <div style={s.card}>
          <h2 style={s.title}>Account Banao! 🎉</h2>
          <p style={s.sub}>CampusCart family mein swagat hai</p>

          {error && <div style={s.error}>⚠️ {error}</div>}

          <div style={s.inputGroup}>
            <label style={s.label}>Poora Naam</label>
            <div style={s.inputWrap}>
              <span style={s.icon}>👤</span>
              <input style={s.input} placeholder="Apna naam daalo"
                value={name} onChange={e => setName(e.target.value)} />
            </div>
          </div>

          <div style={s.inputGroup}>
            <label style={s.label}>College Email</label>
            <div style={s.inputWrap}>
              <span style={s.icon}>📧</span>
              <input style={s.input} placeholder="email@college.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>

          <div style={s.inputGroup}>
            <label style={s.label}>Password</label>
            <div style={s.inputWrap}>
              <span style={s.icon}>🔒</span>
              <input style={s.input} placeholder="Minimum 6 characters"
                type={showPass ? 'text' : 'password'}
                value={password} onChange={e => setPassword(e.target.value)} />
              <span style={s.eye} onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁️'}
              </span>
            </div>
            <div style={s.strength}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{...s.bar,
                  background: password.length >= i*3
                    ? i<=1 ? '#e53e3e' : i<=2 ? '#ed8936' : i<=3 ? '#ecc94b' : '#48bb78'
                    : '#e2e8f0'}}/>
              ))}
              <span style={s.strengthText}>
                {password.length === 0 ? '' :
                 password.length < 4 ? '😟 Weak' :
                 password.length < 7 ? '😐 Medium' :
                 password.length < 10 ? '😊 Strong' : '💪 Very Strong'}
              </span>
            </div>
          </div>

          <button style={{...s.btn, opacity: loading ? 0.7 : 1}}
            onClick={handleRegister} disabled={loading}>
            {loading ? '⏳ Creating...' : '🚀 Register Karo'}
          </button>

          <div style={s.divider}><span style={s.dividerText}>ya</span></div>

          <button style={s.btnOutline} onClick={() => navigate('/login')}>
            🔑 Login Karo
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  page:         { display:'flex', minHeight:'100vh', fontFamily:"'Segoe UI', sans-serif" },
  left:         { flex:1, background:'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                   display:'flex', flexDirection:'column', justifyContent:'center',
                   padding:'60px', color:'#fff' },
  brand:        { fontSize:'64px', marginBottom:'8px' },
  brandName:    { fontSize:'42px', fontWeight:'800', margin:'0 0 12px', letterSpacing:'-1px' },
  brandSub:     { fontSize:'18px', opacity:0.85, lineHeight:1.6, marginBottom:'48px' },
  stats:        { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' },
  stat:         { background:'rgba(255,255,255,0.2)', backdropFilter:'blur(10px)',
                   padding:'20px', borderRadius:'16px', textAlign:'center',
                   border:'1px solid rgba(255,255,255,0.3)' },
  statVal:      { fontSize:'28px', fontWeight:'800', marginBottom:'4px' },
  statLabel:    { fontSize:'13px', opacity:0.85 },
  right:        { flex:1, background:'#f8faff', display:'flex',
                   alignItems:'center', justifyContent:'center', padding:'40px' },
  card:         { background:'#fff', padding:'48px', borderRadius:'24px', width:'100%',
                   maxWidth:'420px', boxShadow:'0 20px 60px rgba(245,87,108,0.15)' },
  title:        { fontSize:'28px', fontWeight:'700', color:'#1a1a2e', margin:'0 0 8px' },
  sub:          { color:'#94a3b8', marginBottom:'32px', fontSize:'15px' },
  error:        { background:'#fff0f0', color:'#e53e3e', padding:'12px 16px',
                   borderRadius:'10px', marginBottom:'20px', fontSize:'14px',
                   border:'1px solid #fed7d7' },
  inputGroup:   { marginBottom:'20px' },
  label:        { fontSize:'13px', fontWeight:'600', color:'#374151',
                   marginBottom:'8px', display:'block' },
  inputWrap:    { display:'flex', alignItems:'center', border:'1.5px solid #e2e8f0',
                   borderRadius:'12px', overflow:'hidden', background:'#f8faff' },
  icon:         { padding:'0 12px', fontSize:'16px' },
  input:        { flex:1, padding:'14px 8px', border:'none', background:'transparent',
                   fontSize:'15px', outline:'none', color:'#1a1a2e' },
  eye:          { padding:'0 14px', cursor:'pointer', fontSize:'16px' },
  strength:     { display:'flex', alignItems:'center', gap:'6px', marginTop:'8px' },
  bar:          { flex:1, height:'4px', borderRadius:'2px', transition:'all 0.3s' },
  strengthText: { fontSize:'12px', color:'#94a3b8', minWidth:'80px' },
  btn:          { width:'100%', padding:'15px', background:'linear-gradient(135deg, #f093fb, #f5576c)',
                   color:'#fff', border:'none', borderRadius:'12px', fontSize:'16px',
                   fontWeight:'600', cursor:'pointer', marginBottom:'16px',
                   boxShadow:'0 8px 20px rgba(245,87,108,0.4)' },
  divider:      { textAlign:'center', position:'relative', margin:'8px 0 16px',
                   borderTop:'1px solid #e2e8f0' },
  dividerText:  { background:'#fff', padding:'0 12px', color:'#94a3b8',
                   fontSize:'13px', position:'relative', top:'-10px' },
  btnOutline:   { width:'100%', padding:'14px', background:'#fff', color:'#f5576c',
                   border:'2px solid #f5576c', borderRadius:'12px', fontSize:'15px',
                   fontWeight:'600', cursor:'pointer' },
};