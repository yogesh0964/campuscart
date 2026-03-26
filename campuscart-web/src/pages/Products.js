import React, { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Products() {
  const [products, setProducts]   = useState([]);
  const [search, setSearch]       = useState('');
  const [loading, setLoading]     = useState(true);
  const [cartMsg, setCartMsg]     = useState('');
  const [category, setCategory]   = useState('All');

  const categories = ['All','Stationery','Electronics','Books','Food','Clothing'];

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!search.trim()) { fetchProducts(); return; }
    const res = await API.get(`/products/search?name=${search}`);
    setProducts(res.data);
  };

  const addToCart = async (productId) => {
    const userId = localStorage.getItem('userId') || 1;
    try {
      await API.post(`/cart/add?userId=${userId}&productId=${productId}&quantity=1`);
      setCartMsg('✅ Cart mein add ho gaya!');
      setTimeout(() => setCartMsg(''), 2000);
    } catch { setCartMsg('❌ Error! Login karo pehle.'); setTimeout(() => setCartMsg(''), 2000); }
  };

  const filtered = category === 'All' ? products
    : products.filter(p => p.category === category);

  return (
    <div style={s.page}>
      {cartMsg && <div style={s.toast}>{cartMsg}</div>}

      {/* Hero */}
      <div style={s.hero}>
        <h1 style={s.heroTitle}>🛒 CampusCart</h1>
        <p style={s.heroSub}>Students ke liye best deals — har din!</p>
        <div style={s.searchBar}>
          <span style={s.searchIcon}>🔍</span>
          <input style={s.searchInput}
            placeholder="Product search karo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()} />
          <button style={s.searchBtn} onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div style={s.body}>
        {/* Categories */}
        <div style={s.cats}>
          {categories.map(c => (
            <button key={c}
              style={{...s.cat, ...(category===c ? s.catActive : {})}}
              onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>

        {/* Stats */}
        <div style={s.statsRow}>
          <span style={s.statsText}>
            {loading ? 'Loading...' : `${filtered.length} products mile`}
          </span>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={s.loader}>
            {[1,2,3,4,5,6].map(i => <div key={i} style={s.skeleton}/>)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={s.empty}>
            <div style={{fontSize:'64px'}}>😕</div>
            <h3>Koi product nahi mila</h3>
            <p style={{color:'#94a3b8'}}>Search change karke try karo</p>
          </div>
        ) : (
          <div style={s.grid}>
            {filtered.map(p => (
              <div key={p.id} style={s.card}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
                <div style={s.imgBox}>
                  {p.imageUrl
                    ? <img src={p.imageUrl} alt={p.name} style={s.img}
                        onError={e => e.target.style.display='none'}/>
                    : <span style={{fontSize:'48px'}}>📦</span>}
                </div>
                <div style={s.cardBody}>
                  {p.category && <span style={s.badge}>{p.category}</span>}
                  <h3 style={s.name}>{p.name}</h3>
                  <p style={s.desc}>{p.description || 'No description'}</p>
                  <div style={s.footer}>
                    <div>
                      <span style={s.price}>₹{p.price}</span>
                      {p.stock > 0
                        ? <span style={s.inStock}>✅ In Stock ({p.stock})</span>
                        : <span style={s.outStock}>❌ Out of Stock</span>}
                    </div>
                    <button style={{...s.btn, opacity: p.stock===0 ? 0.5 : 1}}
                      onClick={() => addToCart(p.id)} disabled={p.stock===0}>
                      🛒 Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  page:      { minHeight:'100vh', background:'#f8faff', fontFamily:"'Segoe UI',sans-serif" },
  toast:     { position:'fixed', top:'80px', right:'24px', background:'#1a1a2e',
                color:'#fff', padding:'14px 24px', borderRadius:'12px', zIndex:999,
                boxShadow:'0 8px 24px rgba(0,0,0,0.2)', fontSize:'15px' },
  hero:      { background:'linear-gradient(135deg,#667eea,#764ba2)', padding:'48px 40px 60px',
                color:'#fff', textAlign:'center' },
  heroTitle: { fontSize:'36px', fontWeight:'800', margin:'0 0 8px' },
  heroSub:   { fontSize:'16px', opacity:0.85, marginBottom:'28px' },
  searchBar: { display:'flex', maxWidth:'540px', margin:'0 auto', background:'#fff',
                borderRadius:'50px', overflow:'hidden',
                boxShadow:'0 8px 32px rgba(0,0,0,0.15)' },
  searchIcon:{ padding:'0 16px', fontSize:'18px', display:'flex', alignItems:'center' },
  searchInput:{ flex:1, padding:'16px 8px', border:'none', fontSize:'15px',
                 outline:'none', color:'#1a1a2e' },
  searchBtn: { padding:'16px 28px', background:'linear-gradient(135deg,#667eea,#764ba2)',
                color:'#fff', border:'none', fontSize:'15px',
                fontWeight:'600', cursor:'pointer' },
  body:      { padding:'32px 40px' },
  cats:      { display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'24px' },
  cat:       { padding:'8px 20px', borderRadius:'50px', border:'1.5px solid #e2e8f0',
                background:'#fff', cursor:'pointer', fontSize:'14px',
                fontWeight:'500', color:'#64748b', transition:'all 0.2s' },
  catActive: { background:'linear-gradient(135deg,#667eea,#764ba2)',
                color:'#fff', border:'1.5px solid transparent' },
  statsRow:  { marginBottom:'20px' },
  statsText: { color:'#94a3b8', fontSize:'14px' },
  loader:    { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'20px' },
  skeleton:  { height:'320px', background:'linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)',
                borderRadius:'16px', animation:'pulse 1.5s infinite' },
  empty:     { textAlign:'center', padding:'80px 20px', color:'#1a1a2e' },
  grid:      { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'20px' },
  card:      { background:'#fff', borderRadius:'16px', overflow:'hidden',
                boxShadow:'0 4px 16px rgba(0,0,0,0.08)',
                transition:'all 0.3s', cursor:'default' },
  imgBox:    { height:'160px', background:'linear-gradient(135deg,#f8faff,#e8f0fe)',
                display:'flex', alignItems:'center', justifyContent:'center' },
  img:       { width:'100%', height:'100%', objectFit:'cover' },
  cardBody:  { padding:'16px' },
  badge:     { background:'#ede9fe', color:'#7c3aed', padding:'4px 10px',
                borderRadius:'50px', fontSize:'11px', fontWeight:'600' },
  name:      { fontSize:'16px', fontWeight:'700', color:'#1a1a2e', margin:'10px 0 6px' },
  desc:      { fontSize:'13px', color:'#94a3b8', marginBottom:'14px',
                overflow:'hidden', display:'-webkit-box',
                WebkitLineClamp:2, WebkitBoxOrient:'vertical' },
  footer:    { display:'flex', justifyContent:'space-between', alignItems:'flex-end' },
  price:     { fontSize:'20px', fontWeight:'800', color:'#667eea', display:'block' },
  inStock:   { fontSize:'11px', color:'#48bb78' },
  outStock:  { fontSize:'11px', color:'#e53e3e' },
  btn:       { padding:'10px 16px', background:'linear-gradient(135deg,#667eea,#764ba2)',
                color:'#fff', border:'none', borderRadius:'10px',
                fontSize:'14px', fontWeight:'600', cursor:'pointer' },
};