import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  IconButton,
  Divider,
  Chip,
  CardMedia,
  useTheme
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { obj } from '../data/products';
import Navbar from './components/Navbar';
import {
  clearCart,
  removeFromCart,
  selectCartItems
} from '../redux/slices/cartSlice';
import { addToWishlistAction } from '../redux/slices/wishlistSlice';
import { useConfirmDialog } from '../hooks/useConfirmDialog';
const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const cartItems = useSelector(selectCartItems);
  const { openConfirmDialog } = useConfirmDialog();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const handleSaveForLater = (item) => {
    const index = obj.results.findIndex((product) => product.productID === item.productID);
    openConfirmDialog({
      title: "Save to Wishlist?",
      message: "Are you sure you want to save this item to your wishlist?",
      onConfirm: () => {
        dispatch(addToWishlistAction(index));
        dispatch(removeFromCart(item));
      }
    });
  };
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  const handleCheckout = () => {
    dispatch(clearCart());
    alert("Checkout functionality would be implemented here");
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  const chooseSuggest = (idx) => {
    navigate(`/products?id=${idx}`);
  };
  return (
    <>
      <Navbar chooseSuggest={chooseSuggest} />
      <Container maxWidth="lg" sx={{ padding: theme.spacing(4, 2) }}>
        <Box
          sx={{
            marginBottom: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 2
            }
          }}
        >
          <Typography variant="h4" fontWeight={600} sx={{ display: 'flex', alignItems: 'center' }}>
            YOUR CART
            <Chip
              label={cartItems.length}
              color="primary"
              size="small"
              sx={{ marginLeft: 1 }}
            />
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            aria-label="Go back"
          >
            Back
          </Button>
        </Box>
        <Divider sx={{ mb: 4 }} />
        {cartItems.length === 0 ? (
          <Paper
            elevation={2}
            sx={{
              padding: 4,
              textAlign: 'center',
              marginTop: 4
            }}
          >
            <Typography variant="h6" gutterBottom>
              Your cart is empty.
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
              Add items to your cart to proceed with checkout.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoBack}
              sx={{ mt: 2 }}
              aria-label="Continue shopping"
            >
              Continue Shopping
            </Button>
          </Paper>
        ) : (
          <>
            <Box role="list" aria-label="Cart items">
              {cartItems.map((item, index) => (
                <Paper
                  elevation={1}
                  key={index}
                  sx={{
                    marginBottom: 2,
                    padding: 2,
                    display: 'flex',
                    position: 'relative',
                    [theme.breakpoints.down('sm')]: {
                      flexDirection: 'column'
                    }
                  }}
                  role="listitem"
                >
                  <CardMedia
                    component="img"
                    src={item.img || item.image}
                    alt={item.name}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: 'contain',
                      marginRight: 2,
                      [theme.breakpoints.down('sm')]: {
                        width: '100%',
                        height: 200,
                        marginBottom: 2
                      }
                    }}
                  />
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Variant: {item.swatch}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={700} color="primary.main">
                      ${item.price}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Quantity: {item.quantity}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 'auto', flexWrap: 'wrap' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<FavoriteIcon />}
                        onClick={() => handleSaveForLater(item)}
                        aria-label={`Save ${item.name} for later`}
                      >
                        Save for Later
                      </Button>
                    </Box>
                  </Box>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleRemoveFromCart(item)}
                    aria-label={`Remove ${item.name} from cart`}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              ))}
            </Box>
            <Paper
              elevation={2}
              sx={{
                padding: 3,
                marginTop: 3,
                marginBottom: 3
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 2
                }}
              >
                <Typography variant="h6">Estimated Total</Typography>
                <Typography variant="h5" fontWeight="bold" color="primary.main">
                  ${total.toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handleCheckout}
                    aria-label="Proceed to checkout"
                  >
                    Checkout
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    onClick={handleGoBack}
                    aria-label="Continue shopping"
                  >
                    Continue Shopping
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </Container>
    </>
  );
};
export default CartPage;
