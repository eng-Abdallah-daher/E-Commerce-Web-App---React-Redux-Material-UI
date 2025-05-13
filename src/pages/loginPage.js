import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Divider,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  useTheme,
  alpha,
  styled
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material';
import { authenticate } from './utils/loginFunctions';
import { loginSuccess } from '../redux/slices/userSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlistAction } from '../redux/slices/wishlistSlice';
import Navbar from './components/Navbar';
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
}));
const LoginSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  padding: theme.spacing(4, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 4),
  },
}));
const LoginContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const LoginGrid = styled(Grid)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
}));
const LoginFormContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(6, 4),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 2),
  },
}));
const LoginImageContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));
const LoginImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: 'url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.2,
}));
const LoginLogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(6),
  '& svg': {
    fontSize: 36,
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));
const LoginHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
}));
const LoginSubheader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.text.secondary,
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius * 1.5,
    transition: theme.transitions.create(['box-shadow']),
    '&:hover': {
      boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.25)}`,
    },
    '&.Mui-focused': {
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.35)}`,
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.9rem',
  },
  '& .MuiInputAdornment-root': {
    '& .MuiSvgIcon-root': {
      color: theme.palette.text.secondary,
    },
  },
}));
const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 0),
  borderRadius: theme.shape.borderRadius * 1.5,
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: theme.transitions.create(['transform', 'box-shadow']),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await authenticate(email, password);
      if (result.success) {
        const userData = result.user;
        dispatch(loginSuccess(userData));
        if (userData.cartitems && userData.cartitems.length > 0) {
          userData.cartitems.forEach(item => {
            dispatch(addToCart({ item, quantity: item.quantity || 1 }));
          });
        }
        if (userData.wishlist && userData.wishlist.length > 0) {
          userData.wishlist.forEach(index => {
            dispatch(addToWishlistAction(index));
          });
        }
        navigate('/');
      } else {
        setError('Invalid email or password');
        setShowError(true);
      }
    } catch (err) {
      setError('An error occurred during login');
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCloseError = () => {
    setShowError(false);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const chooseSuggest = (idx) => {
    navigate(`/products?id=${idx}`);
  };
  return (
    <PageContainer>
      <Navbar chooseSuggest={chooseSuggest} />
      <LoginSection>
        <LoginContainer maxWidth="lg">
          <LoginGrid container>
            <LoginFormContainer item xs={12} md={6}>
              <LoginLogo>
                <ShoppingBagIcon />
                <Typography variant="h5" fontWeight="bold">MY SHOP</Typography>
              </LoginLogo>
              <LoginHeader variant="h4">
                Welcome Back
              </LoginHeader>
              <LoginSubheader variant="body1">
                Please sign in to continue shopping
              </LoginSubheader>
              <form onSubmit={handleLogin}>
                <StyledTextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledTextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="body2">Remember me</Typography>}
                  />
                  <Typography
                    variant="body2"
                    component={Link}
                    to="#"
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Box>
                <SubmitButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </SubmitButton>
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="textSecondary">
                    Don't have an account?{' '}
                    <Typography
                      component={Link}
                      to="#"
                      variant="body2"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: 'none',
                        fontWeight: 600,
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Sign Up
                    </Typography>
                  </Typography>
                </Box>
                <Box sx={{ mt: 4 }}>
                  <Divider>
                    <Typography variant="body2" color="textSecondary" sx={{ px: 1 }}>
                      Or continue with
                    </Typography>
                  </Divider>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                          py: 1,
                          borderRadius: theme.shape.borderRadius * 1.5,
                          textTransform: 'none'
                        }}
                      >
                        Google
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                          py: 1,
                          borderRadius: theme.shape.borderRadius * 1.5,
                          textTransform: 'none'
                        }}
                      >
                        Facebook
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </LoginFormContainer>
            <LoginImageContainer item xs={12} md={6}>
              <LoginImageOverlay />
              <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 400 }}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                  Discover Amazing Products
                </Typography>
                <Typography variant="h6" paragraph>
                  Shop the latest trends and find exclusive deals on our platform
                </Typography>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  sx={{
                    mt: 2,
                    borderRadius: theme.shape.borderRadius * 1.5,
                    borderWidth: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      borderWidth: 2,
                    }
                  }}
                  component={Link}
                  to="/"
                >
                  Browse Collection
                </Button>
              </Box>
            </LoginImageContainer>
          </LoginGrid>
        </LoginContainer>
      </LoginSection>
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};
export default Login;
