import { Button, Input, Modal, Toast, Loader } from './components/ui/index.js';

// Page switcher logic
function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(page => {
    page.classList.remove("active");
  });
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add("active");
  }
}

// Expose routing globally to map your HTML elements inline onclick configurations
window.showPage = showPage;

document.addEventListener("DOMContentLoaded", () => {
  
  // --------------------------------------------------
  // 1. HOME PAGE BUTTON MOUNT
  // --------------------------------------------------
  const heroContainer = document.getElementById('hero-action-container');
  if (heroContainer) {
    const analyzeBtn = Button({
      variant: 'primary',
      size: 'lg',
      text: 'Analyze Reviews Now',
      onClick: () => {
        Toast({ message: 'Spinning up AI NLP Models...' });
        showPage('dashboard');
        triggerDashboardMockLoading();
      }
    });
    heroContainer.appendChild(analyzeBtn);
  }

  // --------------------------------------------------
  // 2. LOGIN FORM ASSEMBLY
  // --------------------------------------------------
  const formContainer = document.getElementById('login-form-container');
  if (formContainer) {
    const emailField = Input({
      label: 'Administrator Security Email',
      placeholder: 'operator@chopta-homestays.com',
      type: 'email'
    });

    const submitBtn = Button({
      variant: 'primary',
      size: 'md',
      text: 'Authenticate Access',
      onClick: () => {
        Toast({ message: 'Success! Welcome back, Admin.' });
        showPage('dashboard');
        triggerDashboardMockLoading();
      }
    });

    formContainer.appendChild(emailField);
    formContainer.appendChild(submitBtn);
  }
});

// --------------------------------------------------
  // 3. DASHBOARD INTERACTIVE ACTIONS & SIMULATION
  // --------------------------------------------------
function triggerDashboardMockLoading() {
  const dataArea = document.getElementById('dashboard-content-area');
  if (!dataArea) return;

  dataArea.innerHTML = ''; // Clear prior render metrics
  
  // Create and append the skeleton structural loader variant
  const loadingBar = Loader({ variant: 'skeleton' });
  dataArea.appendChild(loadingBar);

  setTimeout(() => {
    loadingBar.remove(); // Drop structural template

    const reportCard = document.createElement('div');
    reportCard.style.padding = '20px';
    reportCard.style.background = '#fff';
    reportCard.style.borderRadius = '8px';
    reportCard.innerHTML = `
      <h4>Chopta Homestay Core Metrics Overview</h4>
      <p style="margin: 10px 0;">Sentiment Trends: <strong>88% Positive</strong> (Tungnath proximity highlighted!)</p>
    `;

    const openModalBtn = Button({
      variant: 'outline',
      size: 'sm',
      text: 'View Deep Log Breakdown',
      onClick: () => {
        const structuralLayout = document.createElement('div');
        structuralLayout.innerHTML = `
          <p style="margin-bottom:12px;">Top positive mentions focus heavily on availability of geysers/hot water bags during cold periods.</p>
        `;

        const closeModalAction = Button({
          variant: 'secondary',
          size: 'sm',
          text: 'Dismiss Sheet',
          onClick: () => activeModal.remove()
        });
        structuralLayout.appendChild(closeModalAction);

        const activeModal = Modal({
          isOpen: true,
          title: 'Review Vector Logs',
          contentElement: structuralLayout,
          onClose: () => activeModal.remove()
        });

        document.body.appendChild(activeModal);
      }
    });

    reportCard.appendChild(openModalBtn);
    dataArea.appendChild(reportCard);
  }, 1200);
}