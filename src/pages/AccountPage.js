import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Person as PersonIcon,
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  ExitToApp as LogoutIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import Navbar from './components/Navbar';
import ConfirmDialog from './components/ConfirmDialog';
import { logout } from './utils/loginFunctions';
import ProfileInfo from './components/profileInfo';
import AddressInfo from './components/addressinfo';
import WishlistInfo from './components/wishlistinfo';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Content() {
  const query = useQuery();
  const data = query.get('data');

  if (data === 'profileinfo') return <ProfileInfo />;
  if (data === 'addressinfo') return <AddressInfo />;
  if (data === 'wishlist') return <WishlistInfo />;

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      flexDirection: 'column',
      p: 3
    }}>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Welcome to Your Account
      </Typography>
      <Typography variant="body1">
        Select a section from the menu to get started
      </Typography>
    </Box>
  );
}

function AccountNav() {
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { key: 'profileinfo', label: 'Profile Info', icon: <PersonIcon /> },
    { key: 'addressinfo', label: 'Address Info', icon: <HomeIcon /> },
    { key: 'wishlist', label: 'Wishlist', icon: <FavoriteIcon /> }
  ];

  const activeKey = new URLSearchParams(location.search).get('data');

  const goTo = (key) => {
    navigate(`/account?data=${key}`);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: '100%',
        width: isMobile ? '100%' : 280,
        overflow: 'auto',
        borderRadius: 2
      }}
    >
      <ConfirmDialog
        message="Do you want to log out?"
        onConfirm={logout}
        title="Log out"
        onCancel={() => setShowConfirmLogout(false)}
        show={showConfirmLogout}
      />

      {isMobile ? (
        <Box sx={{ p: 2 }}>
          {navLinks.map(link => (
            <Accordion key={link.key} disableGutters>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: activeKey === link.key ?
                    theme.palette.primary.light : 'transparent',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {link.icon}
                  <Typography sx={{ ml: 1 }}>{link.label}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Button
                  fullWidth
                  onClick={() => goTo(link.key)}
                  variant="outlined"
                  startIcon={<ChevronRightIcon />}
                >
                  Go to {link.label}
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}

          <Button
            fullWidth
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={() => setShowConfirmLogout(true)}
            sx={{ mt: 2 }}
          >
            Sign out
          </Button>
        </Box>
      ) : (
        <List component="nav" sx={{ p: 0 }}>
          {navLinks.map(link => (
            <React.Fragment key={link.key}>
              <ListItem
                button
                onClick={() => goTo(link.key)}
                selected={activeKey === link.key}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.light,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.light
                    }
                  }
                }}
              >
                <ListItemIcon>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.label} />
                <ChevronRightIcon />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}

          <ListItem
            button
            onClick={() => setShowConfirmLogout(true)}
            sx={{
              mt: 2,
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: theme.palette.error.light,
                color: theme.palette.error.contrastText
              }
            }}
          >
            <ListItemIcon>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
      )}
    </Paper>
  );
}

export default function AccountPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const chooseSuggest = idx => {
    navigate(`/products?id=${idx}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar chooseSuggest={chooseSuggest} />

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <Grid container spacing={3} sx={{ height: '100%' }}>
          <Grid item xs={12} md={3}>
            <AccountNav />
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper
              elevation={3}
              sx={{
                height: '100%',
                p: 3,
                borderRadius: 2,
                minHeight: 400
              }}
            >
              <Content />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: 'center',
          backgroundColor: theme.palette.grey[100]
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Your Company
        </Typography>
      </Box>
    </Box>
  );
}