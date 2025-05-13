import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Paper,
  styled
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const CartItemContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  alignItems: 'center',
  position: 'relative',
  '&:hover': {
    boxShadow: theme.shadows[2]
  }
}));
const CartItemImage = styled('img')(({ theme }) => ({
  width: 70,
  height: 70,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius
}));
const CartItemDetails = styled(Box)(({ theme }) => ({
  flex: 1,
  marginLeft: theme.spacing(2),
  overflow: 'hidden'
}));
const CartItemName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(0.5),
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));
export default function CartItem({ index, item, openConfirmDialog }) {
  const dispatch = useDispatch();
  return (
    <CartItemContainer elevation={0}>
      <CartItemImage
        src={item.image || item.img}
        alt={item.name}
      />
      <CartItemDetails>
        <CartItemName variant="subtitle2">
          {item.name}
        </CartItemName>
        <Grid container spacing={1}>
          {item.variant && (
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">
                Variant: {item.variant || item.swatch}
              </Typography>
            </Grid>
          )}
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Qty: {item.quantity}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </CartItemDetails>
      <IconButton
        size="small"
        edge="end"
        onClick={() => openConfirmDialog(index)}
        aria-label={`Remove ${item.name} from cart`}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </CartItemContainer>
  );
}
