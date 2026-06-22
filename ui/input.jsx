import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

/**
 * Input Component
 * @param {Object} props
 * @param {string} props.label - Floating or top label text
 * @param {string} [props.placeholder=''] - Placeholder text
 * @param {string} [props.type='text'] - HTML input type attribute
 * @param {string|number} props.value - Managed value of the input element
 * @param {function} props.onChange - Triggered when input text alters
 * @param {string} [props.error] - Appended validation error message string
 */
export const Input = ({
  label,
  placeholder = '',
  type = 'text',
  value,
  onChange,
  error,
  ...props
}) => {
  return (
    <div className={`input-container ${error ? 'has-error' : ''}`}>
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        className="ui-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};