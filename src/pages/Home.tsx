import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Home.css';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

const PRODUCTS_PER_PAGE = 12;

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const { cart, setCart } = useContext(CartContext)!;

  useEffect(() => {
    const fetchProducts = async () => {
      const skip = (page - 1) * PRODUCTS_PER_PAGE;
      const res = await fetch(`https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`);
      const data = await res.json();
      setProducts(data.products);
      setTotalProducts(data.total);
    };
    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const addToCart = (product: Product) => {
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item: any) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Our Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} className="product-image" />
            <div className="product-details">
              <h3>{product.title}</h3>
              <p className="product-desc">{product.description.slice(0, 60)}...</p>
              <p className="product-price">₹{product.price}</p>
              <button onClick={() => addToCart(product)} className="add-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>⟨ Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next ⟩</button>
      </div>
    </div>
  );
};

export default Home;
