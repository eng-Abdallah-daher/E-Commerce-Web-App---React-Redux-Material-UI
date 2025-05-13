import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { showOverlay, hideOverlay } from '../redux/slices/uiSlice';
export const useOverlay = () => {
  const dispatch = useDispatch();
  const showPageOverlay = useCallback((options = {}) => {
    document.body.style.overflow = 'hidden';
    dispatch(showOverlay({
      content: options.content || null,
      position: options.position || 'center',
      zIndex: options.zIndex || 1100,
      top: options.top || 0
    }));
  }, [dispatch]);
  const hidePageOverlay = useCallback(() => {
    document.body.style.overflow = '';
    dispatch(hideOverlay());
  }, [dispatch]);
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  return { showPageOverlay, hidePageOverlay };
};
