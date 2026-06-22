import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

/**
 * Modal Component with Focus Trapping and Escape listener
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls active visible state
 * @param {function} props.onClose - Triggers on close request (Escape/backdrop)
 * @param {string} props.title - Top heading text string
 * @param {React.ReactNode} props.children - Inner payload layout element
 */
export const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus Trapping
  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const trapFocus = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    if (firstElement) firstElement.focus();
    
    window.addEventListener('keydown', trapFocus);
    return () => window.removeEventListener('keydown', trapFocus);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};