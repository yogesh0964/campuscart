import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isValid = token && token.length > 10 && token !== 'undefined';
  if (!isValid) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PrivateRoute>
            <Navbar />
            <Products />
          </PrivateRoute>
        } />
        <Route path="/cart" element={
          <PrivateRoute>
            <Navbar />
            <Cart />
          </PrivateRoute>
        } />
        <Route path="/orders" element={
          <PrivateRoute>
            <Navbar />
            <Orders />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;