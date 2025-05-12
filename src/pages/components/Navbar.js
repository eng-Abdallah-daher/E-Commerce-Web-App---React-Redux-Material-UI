import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  useMediaQuery,
  useTheme,
  ListItemIcon
} from '@mui/material';
import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon,
  Favorite as HeartIcon,
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import { toggleMobileMenu, setDrawerMenu, goBackInDrawer } from '../../redux/slices/uiSlice';
import '../../css/Overlay.css';
import Cart from '../cart';
import NavbarLinks from './NavbarLinks';
import SearchBar from './SearchBar';
import Wishlist from './Wishlist';
import User from '../components/UserGreeting';

export default function Navbar({ chooseSuggest }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { isOpen: mobileOpen } = useSelector(state => state.ui.mobileMenu);
  const { currentMenu } = useSelector(state => state.ui.drawer);


  React.useEffect(() => {
    const handleMouseEnter = () => {
      document.body.classList.add('no-scroll');
    };

    const handleMouseLeave = () => {
      document.body.classList.remove('no-scroll');
    };


    const menuItems = document.querySelectorAll('.menu-item-with-overlay');


    menuItems.forEach(item => {
      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
    });


    return () => {
      menuItems.forEach(item => {
        item.removeEventListener('mouseenter', handleMouseEnter);
        item.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const handleDrawerToggle = () => {
    dispatch(toggleMobileMenu());
  };

  const handleProductsClick = () => {
    dispatch(setDrawerMenu('products'));
  };

  const handleCategoriesClick = () => {
    dispatch(setDrawerMenu('categories'));
  };

  const handleBackClick = () => {
    dispatch(goBackInDrawer());
  };



  const drawer = (
    <Box sx={{ width: 250 }}>
      {currentMenu === 'main' ? (
        <List>
          <ListItem button component={Link} to="/" sx={{ color: 'white' }}>
            <ListItemText
              primary={<Typography color="white">Home</Typography>}
            />
          </ListItem>
          <Box
            className="menu-item-with-overlay"
            sx={{
              width: '100%',
              position: 'relative',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }
            }}
          >
            <ListItem
              button
              onClick={handleProductsClick}
              sx={{
                width: '100%',
                backgroundColor: 'transparent'
              }}
            >
              <ListItemText
                primary={<Typography color="white">Products</Typography>}
              />
              <ExpandMoreIcon sx={{ color: 'white' }} />
            </ListItem>
            <div className="overlay-container"></div>
          </Box>
          <ListItem button component={Link} to="/goods" sx={{ color: 'white' }}>
            <ListItemText
              primary={<Typography color="white">Goods</Typography>}
            />
          </ListItem>
          <ListItem button component={Link} to="/about" sx={{ color: 'white' }}>
            <ListItemText
              primary={<Typography color="white">About</Typography>}
            />
          </ListItem>
          <ListItem button component={Link} to="/contact" sx={{ color: 'white' }}>
            <ListItemText
              primary={<Typography color="white">Contact</Typography>}
            />
          </ListItem>
          <Box
            className="menu-item-with-overlay"
            sx={{
              width: '100%',
              position: 'relative',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }
            }}
          >
            <ListItem
              button
              onClick={handleCategoriesClick}
              sx={{
                width: '100%',
                backgroundColor: 'transparent'
              }}
            >
              <ListItemText
                primary={<Typography color="white">Categories</Typography>}
              />
              <ExpandMoreIcon sx={{ color: 'white' }} />
            </ListItem>
            <div className="overlay-container"></div>
          </Box>
        </List>
      ) : currentMenu === 'products' ? (
        <List>
          <ListItem
            button
            onClick={handleBackClick}
            sx={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              mb: 1,
              pb: 1
            }}
          >
            <ListItemIcon>
              <ArrowBackIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography color="white">Back to Menu</Typography>}
            />
          </ListItem>
          <Typography
            variant="subtitle1"
            sx={{
              px: 2,
              fontWeight: 'bold',
              mb: 1,
              color: 'white'
            }}
          >
            Products
          </Typography>
          <ListItem
            button
            component={Link}
            to="/products/2.1"
            sx={{ pl: 4 }}
          >
            <ListItemText
              primary={<Typography color="white">2.1</Typography>}
            />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/products/2.2"
            sx={{ pl: 4 }}
          >
            <ListItemText
              primary={<Typography color="white">2.2</Typography>}
            />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/products/2.3"
            sx={{ pl: 4 }}
          >
            <ListItemText
              primary={<Typography color="white">2.3</Typography>}
            />
          </ListItem>
        </List>
      ) : currentMenu === 'categories' ? (
        <List>
          <ListItem
            button
            onClick={handleBackClick}
            sx={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              mb: 1,
              pb: 1
            }}
          >
            <ListItemIcon>
              <ArrowBackIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography color="white">Back to Menu</Typography>}
            />
          </ListItem>
          <Typography
            variant="subtitle1"
            sx={{
              px: 2,
              fontWeight: 'bold',
              mb: 1,
              color: 'white'
            }}
          >
            Categories
          </Typography>
          <ListItem
            button
            component={Link}
            to="/categories/3.1"
            sx={{ pl: 4 }}
          >
            <ListItemText
              primary={<Typography color="white">3.1</Typography>}
            />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/categories/3.2"
            sx={{ pl: 4 }}
          >
            <ListItemText
              primary={<Typography color="white">3.2</Typography>}
            />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/categories/3.3"
            sx={{ pl: 4 }}
          >
            <ListItemText
              primary={<Typography color="white">3.3</Typography>}
            />
          </ListItem>
        </List>
      ) : null}
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          {!isMobile ? (
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                MY SHOP
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <SearchBar chooseSuggest={chooseSuggest} />
              </Box>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                <Wishlist />
                <Cart />
                <User />
              </Box>
            </Toolbar>
          ) : (
            <Toolbar disableGutters>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  flexGrow: 1,
                  fontWeight: 700,
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                MY SHOP
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/wishlist"
                  aria-label="wishlist"
                >
                  <HeartIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/cart"
                  aria-label="cart"
                >
                  <CartIcon />
                </IconButton>
                <User />
              </Box>
            </Toolbar>
          )}

          {isMobile && (
            <Box sx={{ pb: 2 }}>
              <SearchBar chooseSuggest={chooseSuggest} />
            </Box>
          )}
        </Container>
      </AppBar>

      {!isMobile && <NavbarLinks />}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            bgcolor: 'primary.main',
            color: 'white',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
