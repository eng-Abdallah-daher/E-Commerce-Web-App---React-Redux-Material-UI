import React from 'react';
import { useKeyboardAccessible } from '../hooks/useKeyboardAccessible';
const KeyboardAccessible = ({
  onClick,
  children,
  role = 'button',
  tabIndex = 0,
  ariaLabel,
  ...props
}) => {
  const ref = useKeyboardAccessible(onClick);
  return (
    <div
      ref={ref}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </div>
  );
};
export default KeyboardAccessible;
