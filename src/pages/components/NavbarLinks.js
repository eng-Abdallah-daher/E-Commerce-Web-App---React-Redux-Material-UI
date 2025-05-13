import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Stack,
  Button,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  Typography,
  Grid,
  styled,
  useTheme,
  useMediaQuery,
  Modal,
  Backdrop
} from '@mui/material';
import { KeyboardArrowDown as ArrowIcon } from '@mui/icons-material';
import { showOverlay, hideOverlay } from '../../redux/slices/uiSlice';
const NavContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 0),
  display: 'flex',
  justifyContent: 'center',
  borderTop: `1px solid ${theme.palette.primary.light}`,
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));
const NavLink = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  textTransform: 'none',
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }
}));
const DropdownPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  width: '100%',
  maxWidth: '100vw',
  zIndex: 1300,
  overflowX: 'hidden'
}));
const DropdownOverlay = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1200,
  display: 'none',
  '&.active': {
    display: 'block'
  }
}));
export default function NavbarLinks() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeDropdown, setActiveDropdown] = useState(null);
  const productsRef = useRef(null);
  const categoriesRef = useRef(null);
  useEffect(() => {
    if (activeDropdown) {
      document.body.style.overflow = 'hidden';
      dispatch(showOverlay({
        top:110,
        content: null,
        position: 'top',
        zIndex: 1100
      }));
    } else {
      document.body.style.overflow = '';
      dispatch(hideOverlay());
    }
    return () => {
      document.body.style.overflow = '';
      dispatch(hideOverlay());
    };
  }, [activeDropdown, dispatch]);
  const handleMenuClick = (type) => {
    setActiveDropdown(prev => prev === type ? null : type);
  };
  const handleClose = () => {
    setActiveDropdown(null);
  };
  if (isMobile) return null;
  return (
    <NavContainer>
      <DropdownOverlay
        className={activeDropdown ? 'active' : ''}
        onClick={handleClose}
      />
      <Container maxWidth="xl">
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <NavLink component={Link} to="/">
            Home
          </NavLink>
          <Box ref={productsRef}>
            <NavLink
              aria-label="Products"
              aria-haspopup="true"
              onClick={() => handleMenuClick('products')}
              onMouseEnter={()=> handleMenuClick('products')}
              endIcon={
                <ArrowIcon
                  sx={{
                    transform: activeDropdown === 'products' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }}
                />
              }
            >
              Products
            </NavLink>
            <Popper
              open={activeDropdown === 'products'}
              anchorEl={productsRef.current}
              placement="bottom-start"
              transition
              style={{ zIndex: 1300 }}
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}
                  onMouseLeave={() => handleClose()}>
                  <DropdownPaper
                  >
                    <ClickAwayListener
                      onClickAway={(event) => {
                        if (!productsRef.current?.contains(event.target)) {
                          handleClose();
                        }
                      }}
                    >
                      <Grid
                        container
                        spacing={4}
                        sx={{
                          width: '100vw',
                          maxWidth: '100%',
                          margin: 0,
                          padding: 3,
                          boxSizing: 'border-box'
                        }}
                      >
                        {['2.1', '2.2', '2.3'].map(k => (
                          <Grid item xs={12} sm={4} key={k}>
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              gutterBottom
                              sx={{ fontSize: '1.3rem' }}
                            >
                              {k} PAGE LINK HEADER
                            </Typography>
                            <Stack spacing={1.5}>
                              {[1, 2, 3].map(n => (
                                <Link
                                  key={n}
                                  to={`/products/${k}/${n}`}
                                  style={{
                                    textDecoration: 'none',
                                    color: theme.palette.text.primary
                                  }}
                                >
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      '&:hover': { color: theme.palette.primary.main },
                                      fontSize: '1.1rem',
                                      fontWeight: 500
                                    }}
                                  >
                                    {`${k}.${n}`}
                                  </Typography>
                                </Link>
                              ))}
                            </Stack>
                          </Grid>
                        ))}
                      </Grid>
                    </ClickAwayListener>
                  </DropdownPaper>
                </Grow>
              )}
            </Popper>
          </Box>
          <NavLink component={Link} to="/goods">
            Goods
          </NavLink>
          <NavLink component={Link} to="/about">
            About
          </NavLink>
          <NavLink component={Link} to="/contact">
            Contact
          </NavLink>
          <Box ref={categoriesRef}>
            <NavLink
              aria-label="Categories"
              aria-haspopup="true"
              onClick={() => handleMenuClick('categories')}
              onMouseEnter={() => handleMenuClick('categories')}
              endIcon={
                <ArrowIcon
                  sx={{
                    transform: activeDropdown === 'categories' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }}
                />
              }
            >
              Categories
            </NavLink>
            <Popper
              open={activeDropdown === 'categories'}
              anchorEl={categoriesRef.current}
              placement="bottom-start"
              transition
              style={{ zIndex: 1300 }}
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}
                onMouseLeave={() => handleClose()}
                >
                  <DropdownPaper
                  >
                    <ClickAwayListener
                      onClickAway={(event) => {
                        if (!categoriesRef.current?.contains(event.target)) {
                          handleClose();
                        }
                      }}
                    >
                      <Grid
                        container
                        spacing={3}
                        sx={{
                          width: '100vw',
                          maxWidth: '100%',
                          margin: 0,
                          padding: 2,
                          boxSizing: 'border-box'
                        }}
                      >
                        {['3.1', '3.2', '3.3'].map(k => (
                          <Grid item xs={12} sm={4} key={k}>
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              gutterBottom
                              sx={{ fontSize: '1.3rem' }}
                            >
                              {`${k} CATEGORY LINK HEADER`}
                            </Typography>
                            <Stack spacing={1.5}>
                              {[1, 2, 3].map(n => (
                                <Link
                                  key={n}
                                  to={`/categories/${k}/${n}`}
                                  style={{
                                    textDecoration: 'none',
                                    color: theme.palette.text.primary
                                  }}
                                >
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      '&:hover': { color: theme.palette.primary.main },
                                      fontSize: '1.1rem',
                                      fontWeight: 500
                                    }}
                                  >
                                    {`${k}.${n}`}
                                  </Typography>
                                </Link>
                              ))}
                            </Stack>
                          </Grid>
                        ))}
                      </Grid>
                    </ClickAwayListener>
                  </DropdownPaper>
                </Grow>
              )}
            </Popper>
          </Box>
        </Stack>
      </Container>
    </NavContainer>
  );
}
