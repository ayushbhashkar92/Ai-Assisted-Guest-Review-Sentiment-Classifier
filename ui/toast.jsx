import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Toast.css';

/**
 * Toast Component
 * @param {Object} props
 * @param {string} props.message - Banner text notice
 * @param {number} [props.duration=3000] - Lifespan in milliseconds
 * @param {function} props.onClose - Auto-fires cleanup after expiration
 */
export const Toast = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!message) return null;

  return (
    <div className="toast-notification">
      <p>{message}</p>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};