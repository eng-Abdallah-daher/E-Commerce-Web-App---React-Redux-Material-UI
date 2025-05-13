import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  Paper,
  styled
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { obj } from '../data/products';
import { getWishlist, removeFromWishlist, clearWishlist } from './utils/WishlistFunctions';
import Navbar from './components/Navbar';
import ConfirmDialog from './components/ConfirmDialog';
import { addToCart } from '../redux/slices/cartSlice';
const WishlistContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5, 3),
  }
}));
const WishlistHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));
const WishlistTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2)
}));
const WishlistItemCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4]
  }
}));
const WishlistItemMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5'
}));
const WishlistItemContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));
const WishlistItemName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  height: '3em',
  lineHeight: '1.5em'
}));
const WishlistItemPrice = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2)
}));
const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  textTransform: 'none'
}));
const EmptyWishlist = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  marginTop: theme.spacing(4)
}));
const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isClearingAll, setIsClearingAll] = useState(false);
  useEffect(() => {
    const savedWishlistIndexes = getWishlist();
    const fullProducts = savedWishlistIndexes.map(index => ({
      ...obj.results[index],
      index
    }));
    setWishlist(fullProducts);
  }, []);
  const openConfirmDialog = (item, isClearAll = false) => {
    setItemToRemove(item);
    setIsClearingAll(isClearAll);
    setShowConfirm(true);
  };
  const confirmRemove = () => {
    if (isClearingAll) {
      clearWishlist();
      setWishlist([]);
    } else if (itemToRemove !== null) {
      removeFromWishlist(itemToRemove.index);
      setWishlist(prev => prev.filter(i => i.index !== itemToRemove.index));
    }
    setShowConfirm(false);
  };
  const cancelRemove = () => {
    setShowConfirm(false);
  };
  const handleAddToCart = (item) => {
    dispatch(addToCart({
      item: {
        id: item.index,
        name: item.productName,
        price: item.productPrice,
        image: item.productImg
      },
      quantity: 1
    }));
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
      <WishlistContainer maxWidth="lg">
        <WishlistHeader>
          <WishlistTitle variant="h4">
            YOUR WISHLIST ({wishlist.length})
          </WishlistTitle>
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
          >
            Back
          </Button>
        </WishlistHeader>
        <Divider sx={{ mb: 4 }} />
        {wishlist.length === 0 ? (
          <EmptyWishlist elevation={2}>
            <Typography variant="h6" gutterBottom>
              Your wishlist is empty.
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Add items to your wishlist to save them for later.
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleGoBack}
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </EmptyWishlist>
        ) : (
          <>
            <Grid container spacing={3}>
              {wishlist.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <WishlistItemCard elevation={2}>
                    <Box sx={{ position: 'relative' }}>
                      <WishlistItemMedia
                        image={item.productImg}
                        title={item.productName}
                        onClick={() => navigate(`/products?id=${item.index}`)}
                        sx={{ cursor: 'pointer' }}
                      />
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          }
                        }}
                        onClick={() => openConfirmDialog(item)}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <WishlistItemContent>
                      <WishlistItemName 
                        variant="subtitle1"
                        onClick={() => navigate(`/products?id=${item.index}`)}
                        sx={{ cursor: 'pointer' }}
                      >
                        {item.productName}
                      </WishlistItemName>
                      <WishlistItemPrice variant="h6">
                        {item.productPriceFormatted}
                      </WishlistItemPrice>
                      <ActionButton
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<CartIcon />}
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </ActionButton>
                    </WishlistItemContent>
                  </WishlistItemCard>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => openConfirmDialog(null, true)}
              >
                Remove All
              </Button>
            </Box>
          </>
        )}
      </WishlistContainer>
      <ConfirmDialog 
        show={showConfirm} 
        onCancel={cancelRemove} 
        onConfirm={confirmRemove} 
        message={isClearingAll
          ? 'Are you sure you want to remove all items from the wishlist?'
          : 'Are you sure you want to remove the following product from your wishlist?'} 
        title={isClearingAll ? 'Clear Wishlist?' : 'Remove Item?'}
      />
    </>
  );
};
export default WishlistPage;
