import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const navigate              = useNavigate();
  const userId                = localStorage.getItem('userId') || 1;

  useEffect(() => { fetchCart(); }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/cart/${userId}`);
      setCart(res.data);
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  const removeItem = async (id) => {
    await API.delete(`/cart/remove/${id}`);
    fetchCart();
  };

  const placeOrder = async () => {
    setPlacing(true);
    try {
      await API.post(`/orders/place/${userId}`);
      alert('🎉 Order place ho gaya!');
      navigate('/orders');
    } catch { alert('❌ Order failed!'); }
    setPlacing(false);
  };

  const total = cart.reduce((sum, item) =>
    sum + (item.product?.price || 0) * (item.quantity || 1), 0);

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h2 style={s.title}>🛒 Mera Cart</h2>
        <span style={s.count}>{cart.length} items</span>
      </div>

      {loading ? (
        <div style={s.center}>⏳ Loading...</div>
      ) : cart.length === 0 ? (
        <div style={s.empty}>
          <div style={{fontSize:'80px'}}>🛒</div>
          <h3 style={{color:'#1a1a2e'}}>Cart khali hai!</h3>
          <p style={{color:'#94a3b8', marginBottom:'24px'}}>Kuch products add karo</p>
          <button style={s.shopBtn} onClick={() => navigate('/')}>
            🛍️ Shopping Karo
          </button>
        </div>
      ) : (
        <div style={s.layout}>
          <div style={s.items}>
            {cart.map(item => (
              <div key={item.id} style={s.card}>
                <div style={s.imgBox}>📦</div>
                <div style={s.info}>
                  <h3 style={s.name}>{item.product?.name || 'Product'}</h3>
                  <p style={s.cat}>{item.product?.category || ''}</p>
                  <div style={s.row}>
                    <span style={s.price}>₹{item.product?.price}</span>
                    <span style={s.qty}>Qty: {item.quantity}</span>
                    <span style={s.subtotal}>
                      = ₹{(item.product?.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button style={s.removeBtn} onClick={() => removeItem(item.id)}>
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div style={s.summary}>
            <h3 style={s.sumTitle}>Order Summary</h3>
            <div style={s.sumRow}>
              <span>Items ({cart.length})</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div style={s.sumRow}>
              <span>Delivery</span>
              <span style={{color:'#48bb78'}}>FREE</span>
            </div>
            <div style={s.sumRow}>
              <span>Discount</span>
              <span style={{color:'#e53e3e'}}>-₹0</span>
            </div>
            <div style={s.divider}/>
            <div style={{...s.sumRow, fontWeight:'700', fontSize:'18px'}}>
              <span>Total</span>
              <span style={{color:'#667eea'}}>₹{total.toFixed(2)}</span>
            </div>
            <button style={{...s.orderBtn, opacity: placing ? 0.7 : 1}}
              onClick={placeOrder} disabled={placing}>
              {placing ? '⏳ Placing...' : '🚀 Order Place Karo'}
            </button>
            <button style={s.continueBtn} onClick={() => navigate('/')}>
              ← Shopping Continue Karo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  page:        { minHeight:'100vh', background:'#f8faff', padding:'32px 40px',
                  fontFamily:"'Segoe UI',sans-serif" },
  header:      { display:'flex', alignItems:'center', gap:'12px', marginBottom:'28px' },
  title:       { fontSize:'28px', fontWeight:'700', color:'#1a1a2e', margin:0 },
  count:       { background:'#ede9fe', color:'#7c3aed', padding:'4px 12px',
                  borderRadius:'50px', fontSize:'14px', fontWeight:'600' },
  center:      { textAlign:'center', padding:'80px', fontSize:'18px', color:'#94a3b8' },
  empty:       { textAlign:'center', padding:'80px 20px' },
  shopBtn:     { padding:'14px 32px', background:'linear-gradient(135deg,#667eea,#764ba2)',
                  color:'#fff', border:'none', borderRadius:'12px',
                  fontSize:'16px', fontWeight:'600', cursor:'pointer' },
  layout:      { display:'grid', gridTemplateColumns:'1fr 340px', gap:'24px' },
  items:       { display:'flex', flexDirection:'column', gap:'16px' },
  card:        { background:'#fff', borderRadius:'16px', padding:'20px',
                  display:'flex', gap:'16px', alignItems:'center',
                  boxShadow:'0 4px 16px rgba(0,0,0,0.06)' },
  imgBox:      { width:'80px', height:'80px', background:'linear-gradient(135deg,#f8faff,#e8f0fe)',
                  borderRadius:'12px', display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:'32px', flexShrink:0 },
  info:        { flex:1 },
  name:        { fontSize:'16px', fontWeight:'700', color:'#1a1a2e', margin:'0 0 4px' },
  cat:         { fontSize:'12px', color:'#94a3b8', marginBottom:'10px' },
  row:         { display:'flex', gap:'16px', alignItems:'center' },
  price:       { fontSize:'18px', fontWeight:'700', color:'#667eea' },
  qty:         { fontSize:'14px', color:'#64748b',
                  background:'#f1f5f9', padding:'4px 10px', borderRadius:'8px' },
  subtotal:    { fontSize:'14px', fontWeight:'600', color:'#48bb78' },
  removeBtn:   { background:'#fff0f0', border:'none', borderRadius:'10px',
                  padding:'10px', cursor:'pointer', fontSize:'18px' },
  summary:     { background:'#fff', borderRadius:'16px', padding:'24px',
                  boxShadow:'0 4px 16px rgba(0,0,0,0.06)', height:'fit-content',
                  position:'sticky', top:'80px' },
  sumTitle:    { fontSize:'18px', fontWeight:'700', color:'#1a1a2e', marginBottom:'20px' },
  sumRow:      { display:'flex', justifyContent:'space-between',
                  marginBottom:'12px', fontSize:'15px', color:'#64748b' },
  divider:     { borderTop:'1px solid #e2e8f0', margin:'16px 0' },
  orderBtn:    { width:'100%', padding:'15px', background:'linear-gradient(135deg,#667eea,#764ba2)',
                  color:'#fff', border:'none', borderRadius:'12px', fontSize:'16px',
                  fontWeight:'600', cursor:'pointer', marginBottom:'12px',
                  boxShadow:'0 8px 20px rgba(102,126,234,0.4)' },
  continueBtn: { width:'100%', padding:'13px', background:'#fff', color:'#667eea',
                  border:'2px solid #667eea', borderRadius:'12px',
                  fontSize:'14px', fontWeight:'600', cursor:'pointer' },
};