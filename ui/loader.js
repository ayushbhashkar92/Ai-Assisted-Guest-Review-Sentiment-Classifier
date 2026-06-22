/**
 * Loader Component
 * @param {Object} props
 * @param {'spinner' | 'skeleton'} [props.variant='spinner'] - Functional presentation mode
 * @returns {HTMLDivElement}
 */
export const Loader = ({ variant = 'spinner' }) => {
  const wrapper = document.createElement('div');
  if (variant === 'spinner') {
    wrapper.className = 'spinner-wrapper';
    wrapper.innerHTML = `<div class="loading-spinner"></div>`;
  } else {
    wrapper.className = 'skeleton-wrapper';
    wrapper.innerHTML = `
      <div class="skeleton-bar skeleton-title"></div>
      <div class="skeleton-bar skeleton-body"></div>
      <div class="skeleton-bar skeleton-body short"></div>
    `;
  }
  return wrapper;
};