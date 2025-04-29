import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import useStore from '../store/useStore';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
      API.get(`/products/category/${res.data.category}`).then((rel) =>
        setRelated(rel.data.products.filter((p: any) => p.id !== res.data.id))
      );
    });
  }, [id]);

  if (!product) return <CircularProgress />;

  return (
    <Box p={2}>
      <Typography variant="h4">{product.title}</Typography>
      <img src={product.thumbnail} width={300} alt={product.title} />
      <Typography variant="h6">₹{product.price}</Typography>
      <Typography>{product.description}</Typography>
      <Button variant="contained" onClick={() => addToCart(product)}>Add to Cart</Button>

      <Typography variant="h5" mt={4}>Related Products</Typography>
      <Grid container spacing={2}>
        {related.slice(0, 4).map((r) => (
          <Grid key={r.id}>
            <img src={r.thumbnail} alt={r.title} width={120} />
            <Typography>{r.title}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductDetail;
