import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  Popover,
  styled
} from '@mui/material';
import { ShoppingCart as CartIcon } from '@mui/icons-material';
import CartItem from './components/cartItem';
import ConfirmDialog from './components/ConfirmDialog';
import {
  openCart,
  closeCart,
  clearCart,
  openConfirmDialog,
  closeConfirmDialog,
  confirmRemove,
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
  selectConfirmDialogOpen
} from '../redux/slices/cartSlice';
import { hideOverlay, showOverlay } from '../redux/slices/uiSlice';
const CartPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    width: 350,
    maxWidth: '90vw',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    marginTop: theme.spacing(1),
  },
}));
const CartArrow = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: -10,
  right: 14,
  width: 0,
  height: 0,
  borderLeft: '10px solid transparent',
  borderRight: '10px solid transparent',
  borderBottom: `10px solid ${theme.palette.background.paper}`,
}));
const CartItemsWrapper = styled(Box)(({ theme }) => ({
  maxHeight: 300,
  overflowY: 'auto',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotal);
  const isCartOpen = useSelector(selectIsCartOpen);
  const confirmDialogOpen = useSelector(selectConfirmDialogOpen);
  const [anchorEl, setAnchorEl] = React.useState(null);
  useEffect(() => {
    if (isCartOpen) {
      dispatch(showOverlay({
        content: "",
        position: 'top',
        zIndex: 1100
      }));
      document.body.style.overflow = 'hidden';
    } else {
      dispatch(hideOverlay());
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen, dispatch]);
  const handleCartIconMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(openCart());
  };
  const handleCartIconMouseLeave = () => {
    setTimeout(() => {
      setAnchorEl(null);
      dispatch(closeCart());
    }, 100);
  };
  
  const handleOpenConfirmDialog = (index) => {
    dispatch(openConfirmDialog(index));
  };
  const handleCloseConfirmDialog = () => {
    dispatch(closeConfirmDialog());
  };
  const handleConfirmRemove = () => {
    dispatch(confirmRemove());
  };
  const handleCheckout = () => {
    dispatch(clearCart());
    dispatch(closeCart());
  };
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="cart"
        onMouseEnter={handleCartIconMouseEnter}
        onClick={handleCartIconMouseEnter}
      >
        <CartIcon />
      </IconButton>
      <CartPopover
        open={isCartOpen}
        anchorEl={anchorEl}
        onClose={() => dispatch(closeCart())}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        disableRestoreFocus
        onMouseLeave={handleCartIconMouseLeave}
        slotProps={{
          paper: {
            onMouseLeave: handleCartIconMouseLeave
          }
        }}
      >
        <CartArrow />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
          tabindex="0"
          variant="h6">YOUR CART ({cartItems.length})</Typography>
          <Button
            component={Link}
            to="/cart"
            color="primary"
            onClick={() => dispatch(closeCart())}
          >
            VIEW CART
          </Button>
        </Box>
        <Divider sx={{ my: 1 }} />
        <CartItemsWrapper>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <CartItem
                key={index}
                index={index}
                item={item}
                openConfirmDialog={handleOpenConfirmDialog}
              />
            ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', py: 2 }}>
              No items in cart
            </Typography>
          )}
        </CartItemsWrapper>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
        tabindex="0">
          <Typography variant="subtitle1" fontWeight="bold">Estimated Total</Typography>
          <Typography variant="subtitle1" fontWeight="bold">${totalAmount.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCheckout}
          >
            Checkout
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => dispatch(closeCart())}
          >
            Close
          </Button>
        </Box>
      </CartPopover>
      <ConfirmDialog
        show={confirmDialogOpen}
        title="Remove Item?"
        message="Are you sure you want to remove the following product from the cart?"
        onCancel={handleCloseConfirmDialog}
        onConfirm={handleConfirmRemove}
      />
    </>
  );
};
export default Cart;
