import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  Card,
  CardMedia,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { setCookie, getCookie } from './utils/Functions';
import { addToWishlist, getWishlist } from './utils/WishlistFunctions';
import { obj } from '../data/products';
import ConfirmDialog from './components/ConfirmDialog';
import Navbar from './components/Navbar';
import {
  clearCart,
  removeFromCart
} from '../redux/slices/cartSlice';
import { addToWishlistAction } from '../redux/slices/wishlistSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();



  const [cart, setCart] = useState([]);


  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToSave, setItemToSave] = useState(null);


  useEffect(() => {
    const savedCart = getCookie('cartItems');
    setCart(savedCart);
  }, []);


  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  const handleSaveForLater = (item) => {
    setItemToSave(item);
    setShowConfirm(true);
  };


  const confirmSave = () => {
    if (itemToSave) {
      console.log(itemToSave)
      const index = obj.results.findIndex((product) => product.productID === itemToSave.productID);

        addToWishlist(index);
        dispatch(addToWishlistAction(index));


    }
    setShowConfirm(false);
    setItemToSave(null);
  };


  const handleRemoveFromCart = (item, index) => {
    console.log("Removing item:", item);

    dispatch(removeFromCart(item));
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    console.log("Updated cart:", updatedCart);
  };


  const handleCheckout = () => {

    setCookie('cartItems', [], 7);
    dispatch(clearCart());
    setCart([]);
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
              label={cart.length}
              color="primary"
              size="small"
              sx={{ marginLeft: 1 }}
            />
          </Typography>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
          >
            Back
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {cart.length === 0 ? (
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
            >
              Continue Shopping
            </Button>
          </Paper>
        ) : (
          <>
            <Box>
              {cart.map((item, index) => (

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
                      >
                        Save for Later
                      </Button>
                    </Box>
                  </Box>

                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleRemoveFromCart(item, index)}
                    aria-label="remove the item from the cart"
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
                  >
                    Continue Shopping
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </Container>

      <ConfirmDialog
        show={showConfirm}
        title="Save to Wishlist?"
        message="Are you sure you want to save this item to your wishlist?"
        onCancel={() => { setShowConfirm(false); setItemToSave(null); }}
        onConfirm={confirmSave}
      />
    </>
  );
};

export default CartPage;
