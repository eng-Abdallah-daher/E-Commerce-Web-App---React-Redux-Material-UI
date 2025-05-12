import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Divider,
  styled,
  Button,
  CardActionArea,
  CardActions
} from '@mui/material';
import { addToCart } from '../../redux/slices/cartSlice';
import Heart from './HeartButton';

const ProductCardStyled = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  }
}));

const SwatchImage = styled('img')(({ theme, selected }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  cursor: 'pointer',
  margin: theme.spacing(0, 0.5),
  border: selected ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
  '&:hover': {
    border: `2px solid ${theme.palette.primary.main}`
  }
}));

const FilterLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontSize: '0.875rem'
}));

const QuickShopButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: 0,
  padding: theme.spacing(1),
  transform: 'translateY(100%)',
  transition: 'transform 0.3s',
  '.MuiCardMedia-root:hover &': {
    transform: 'translateY(0)',
  }
}));

const HeartContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  zIndex: 1
}));

export default function ProductCard({ idx, product, setSwatchSel, imgSrc, sel }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {

    dispatch(addToCart({
      item: {
        id: idx,
        name: product.productName,
        price: product.productPrice,
        image: imgSrc,
        variant: product.swatches ? product.swatches[sel].swatchName : null
      },
      quantity: 1
    }));
  };

  return (
    <ProductCardStyled elevation={1}>
      <Box sx={{ position: 'relative' }}>
        <HeartContainer>
          <Heart productIndex={idx} />
        </HeartContainer>

        <CardActionArea component={Link} to={`/products?id=${idx}`}>
          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              height="200"
              image={imgSrc}
              alt={product.productName}
              sx={{ objectFit: 'cover' }}
            />
            <QuickShopButton
              variant="text"
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
            >
              Quick Shop
            </QuickShopButton>
          </Box>
        </CardActionArea>
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <FilterLabel>
          <Divider sx={{ flex: 1, mr: 1 }} />
          <Typography variant="caption">
            Filter <span style={{ color: 'gray' }}>104 Times</span>
          </Typography>
          <Divider sx={{ flex: 1, ml: 1 }} />
        </FilterLabel>

        <Typography
          variant="h6"
          component={Link}
          to={`/products?id=${idx}`}
          sx={{
            textDecoration: 'none',
            color: 'text.primary',
            display: 'block',
            mb: 1,
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          {product.productName}
        </Typography>

        <Typography variant="subtitle1" color="primary" fontWeight="bold">
          {product.productPriceFormatted}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.productName} {sel + 1} selected
        </Typography>

        {product.swatches && (
          <Box sx={{ display: 'flex', mt: 1 }}>
            {product.swatches.slice(0, 3).map((swatch, j) => (
              <SwatchImage
                key={j}
                selected={j === sel}
                src={swatch.img.src}
                alt={swatch.swatchName}
                onClick={(e) => {
                  e.stopPropagation();
                  setSwatchSel(s => ({ ...s, [idx]: j }));
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </ProductCardStyled>
  );
}
