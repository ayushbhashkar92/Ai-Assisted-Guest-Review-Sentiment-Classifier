/**
 * Input Component
 * @param {Object} props
 * @param {string} [props.label] - Input label text
 * @param {string} [props.placeholder=''] - Placeholder text
 * @param {string} [props.type='text'] - HTML input type attribute
 * @param {string|number} [props.value=''] - Initial value of the input element
 * @param {function} [props.onChange] - Triggered when input text changes
 * @param {string} [props.error] - Appended validation error message string
 * @returns {HTMLDivElement}
 */
export const Input = ({ label, placeholder = '', type = 'text', value = '', onChange, error }) => {
  const container = document.createElement('div');
  container.className = `input-container ${error ? 'has-error' : ''}`;
  
  if (label) {
    const lbl = document.createElement('label');
    lbl.className = 'input-label';
    lbl.innerText = label;
    container.appendChild(lbl);
  }
  
  const input = document.createElement('input');
  input.type = type;
  input.className = 'ui-input';
  input.placeholder = placeholder;
  input.value = value;
  if (onChange) input.addEventListener('input', onChange);
  
  container.appendChild(input);
  
  if (error) {
    const errSpan = document.createElement('span');
    errSpan.className = 'input-error-msg';
    errSpan.innerText = error;
    container.appendChild(errSpan);
  }
  
  return container;
};