import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const cartContext = useContext(CartContext);
  const cart = cartContext?.cart ?? [];
  const setCart = cartContext?.setCart ?? (() => {});

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('John Doe');
  const [address, setAddress] = useState('123 Street');
  const navigate = useNavigate();

  const handleCheckout = () => {
    setShowForm(true);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order placed!');
    setCart([]);
    localStorage.removeItem('cart');
    navigate('/');
  };

  const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cart.map((item: any) => (
              <li key={item.id}>
                {item.title} - ₹{item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total.toFixed(2)}</h3>
          {!showForm ? (
            <button onClick={handleCheckout}>Checkout</button>
          ) : (
            <form onSubmit={handleOrderSubmit}>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
              <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
              <button type="submit">Place Order</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
