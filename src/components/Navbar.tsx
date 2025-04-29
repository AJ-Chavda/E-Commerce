import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import './Navbar.css'; // Make sure this line imports your CSS file

const Navbar = () => {
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);

  const cart = cartContext?.cart ?? [];
  const setCart = cartContext?.setCart ?? (() => {});
  const user = userContext?.user ?? null;
  const setUser = userContext?.setUser ?? (() => {});
  const [cartTotal, setCartTotal] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
    setCartTotal(total);
  }, [cart]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">ShopEasy</Link>
        <Link to="/" className="nav-link">Products</Link>
        <Link to="/cart" className="nav-link">Cart ({cart.length})</Link>
        <span className="nav-total">₹{cartTotal.toFixed(2)}</span>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-user">Welcome, {user.firstName}</span>
            <button className="nav-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="nav-button">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
