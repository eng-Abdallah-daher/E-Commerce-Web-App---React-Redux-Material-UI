import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  styled,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ProductCard from './components/ProductCard';
import { obj } from '../data/products';
import Navbar from './components/Navbar';
import FiltersSidebar from './components/FiltersSidebar';
import { selectFilteredProducts } from '../redux/slices/productsSlice';
const SaleBanner = styled(Paper)(({ theme }) => ({
  backgroundImage: 'linear-gradient(135deg, #002233 0%, #335566 100%)',
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 10.5%)',
    backgroundSize: '20px 20px',
    opacity: 0.3
  }
}));
const SaleHighlight = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 'bold',
  fontSize: '1.5em',
  marginLeft: theme.spacing(1)
}));
const ProductsGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2)
}));
const ProductsTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(3),
  paddingBottom: theme.spacing(1),
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 60,
    height: 3,
    backgroundColor: theme.palette.primary.main
  }
}));
const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const filteredProducts = useSelector(selectFilteredProducts);
  const [selected, setSelected] = useState(null);
  const [swatchSel, setSwatchSel] = useState({});
  const chooseSuggest = idx => {
    setSelected(idx);
  };
  const displayProducts = selected !== null
    ? [obj.results[selected]]
    : filteredProducts;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar chooseSuggest={chooseSuggest} />
      <Container maxWidth="xl" sx={{ flexGrow: 1, py: 4 }}>
        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item xs={12} md={3} lg={2}>
              <FiltersSidebar />
            </Grid>
          )}
          <Grid item xs={12} md={9} lg={10}>
            <SaleBanner elevation={3}>
              <Typography variant="h3" component="h1" gutterBottom>
                SALE <SaleHighlight>50%</SaleHighlight>
              </Typography>
              <Typography variant="h6" gutterBottom>
                On a Wide Range Of Products
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mt: 2 }}
              >
                SHOP NOW
              </Button>
            </SaleBanner>
            {isMobile && (
              <Box sx={{ mb: 3 }}>
                <FiltersSidebar />
              </Box>
            )}
            <ProductsTitle variant="h4" component="h2">
              Products
            </ProductsTitle>
            <ProductsGrid container spacing={3}>
              {displayProducts.map(product => {
                const idx = selected !== null
                  ? selected
                  : product.originalIndex || product.index || 0;
                const sel = swatchSel[idx] || 0;
                const imgSrc = product.swatches
                  ? product.swatches[sel].img.src
                  : product.productImg;
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                    <ProductCard
                      idx={idx}
                      product={product}
                      setSwatchSel={setSwatchSel}
                      imgSrc={imgSrc}
                      sel={sel}
                    />
                  </Grid>
                );
              })}
            </ProductsGrid>
          </Grid>
        </Grid>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: 'center',
          bgcolor: 'primary.main',
          color: 'primary.contrastText'
        }}
      >
        <Typography variant="body2">© 2025</Typography>
      </Box>
    </Box>
  );
};
export default HomePage;
