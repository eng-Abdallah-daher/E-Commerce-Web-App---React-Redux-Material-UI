import React from 'react';
export const withKeyboardAccessibility = (WrappedComponent) => {
  const WithKeyboardAccessibility = (props) => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (props.onClick) {
          props.onClick(event);
        }
      }
    };
    return (
      <WrappedComponent
        {...props}
        onKeyDown={handleKeyDown}
        tabIndex={props.tabIndex || 0}
        role={props.role || 'button'}
      />
    );
  };
  WithKeyboardAccessibility.displayName = `WithKeyboardAccessibility(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;
  return WithKeyboardAccessibility;
};
export default withKeyboardAccessibility;
