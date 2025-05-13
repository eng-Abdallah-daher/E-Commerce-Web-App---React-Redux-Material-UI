import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  IconButton,
  Button,
  Avatar,
  Tooltip,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { selectCurrentUser } from '../../redux/slices/userSlice';
function UserGreeting() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const currentUser = useSelector(selectCurrentUser);
  const userName = currentUser?.name || '';
  if (!userName || userName.length === 0) {
    return (
      <Tooltip title="Login">
        <IconButton
          color="inherit"
          component={Link}
          to="/login"
          aria-label="login"
          size={isMobile ? "small" : "medium"}
        >
          <PersonIcon />
        </IconButton>
      </Tooltip>
    );
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {isMobile ? (
        <Tooltip title={`Hi, ${userName}`}>
          <IconButton
            component={Link}
            to="/account?data=profileinfo"
            color="inherit"
            aria-label="account"
            size="small"
          >
            {currentUser?.userimage ? (
              <Avatar 
                src={currentUser.userimage} 
                alt={userName}
                sx={{ width: 24, height: 24 }}
              />
            ) : (
              <Avatar 
                sx={{ 
                  width: 24, 
                  height: 24, 
                  bgcolor: 'secondary.main',
                  color: 'secondary.contrastText',
                  fontSize: '0.75rem'
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          component={Link}
          to="/account?data=profileinfo"
          color="inherit"
          startIcon={
            currentUser?.userimage ? (
              <Avatar 
                src={currentUser.userimage} 
                alt={userName}
                sx={{ width: 24, height: 24 }}
              />
            ) : (
              <Avatar 
                sx={{ 
                  width: 24, 
                  height: 24, 
                  bgcolor: 'secondary.main',
                  color: 'secondary.contrastText',
                  fontSize: '0.75rem'
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            )
          }
          sx={{ 
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Hi, {userName}
        </Button>
      )}
    </Box>
  );
}
export default UserGreeting;
