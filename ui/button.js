/**
 * Button Component
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline'} [props.variant='primary'] - Visual style variant
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Size variation
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} props.text - Button label text
 * @param {function} [props.onClick] - Click event handler
 * @returns {HTMLButtonElement}
 */
export const Button = ({ variant = 'primary', size = 'md', disabled = false, text, onClick }) => {
  const btn = document.createElement('button');
  btn.className = `btn btn-${variant} btn-${size}`;
  btn.disabled = disabled;
  btn.innerText = text;
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
};