/**
 * Toast Notification Component
 * @param {Object} props
 * @param {string} props.message - Banner text notice
 * @param {number} [props.duration=3000] - Lifespan in milliseconds
 */
export const Toast = ({ message, duration = 3000 }) => {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `<p>${message}</p>`;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, duration);
};