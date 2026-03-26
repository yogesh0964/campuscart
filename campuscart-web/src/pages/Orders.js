import React, { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Orders() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const userId                = localStorage.getItem('userId') || 1;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/orders/${userId}`);
        setOrders(res.data);
      } catch(e) { console.error(e); }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const statusColor = (s) => ({
    PENDING:   { bg:'#fff7ed', color:'#c05621' },
    CONFIRMED: { bg:'#ebf8ff', color:'#2b6cb0' },
    DELIVERED: { bg:'#f0fff4', color:'#276749' },
  }[s] || { bg:'#f7fafc', color:'#4a5568' });

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h2 style={s.title}>📦 Mere Orders</h2>
        <span style={s.count}>{orders.length} orders</span>
      </div>

      {loading ? (
        <div style={s.center}>⏳ Loading...</div>
      ) : orders.length === 0 ? (
        <div style={s.empty}>
          <div style={{fontSize:'80px'}}>📦</div>
          <h3 style={{color:'#1a1a2e'}}>Koi order nahi hai abhi!</h3>
          <p style={{color:'#94a3b8'}}>Cart mein products add karo aur order karo</p>
        </div>
      ) : (
        <div style={s.list}>
          {orders.map((order, idx) => {
            const sc = statusColor(order.status);
            return (
              <div key={order.id} style={s.card}>
                <div style={s.cardHeader}>
                  <div>
                    <span style={s.orderId}>Order #{order.id}</span>
                    <span style={s.date}>
                      📅 {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString('hi-IN')
                        : 'N/A'}
                    </span>
                  </div>
                  <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                    <span style={{...s.status, background:sc.bg, color:sc.color}}>
                      {order.status === 'PENDING'   ? '⏳ Pending' :
                       order.status === 'CONFIRMED' ? '✅ Confirmed' :
                       order.status === 'DELIVERED' ? '🎉 Delivered' : order.status}
                    </span>
                    <span style={s.total}>₹{order.totalAmount?.toFixed(2)}</span>
                  </div>
                </div>
                {order.items && order.items.length > 0 && (
                  <div style={s.items}>
                    {order.items.map((item, i) => (
                      <div key={i} style={s.item}>
                        <span style={s.itemIcon}>📦</span>
                        <span style={s.itemName}>{item.product?.name || 'Product'}</span>
                        <span style={s.itemQty}>x{item.quantity}</span>
                        <span style={s.itemPrice}>
                          ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const s = {
  page:       { minHeight:'100vh', background:'#f8faff', padding:'32px 40px',
                 fontFamily:"'Segoe UI',sans-serif" },
  header:     { display:'flex', alignItems:'center', gap:'12px', marginBottom:'28px' },
  title:      { fontSize:'28px', fontWeight:'700', color:'#1a1a2e', margin:0 },
  count:      { background:'#ede9fe', color:'#7c3aed', padding:'4px 12px',
                 borderRadius:'50px', fontSize:'14px', fontWeight:'600' },
  center:     { textAlign:'center', padding:'80px', fontSize:'18px', color:'#94a3b8' },
  empty:      { textAlign:'center', padding:'80px 20px' },
  list:       { display:'flex', flexDirection:'column', gap:'20px' },
  card:       { background:'#fff', borderRadius:'16px', overflow:'hidden',
                 boxShadow:'0 4px 16px rgba(0,0,0,0.06)' },
  cardHeader: { display:'flex', justifyContent:'space-between', alignItems:'center',
                 padding:'20px 24px', borderBottom:'1px solid #f1f5f9' },
  orderId:    { fontSize:'16px', fontWeight:'700', color:'#1a1a2e', marginRight:'12px' },
  date:       { fontSize:'13px', color:'#94a3b8' },
  status:     { padding:'6px 14px', borderRadius:'50px',
                 fontSize:'13px', fontWeight:'600' },
  total:      { fontSize:'20px', fontWeight:'800', color:'#667eea' },
  items:      { padding:'16px 24px', display:'flex', flexDirection:'column', gap:'10px' },
  item:       { display:'flex', alignItems:'center', gap:'12px',
                 padding:'10px', background:'#f8faff', borderRadius:'10px' },
  itemIcon:   { fontSize:'20px' },
  itemName:   { flex:1, fontSize:'14px', fontWeight:'500', color:'#1a1a2e' },
  itemQty:    { fontSize:'13px', color:'#94a3b8',
                 background:'#e2e8f0', padding:'3px 8px', borderRadius:'6px' },
  itemPrice:  { fontSize:'14px', fontWeight:'700', color:'#667eea' },
};