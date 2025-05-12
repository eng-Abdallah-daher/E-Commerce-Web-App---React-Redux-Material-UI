import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
  Chip,
  Tooltip,
  styled,
  alpha
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';
import { addToCart } from '../../redux/slices/cartSlice';

const WishlistCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'transform 0.2s, box-shadow 0.2s',
  overflow: 'visible',
  borderRadius: theme.shape.borderRadius * 1.5,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
  }
}));

const WishlistCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  position: 'relative',
  overflow: 'hidden',
  borderTopLeftRadius: theme.shape.borderRadius * 1.5,
  borderTopRightRadius: theme.shape.borderRadius * 1.5
}));

const WishlistCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  paddingBottom: theme.spacing(1)
}));

const WishlistCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(0, 2, 2)
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
  marginBottom: theme.spacing(1)
}));

const RemoveButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  '&:hover': {
    backgroundColor: alpha(theme.palette.error.light, 0.2),
    color: theme.palette.error.main
  },
  zIndex: 1
}));

const WishlistBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  left: theme.spacing(1),
  zIndex: 1
}));

export default function WishlistItem({ item, openConfirmDialog }) {
  const dispatch = useDispatch();
  
  if (!item) return null;
  
  const handleAddToCart = () => {
    dispatch(addToCart({
      item: {
        id: item.index,
        name: item.productName,
        price: item.productPrice,
        image: item.productImg || 'default-image.png'
      },
      quantity: 1
    }));
  };

  return (
    <WishlistCard elevation={2}>
      <RemoveButton
        size="small"
        onClick={() => openConfirmDialog(item)}
        aria-label={`Remove ${item.productName} from wishlist`}
      >
        <DeleteIcon fontSize="small" />
      </RemoveButton>
      
      <WishlistBadge>
        <Chip
          icon={<FavoriteIcon fontSize="small" />}
          label="Wishlist"
          size="small"
          color="error"
          variant="filled"
          sx={{ 
            fontWeight: 500,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      </WishlistBadge>
      
      <WishlistCardMedia
        component={Link}
        to={`/products?id=${item.index}`}
        image={item.productImg || 'default-image.png'}
        title={item.productName}
        sx={{ 
          cursor: 'pointer',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.1) 100%)'
          }
        }}
      />
      
      <WishlistCardContent>
        <WishlistItemName 
          variant="subtitle1"
          component={Link}
          to={`/products?id=${item.index}`}
          sx={{ 
            textDecoration: 'none', 
            color: 'text.primary',
            '&:hover': { color: 'primary.main' }
          }}
        >
          {item.productName}
        </WishlistItemName>
        
        <WishlistItemPrice variant="h6">
          {item.productPriceFormatted}
        </WishlistItemPrice>
        
        {item.swatches && item.swatches.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
            {item.swatches.slice(0, 3).map((swatch, idx) => (
              <Tooltip key={idx} title={swatch.swatchName} arrow>
                <Box
                  component="span"
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    display: 'inline-block',
                    backgroundImage: `url(${swatch.img.src})`,
                    backgroundSize: 'cover',
                    border: '1px solid rgba(0,0,0,0.1)'
                  }}
                />
              </Tooltip>
            ))}
            {item.swatches.length > 3 && (
              <Tooltip title="More colors available" arrow>
                <Box
                  component="span"
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'action.hover',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}
                >
                  +{item.swatches.length - 3}
                </Box>
              </Tooltip>
            )}
          </Box>
        )}
      </WishlistCardContent>
      
      <WishlistCardActions>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CartIcon />}
          onClick={handleAddToCart}
          fullWidth
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          Add to Cart
        </Button>
        
        <Button
          variant="outlined"
          color="primary"
          startIcon={<VisibilityIcon />}
          component={Link}
          to={`/products?id=${item.index}`}
          fullWidth
          sx={{ 
            mt: 1,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          View Details
        </Button>
      </WishlistCardActions>
    </WishlistCard>
  );
}
