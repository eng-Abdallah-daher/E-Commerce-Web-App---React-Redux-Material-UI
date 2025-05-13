import { useCallback, useEffect, useRef } from 'react';
export const useKeyboardAccessible = (onClick) => {
  const ref = useRef(null);
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(event);
    }
  }, [onClick]);
  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('keydown', handleKeyDown);
      if (!element.getAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
      if (!element.getAttribute('role')) {
        element.setAttribute('role', 'button');
      }
      return () => {
        element.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleKeyDown]);
  return ref;
};
