const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3600);
}

document.querySelectorAll('[data-toast]').forEach((button) => {
  button.addEventListener('click', () => showToast(button.dataset.toast));
});

document.querySelectorAll('[data-dialog]').forEach((button) => {
  button.addEventListener('click', () => document.getElementById(button.dataset.dialog).showModal());
});

document.querySelectorAll('[data-close-dialog]').forEach((button) => {
  button.addEventListener('click', () => button.closest('dialog').close());
});

document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});

document.querySelectorAll('.choice').forEach((choice) => {
  choice.addEventListener('change', () => {
    choice.closest('.choice-form').querySelectorAll('.choice').forEach((item) => item.classList.remove('selected'));
    choice.classList.add('selected');
  });
});

document.querySelectorAll('[data-submit-message]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.closest('dialog').close();
    showToast(form.dataset.submitMessage);
  });
});

document.getElementById('tracking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const code = document.getElementById('tracking-number').value.trim();
  showToast(code ? `Showing the latest update for ${code}.` : 'Enter a tracking number to find your parcel.');
});

document.querySelector('.copy-button').addEventListener('click', async (event) => {
  const code = event.currentTarget.dataset.copy;
  try {
    await navigator.clipboard.writeText(code);
    showToast('Tracking number copied.');
  } catch {
    showToast(`Tracking number: ${code}`);
  }
});
