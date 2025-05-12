import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/home_Page';
import ProductDetail from './pages/ProductPage';
import CartPage from './pages/cartPage';
import GoodsPage from './pages/goodsPage';
import WishlistPage from './pages/WishlistPage';
import Login from './pages/loginPage';
import Account from './pages/AccountPage';
import PageOverlay from './pages/components/PageOverlay';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <PageOverlay />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/goods" element={<GoodsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
