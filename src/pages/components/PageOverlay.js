import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { hideOverlay } from '../../redux/slices/uiSlice';
import OverlayModal from './OverlayModal';
const OverlayContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  backdropFilter: 'blur(5px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'opacity 0.2s ease, backdrop-filter 0.2s ease',
  opacity: 0,
  pointerEvents: 'none',
  visibility: 'hidden',
  '&.visible': {
    opacity: 1,
    pointerEvents: 'auto',
    visibility: 'visible',
  },
}));
const PageOverlay = () => {
  const dispatch = useDispatch();
  const { isVisible, content, position, zIndex, top } = useSelector(state => state.ui.overlay);
  const handleOverlayClick = () => {
    dispatch(hideOverlay());
  };
  const getPositionStyles = () => {
  if(top){
    return {top: top}
  }
    switch (position) {
      case 'top':
        return { alignItems: 'flex-start', paddingTop: '80px' };
      case 'bottom':
        return { alignItems: 'flex-end', paddingBottom: '80px' };
      case 'left':
        return { justifyContent: 'flex-start', paddingLeft: '80px' };
      case 'right':
        return { justifyContent: 'flex-end', paddingRight: '80px' };
      default:
        return { justifyContent: 'center', alignItems: 'center' };
    }
  };
  return (
    <OverlayContainer
      className={isVisible ? 'visible' : ''}
      onClick={handleOverlayClick}
      sx={{
        zIndex: zIndex || 1000,
        ...getPositionStyles()
      }}
    >
      {content && (
        <OverlayModal
          title={content.title}
          content={content.body}
          onClose={() => dispatch(hideOverlay())}
          linkTo={content.linkTo}
          actionText={content.actionText}
        />
      )}
    </OverlayContainer>
  );
};
export default PageOverlay;
