import { Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import API from '../services/api';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { token, clearCart } = useStore();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      API.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setName(res.data.firstName));
    }
  }, [token]);

  const handleSubmit = () => {
    setOpen(true);
    clearCart();
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <Box p={2}>
      <Typography variant="h4">Checkout</Typography>
      <TextField label="Name" fullWidth sx={{ my: 1 }} value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Address" fullWidth sx={{ my: 1 }} value={address} onChange={(e) => setAddress(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Place Order</Button>

      <Snackbar open={open} autoHideDuration={3000} message="Order placed!" />
    </Box>
  );
};

export default Checkout;
