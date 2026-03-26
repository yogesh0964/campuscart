import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo} onClick={() => navigate('/')}>CampusCart</h2>
      <div style={styles.links}>
        <span style={styles.link} onClick={() => navigate('/')}>Products</span>
        <span style={styles.link} onClick={() => navigate('/cart')}>Cart</span>
        <span style={styles.link} onClick={() => navigate('/orders')}>Orders</span>
        <span style={{...styles.link, color:'#ff4d4d'}} onClick={logout}>Logout</span>
      </div>
    </nav>
  );
}

const styles = {
  nav:   { display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'16px 32px', background:'#1a1a2e', color:'#fff' },
  logo:  { margin:0, cursor:'pointer', color:'#a78bfa', fontSize:'20px' },
  links: { display:'flex', gap:'24px' },
  link:  { cursor:'pointer', color:'#e2e8f0', fontSize:'15px' }
};