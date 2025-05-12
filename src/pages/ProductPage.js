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
  maxWidth: 300, // 60% of 500
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
  maxWidth: 300, // 60% of 500
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

const Thumbnail = styled('img')(({ theme, selected }) => ({
  width: 60,
  height: 60,
  objectFit: 'cover',
  margin: theme.spacing(0, 0.5),
  cursor: 'pointer',
  border: selected ? `2px solid ${theme.palette.primary.main}` : 'none',
  opacity: selected ? 1 : 0.7,
  '&:hover': {
    opacity: 1,
  }
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

const Swatch = styled('img')(({ theme, selected, swatchColor }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  margin: theme.spacing(0, 1, 1, 0),
  cursor: 'pointer',
  border: selected
    ? swatchColor.toLowerCase() === 'white'
      ? '2px solid black'
      : `2px solid ${swatchColor}`
    : 'none',
  '&:hover': {
    opacity: 0.8,
  }
}));

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
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  }
}));

const DetailItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 1),
  cursor: 'pointer',
  '&:hover': {
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

    // Calculate the width of a single thumbnail including margin
    const itemWidth = thumbnails[0].offsetWidth + 8;

    // Calculate the visible width of the container
    const visibleWidth = container.parentElement.offsetWidth;

    // Calculate the total width of all thumbnails
    const totalWidth = thumbnails.length * itemWidth;

    // Calculate the maximum possible shift (negative value)
    const maxShift = -(totalWidth - visibleWidth);

    // If scrolling right (dir > 0)
    if (dir > 0) {
      // If we're at the last page, go all the way to the end
      if (translateX > maxShift) {
        // Calculate how many full thumbnails are visible
        const visibleCount = Math.floor(visibleWidth / itemWidth);

        // Calculate how many thumbnails are left to show
        const remainingThumbnails = Math.ceil((totalWidth + translateX - visibleWidth) / itemWidth);

        // If there are remaining thumbnails, scroll to show them
        if (remainingThumbnails > 0) {
          // Scroll by the number of remaining thumbnails, but not more than visible count
          const scrollBy = Math.min(remainingThumbnails, visibleCount) * itemWidth;
          let newTranslate = translateX - scrollBy;

          // Make sure we don't scroll past the end
          if (newTranslate < maxShift) {
            newTranslate = maxShift;
          }

          // Apply the transform
          container.style.transform = `translateX(${newTranslate}px)`;
          setTranslateX(newTranslate);
        } else {
          // Go to the end
          container.style.transform = `translateX(${maxShift}px)`;
          setTranslateX(maxShift);
        }
      }
    }
    // If scrolling left (dir < 0)
    else if (dir < 0) {
      // If we're not at the beginning
      if (translateX < 0) {
        // Calculate how many full thumbnails are visible
        const visibleCount = Math.floor(visibleWidth / itemWidth);

        // Scroll by the number of visible thumbnails
        let newTranslate = translateX + (visibleCount * itemWidth);

        // Make sure we don't scroll past the beginning
        if (newTranslate > 0) {
          newTranslate = 0;
        }

        // Apply the transform
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
                '&:disabled': { opacity: 0.5 }
              }}
              disabled={mainIdx === 0}
              onClick={() => mainIdx > 0 && setMainIdx(i => i - 1)}
              aria-label="Previous image"
            >
              <ChevronLeft />
            </IconButton>

            <MainImage

              src={images[mainIdx] || product.productImg}
              alt={product.productName}
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
                '&:disabled': { opacity: 0.5 }
              }}
              disabled={mainIdx === images.length - 1}
              onClick={() => mainIdx < images.length - 1 && setMainIdx(i => i + 1)}
              aria-label="Next image"
            >
              <ChevronRight />
            </IconButton>
          </Box>

          <ThumbnailsContainer>
            <IconButton
              size="small"
              onClick={() => scrollThumb(-1)}
              aria-label="Scroll thumbnails left"
              sx={{ position: 'absolute', left: 0, zIndex: 1 }}
            >
              <ChevronLeft />
            </IconButton>

            <ThumbnailsWrapper>
              <Thumbnails ref={thumbRef}>
                {images.map((src, i) => (
                  <Thumbnail
                    key={i}
                    src={src}
                    alt={`Thumbnail ${i+1}`}
                    selected={i === mainIdx}
                    onClick={() => setMainIdx(i)}
                  />
                ))}
              </Thumbnails>
            </ThumbnailsWrapper>

            <IconButton
              size="small"
              onClick={() => scrollThumb(1)}
              aria-label="Scroll thumbnails right"
              sx={{ position: 'absolute', right: 0, zIndex: 1 }}
            >
              <ChevronRight />
            </IconButton>
          </ThumbnailsContainer>
        </ImageSection>

        <DetailsSection>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.productName}
          </Typography>

          <Typography variant="h5" color="primary" gutterBottom>
            {product.productPriceFormatted}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {product.productName} {swname} Selected
          </Typography>

          <SwatchesContainer>
            {product.swatches.map((sw, i) => (
              <Swatch
                key={i}
                src={sw.img.src}
                alt={sw.swatchName}
                selected={i === swatchIdx}
                swatchColor={sw.swatchName}
                onClick={() => setSwatchIdx(i)}
              />
            ))}
          </SwatchesContainer>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <QuantityContainer>
              <QuantityButton
                size="small"
                onClick={() => setQty(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Remove fontSize="small" />
              </QuantityButton>

              <QuantityDisplay variant="body1">
                {qty}
              </QuantityDisplay>

              <QuantityButton
                size="small"
                onClick={() => setQty(q => q + 1)}
                aria-label="Increase quantity"
              >
                <Add fontSize="small" />
              </QuantityButton>
            </QuantityContainer>

            <AddToCartButton
              variant="contained"
              onClick={handleAddToCart}
              fullWidth={isMobile}
            >
              ADD TO CART
            </AddToCartButton>
          </Box>

          <AddToWishlistButton
            startIcon={<HeartButton productIndex={index} />}


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
              <DetailItem>
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
