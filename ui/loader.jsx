import React from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

/**
 * Loader Component
 * @param {Object} props
 * @param {'spinner' | 'skeleton'} [props.variant='spinner'] - Functional interface presentation mode
 */
export const Loader = ({ variant = 'spinner' }) => {
  return variant === 'spinner' ? (
    <div className="spinner-wrapper">
      <div className="loading-spinner"></div>
    </div>
  ) : (
    <div className="skeleton-wrapper">
      <div className="skeleton-bar skeleton-title"></div>
      <div className="skeleton-bar skeleton-body"></div>
      <div className="skeleton-bar skeleton-body short"></div>
    </div>
  );
};

Loader.propTypes = {
  variant: PropTypes.oneOf(['spinner', 'skeleton']),
};