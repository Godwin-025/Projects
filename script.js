const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3600);
}

const dialogButtons = document.querySelectorAll('[data-dialog]');
dialogButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.dialog);
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  });
});

document.querySelectorAll('[data-close-dialog]').forEach((button) => {
  button.addEventListener('click', () => {
    const dialog = button.closest('dialog');
    if (dialog) dialog.close();
  });
});

document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});

document.querySelectorAll('.choice').forEach((choice) => {
  choice.addEventListener('change', () => {
    const form = choice.closest('.choice-form');
    if (!form) return;
    form.querySelectorAll('.choice').forEach((item) => item.classList.remove('selected'));
    choice.classList.add('selected');
  });
});

document.querySelectorAll('[data-toast]').forEach((button) => {
  button.addEventListener('click', () => showToast(button.dataset.toast));
});

document.querySelectorAll('[data-submit-message]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const dialog = form.closest('dialog');
    if (dialog) dialog.close();
    showToast(form.dataset.submitMessage);
  });
});

const trackingForm = document.getElementById('tracking-form');
if (trackingForm) {
  trackingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.getElementById('tracking-number');
    const code = input ? input.value.trim() : '';
    showToast(code ? `Showing the latest update for ${code}.` : 'Enter a tracking number to find your parcel.');
  });
}

document.querySelectorAll('.copy-button').forEach((button) => {
  button.addEventListener('click', async (event) => {
    const code = event.currentTarget.dataset.copy;
    try {
      await navigator.clipboard.writeText(code);
      showToast('Tracking number copied.');
    } catch {
      showToast(code ? `Tracking number: ${code}` : 'Copy failed.');
    }
  });
});
