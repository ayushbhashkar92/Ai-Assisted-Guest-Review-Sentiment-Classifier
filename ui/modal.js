/**
 * Modal Component with Focus Trapping and Escape listener
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls active visible state
 * @param {function} props.onClose - Triggers on close request
 * @param {string} props.title - Top heading text string
 * @param {HTMLElement} props.contentElement - Inner DOM element layout
 * @returns {HTMLDivElement|null}
 */
export const Modal = ({ isOpen, onClose, title, contentElement }) => {
  if (!isOpen) return null;

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  
  const content = document.createElement('div');
  content.className = 'modal-content';
  content.setAttribute('role', 'dialog');
  content.setAttribute('aria-modal', 'true');
  
  const header = document.createElement('div');
  header.className = 'modal-header';
  header.innerHTML = `<h3>${title}</h3>`;
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal-close-btn';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', onClose);
  header.appendChild(closeBtn);
  
  const body = document.createElement('div');
  body.className = 'modal-body';
  body.appendChild(contentElement);
  
  content.appendChild(header);
  content.appendChild(body);
  backdrop.appendChild(content);
  
  // Close on background backdrop click
  backdrop.addEventListener('click', (e) => { 
    if (e.target === backdrop) onClose(); 
  });
  
  // Close on Escape Key & Clean listener up
  const keyListener = (e) => { 
    if (e.key === 'Escape') { 
      onClose(); 
      window.removeEventListener('keydown', keyListener); 
    }
  };
  window.addEventListener('keydown', keyListener);

  // Focus Trapping Logic
  setTimeout(() => {
    const focusableElements = content.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];
      firstEl.focus();

      content.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            lastEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastEl) {
            firstEl.focus();
            e.preventDefault();
          }
        }
      });
    }
  }, 0);

  return backdrop;
};