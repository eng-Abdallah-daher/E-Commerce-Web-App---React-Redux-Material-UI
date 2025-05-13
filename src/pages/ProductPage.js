import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Paper,
  Divider,
  styled,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Add,
  Remove
} from '@mui/icons-material';
import { obj } from '../data/products';
import Navbar from './components/Navbar';
import HeartButton from './components/HeartButton';
import { addToCart } from '../redux/slices/cartSlice';
const ProductContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: theme.spacing(4, 2),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: theme.spacing(2, 1),
  }
}));
const ImageSection = styled(Box)(({ theme }) => ({
  flex: '1 1 50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4),
  }
}));
const MainImage = styled('img')(({ theme }) => ({
  width: '60%',
  maxWidth: 300, 
  height: 'auto',
  objectFit: 'contain',
  marginBottom: theme.spacing(2),
  display: 'block',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '60%',
  }
}));
const ThumbnailsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '60%',
  maxWidth: 300, 
  position: 'relative',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '60%',
  }
}));
const ThumbnailsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  width: '100%',
  padding: theme.spacing(0, 4),
}));
const Thumbnails = styled(Box)(() => ({
  display: 'flex',
  transition: 'transform 0.3s ease',
}));
const ThumbnailButton = styled('button')(({ theme, selected }) => ({
  width: 64,
  height: 64,
  padding: 0,
  margin: theme.spacing(0, 0.5),
  cursor: 'pointer',
  border: selected ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover, &:focus': {
    opacity: 1,
    outline: 'none',
    border: `2px solid ${theme.palette.primary.main}`
  }
}));
const Thumbnail = styled('img')(({ selected }) => ({
  width: 60,
  height: 60,
  objectFit: 'cover',
  opacity: selected ? 1 : 0.7,
  pointerEvents: 'none'
}));
const DetailsSection = styled(Box)(({ theme }) => ({
  flex: '1 1 50%',
  padding: theme.spacing(0, 4),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 1),
  }
}));
const SwatchesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: theme.spacing(2, 0),
}));
const SwatchButton = styled('button')(({ theme, selected, swatchColor }) => ({
  width: 44,
  height: 44,
  borderRadius: '50%',
  margin: theme.spacing(0, 1, 1, 0),
  cursor: 'pointer',
  padding: 0,
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: selected
    ? swatchColor.toLowerCase() === 'white'
      ? '2px solid black'
      : `2px solid ${swatchColor}`
    : '2px solid transparent',
  '&:hover, &:focus': {
    opacity: 0.8,
    outline: 'none',
    border: swatchColor.toLowerCase() === 'white'
      ? '2px solid black'
      : `2px solid ${swatchColor}`
  }
}));
const Swatch = styled('img')({
  width: 40,
  height: 40,
  borderRadius: '50%',
  pointerEvents: 'none'
});
const QuantityContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
}));
const QuantityButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
}));
const QuantityDisplay = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  minWidth: 30,
  textAlign: 'center',
}));
const AddToCartButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 3),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  }
}));
const AddToWishlistButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(1, 0),
  color: theme.palette.text.primary,
  '&:hover, &:focus': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    outline: 'none'
  }
}));
const DetailItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 1),
  cursor: 'pointer',
  '&:hover, &:focus-within': {
    backgroundColor: theme.palette.action.hover,
  }
}));
export default function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { id: routeId } = useParams();
  const qs = new URLSearchParams(window.location.search);
  const queryId = qs.get('id');
  const rawId = routeId ?? queryId;
  const index = parseInt(rawId, 10);
  const [swatchIdx, setSwatchIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [images, setImages] = useState([]);
  const [mainIdx, setMainIdx] = useState(0);
  const [swname, setSwname] = useState("black");
  const [translateX, setTranslateX] = useState(0);
  const thumbRef = useRef();
  const product = Number.isInteger(index) ? obj.results[index] : undefined;
  useEffect(() => {
    if (product && product.swatches && product.swatches.length > 0) {
      const imgs = [
        product.swatches[swatchIdx].img.src,
        ...Object.values(product.images)
      ];
      setImages(imgs);
      setMainIdx(0);
      setSwname(product.swatches[swatchIdx].swatchName);
    }
  }, [product, swatchIdx]);
  const chooseSuggest = idx => {
    navigate(`/products?id=${idx}`);
  };
  const scrollThumb = (dir) => {
    const container = thumbRef.current;
    if (!container) return;
    const thumbnails = container.querySelectorAll('img');
    if (!thumbnails.length) return;
    const itemWidth = thumbnails[0].offsetWidth + 8;
    const visibleWidth = container.parentElement.offsetWidth;
    const totalWidth = thumbnails.length * itemWidth;
    const maxShift = -(totalWidth - visibleWidth);
    if (dir > 0) {
      if (translateX > maxShift) {
        const visibleCount = Math.floor(visibleWidth / itemWidth);
        const remainingThumbnails = Math.ceil((totalWidth + translateX - visibleWidth) / itemWidth);
        if (remainingThumbnails > 0) {
          const scrollBy = Math.min(remainingThumbnails, visibleCount) * itemWidth;
          let newTranslate = translateX - scrollBy;
          if (newTranslate < maxShift) {
            newTranslate = maxShift;
          }
          container.style.transform = `translateX(${newTranslate}px)`;
          setTranslateX(newTranslate);
        } else {
          container.style.transform = `translateX(${maxShift}px)`;
          setTranslateX(maxShift);
        }
      }
    }
    else if (dir < 0) {
      if (translateX < 0) {
        const visibleCount = Math.floor(visibleWidth / itemWidth);
        let newTranslate = translateX + (visibleCount * itemWidth);
        if (newTranslate > 0) {
          newTranslate = 0;
        }
        container.style.transform = `translateX(${newTranslate}px)`;
        setTranslateX(newTranslate);
      }
    }
  };
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        item: {
          id: index,
          name: product.productName,
          price: product.productPrice,
          image: images[0],
          variant: swname
        },
        quantity: qty
      }));
    }
  };
  if (!product) {
    return (
      <>
        <Navbar chooseSuggest={chooseSuggest} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Product Not Found</Typography>
            <Typography variant="body1">
              We couldn't find a product with ID "{rawId}".
            </Typography>
          </Paper>
        </Container>
      </>
    );
  }
  return (
    <>
      <Navbar chooseSuggest={chooseSuggest} />
      <ProductContainer maxWidth="xl">
        <ImageSection>
          <Box sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 500,
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto'
          }}>
            <IconButton
              sx={{
                position: 'absolute',
                left: '10%',
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'background.paper',
                boxShadow: 1,
                zIndex: 2,
                '&:disabled': { opacity: 0.5 },
                '&:focus': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px'
                }
              }}
              disabled={mainIdx === 0}
              onClick={() => mainIdx > 0 && setMainIdx(i => i - 1)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && mainIdx > 0) {
                  e.preventDefault();
                  setMainIdx(i => i - 1);
                }
              }}
              aria-label="Previous image"
              tabIndex="0"
            >
              <ChevronLeft />
            </IconButton>
            <MainImage
              src={images[mainIdx] || product.productImg}
              alt={`${product.productName} - ${swname} - Image ${mainIdx + 1} of ${images.length}`}
              tabIndex="0"
              sx={{
                '&:focus': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px'
                }
              }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                right: '10%',
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'background.paper',
                boxShadow: 1,
                zIndex: 2,
                '&:disabled': { opacity: 0.5 },
                '&:focus': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px'
                }
              }}
              disabled={mainIdx === images.length - 1}
              onClick={() => mainIdx < images.length - 1 && setMainIdx(i => i + 1)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && mainIdx < images.length - 1) {
                  e.preventDefault();
                  setMainIdx(i => i + 1);
                }
              }}
              aria-label="Next image"
              tabIndex="0"
            >
              <ChevronRight />
            </IconButton>
          </Box>
          <ThumbnailsContainer>
            <IconButton
              size="small"
              onClick={() => scrollThumb(-1)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollThumb(-1);
                }
              }}
              aria-label="Scroll thumbnails left"
              tabIndex="0"
              sx={{
                position: 'absolute',
                left: 0,
                zIndex: 1,
                '&:focus': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px'
                }
              }}
            >
              <ChevronLeft />
            </IconButton>
            <ThumbnailsWrapper>
              <Thumbnails ref={thumbRef}>
                {images.map((src, i) => (
                  <ThumbnailButton
                    key={i}
                    selected={i === mainIdx}
                    onClick={() => setMainIdx(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setMainIdx(i);
                      }
                    }}
                    aria-label={`View image ${i+1} of ${images.length}`}
                    aria-pressed={i === mainIdx}
                    tabIndex="0"
                  >
                    <Thumbnail
                      src={src}
                      alt=""
                      selected={i === mainIdx}
                    />
                  </ThumbnailButton>
                ))}
              </Thumbnails>
            </ThumbnailsWrapper>
            <IconButton
              size="small"
              onClick={() => scrollThumb(1)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollThumb(1);
                }
              }}
              aria-label="Scroll thumbnails right"
              tabIndex="0"
              sx={{
                position: 'absolute',
                right: 0,
                zIndex: 1,
                '&:focus': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px'
                }
              }}
            >
              <ChevronRight />
            </IconButton>
          </ThumbnailsContainer>
        </ImageSection>
        <DetailsSection>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            tabIndex="0"
            sx={{
              '&:focus': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: '2px'
              }
            }}
            role="heading"
            aria-level="1"
          >
            {product.productName}
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            gutterBottom
            tabIndex="0"
            sx={{
              '&:focus': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: '2px'
              }
            }}
            role="text"
            aria-label={`Price: ${product.productPriceFormatted}`}
          >
            {product.productPriceFormatted}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            tabIndex="0"
            sx={{
              '&:focus': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: '2px'
              }
            }}
            role="text"
            aria-label={`Selected variant: ${product.productName} ${swname}`}
          >
            {product.productName} {swname} Selected
          </Typography>
          <SwatchesContainer role="group" aria-label="Color options">
            {product.swatches.map((sw, i) => (
              <SwatchButton
                key={i}
                selected={i === swatchIdx}
                swatchColor={sw.swatchName}
                onClick={() => setSwatchIdx(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSwatchIdx(i);
                  }
                }}
                aria-label={`Select color: ${sw.swatchName}`}
                aria-pressed={i === swatchIdx}
                tabIndex="0"
              >
                <Swatch
                  src={sw.img.src}
                  alt=""
                />
              </SwatchButton>
            ))}
          </SwatchesContainer>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <QuantityContainer>
              <QuantityButton
                size="small"
                onClick={() => setQty(q => Math.max(1, q - 1))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setQty(q => Math.max(1, q - 1));
                  }
                }}
                aria-label="Decrease quantity"
                tabIndex="0"
              >
                <Remove fontSize="small" />
              </QuantityButton>
              <QuantityDisplay
                variant="body1"
                tabIndex="0"
                role="status"
                aria-label={`Current quantity: ${qty}`}
                sx={{
                  '&:focus': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: '2px'
                  }
                }}
              >
                {qty}
              </QuantityDisplay>
              <QuantityButton
                size="small"
                onClick={() => setQty(q => q + 1)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setQty(q => q + 1);
                  }
                }}
                aria-label="Increase quantity"
                tabIndex="0"
              >
                <Add fontSize="small" />
              </QuantityButton>
            </QuantityContainer>
            <AddToCartButton
              variant="contained"
              onClick={handleAddToCart}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleAddToCart();
                }
              }}
              fullWidth={isMobile}
              aria-label={`Add ${product.productName} to cart, quantity: ${qty}`}
            >
              ADD TO CART
            </AddToCartButton>
          </Box>
          <AddToWishlistButton
            startIcon={<HeartButton productIndex={index} />}
            aria-label={`Add ${product.productName} to wishlist`}
            tabIndex="0"
          >
            ADD TO LIST
          </AddToWishlistButton>
          <Divider />
          {[
            "PRODUCTS DETAILS",
            "FREE SHIPPING IN THE CONTIGUOUS US",
            "FREE RETURNS WITHIN 30 DAYS",
            "QUALITY CERTIFICATIONS"
          ].map((text, index) => (
            <React.Fragment key={index}>
              <DetailItem
                role="button"
                tabIndex="0"
                onClick={() => alert(`${text} details would expand here`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    alert(`${text} details would expand here`);
                  }
                }}
                aria-label={`Expand ${text.toLowerCase()} section`}
              >
                <Typography variant="body1">{text}</Typography>
                <Typography variant="body1">+</Typography>
              </DetailItem>
              <Divider />
            </React.Fragment>
          ))}
        </DetailsSection>
      </ProductContainer>
    </>
  );
}
