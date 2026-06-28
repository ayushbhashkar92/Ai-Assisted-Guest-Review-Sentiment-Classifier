import { Button, Input, Modal, Toast, Loader } from '../ui/index.js';

// Point this to your live local backend URL
const API_URL = 'http://localhost:5000/api';

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

  // Update navigation button active states manually to follow changes
  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('onclick')?.includes(pageId)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// THE FIX: Expose showPage globally to match your exact index.html template configurations!
window.showPage = showPage;
// Adding fallback alias just in case index.html links to navigateTo
window.navigateTo = showPage;

// --------------------------------------------------
// CORE FUNCTION: Fetch and render live guest reviews
// --------------------------------------------------
async function fetchReviewsFromBackend() {
  const gridContainer = document.querySelector('.grid');
  if (!gridContainer) return;

  try {
    gridContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666;">Loading live review dataset...</p>`;
    
    const response = await fetch(`${API_URL}/reviews`);
    if (!response.ok) throw new Error("Server responded with an error status.");
    
    const reviews = await response.json();
    gridContainer.innerHTML = ''; // Clear loading screen
    
    reviews.forEach(review => {
      gridContainer.innerHTML += `
        <div class="card">
          <div class="card-img" style="text-transform: uppercase;">${review.theme}</div>
          <div class="card-body">
            <h3>${review.guest}</h3>
            <p style="margin: 5px 0; font-size: 12px; color: ${review.sentiment === 'positive' ? 'green' : 'red'}; font-weight: bold;">
              Sentiment: ${review.sentiment}
            </p>
            <p>${review.comment}</p>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error("Connection Error:", error);
    gridContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: red; padding: 20px; border: 1px dashed red; background: #fff5f5; border-radius: 8px;">
        <strong>Connection Error:</strong> Could not pull data from the local backend pipeline. Make sure your Node server is running on port 5000!
      </div>
    `;
  }
}

// Initialize components when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Fire off API fetch routine for Home component immediately 
  fetchReviewsFromBackend();

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
  
  const loadingBar = Loader({ variant: 'skeleton' });
  dataArea.appendChild(loadingBar);

  setTimeout(() => {
    loadingBar.remove(); 

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