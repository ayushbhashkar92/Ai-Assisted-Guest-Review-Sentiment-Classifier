import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Add your styling here

/**
 * Button Component
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline'} [props.variant='primary'] - Visual style variant
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Size variation
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {function} [props.onClick] - Click event handler
 * @param {React.ReactNode} props.children - Button label or contents
 */
export const Button = ({ 
  variant = 'primary', 
  size = 'lg', 
  disabled = false, 
  onClick, 
  children,
  ...props 
}) => {
  const className = `btn btn-${variant} btn-${size}`;
  
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};