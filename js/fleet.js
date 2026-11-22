/**
 * Fleet Module
 * Category filtering and accessible vehicle detail modal.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Category Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const fleetCards = document.querySelectorAll('.fleet-card-item');

  if (filterButtons.length && fleetCards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active button toggle
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        fleetCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = '';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // 2. Vehicle Detail Modal Logic
  const modalOverlay = document.getElementById('vehicleModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const openModalButtons = document.querySelectorAll('.view-vehicle-btn');

  // Modal element placeholders
  const modalTitle = document.getElementById('modalVehicleTitle');
  const modalCategory = document.getElementById('modalVehicleCategory');
  const modalPassengers = document.getElementById('modalVehiclePassengers');
  const modalLuggage = document.getElementById('modalVehicleLuggage');
  const modalJourney = document.getElementById('modalVehicleJourney');
  const modalDesc = document.getElementById('modalVehicleDesc');
  const modalPlaceholderName = document.getElementById('modalPlaceholderName');
  const modalVehicleImg = document.getElementById('modalVehicleImg');

  let lastActiveElement = null;

  const openModal = (vehicleData) => {
    if (!modalOverlay) return;
    lastActiveElement = document.activeElement;

    if (modalTitle) modalTitle.textContent = vehicleData.name || 'Executive Vehicle';
    if (modalCategory) modalCategory.textContent = vehicleData.category || 'Executive Class';
    if (modalPassengers) modalPassengers.textContent = vehicleData.passengers || 'Illustrative: 3-4 Passengers';
    if (modalLuggage) modalLuggage.textContent = vehicleData.luggage || 'Illustrative: 2-3 Suitcases';
    if (modalJourney) modalJourney.textContent = vehicleData.journey || 'Airport & Corporate Transfers';
    if (modalDesc) modalDesc.textContent = vehicleData.desc || 'Premium automotive standard offering quiet ride quality, refined interior appointments, and dedicated luggage space.';
    if (modalPlaceholderName) modalPlaceholderName.textContent = vehicleData.imageFile || 'vehicle-spec-demo.jpg';
    if (modalVehicleImg && vehicleData.imageFile) {
      modalVehicleImg.src = vehicleData.imageFile;
      modalVehicleImg.alt = vehicleData.name || 'Vehicle profile';
    }

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (modalCloseBtn) modalCloseBtn.focus();
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  };

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const vehicleData = {
        name: btn.getAttribute('data-name'),
        category: btn.getAttribute('data-category-label'),
        passengers: btn.getAttribute('data-passengers'),
        luggage: btn.getAttribute('data-luggage'),
        journey: btn.getAttribute('data-journey'),
        desc: btn.getAttribute('data-desc'),
        imageFile: btn.getAttribute('data-image-file')
      };
      openModal(vehicleData);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
});
