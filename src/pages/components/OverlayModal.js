import React from 'react';
import { Box, Paper, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close as CloseIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
const ModalContainer = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: '90%',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[10],
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  zIndex: 2000,
}));
const OverlayModal = ({ title, content, onClose, linkTo, actionText }) => {
  return (
    <ModalContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton size="small" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ mb: 3 }}>
        {content}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        {linkTo && (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={linkTo}
            onClick={onClose}
          >
            {actionText || 'View'}
          </Button>
        )}
      </Box>
    </ModalContainer>
  );
};
export default OverlayModal;
