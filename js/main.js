document.addEventListener('DOMContentLoaded', () => {
  const OFFER_SECONDS = 15 * 60; // Cambia aquí la duración del contador
  const OFFER_PRICE = 'US$14.99';
  const REAL_PRICE = 'US$70';
  const KEY = 'codigo_amor_offer_deadline_v1';

  let deadline = Number(localStorage.getItem(KEY));
  const now = Date.now();
  if (!deadline || deadline < now - 1000) {
    deadline = now + OFFER_SECONDS * 1000;
    localStorage.setItem(KEY, String(deadline));
  }

  const pad = (n) => String(n).padStart(2, '0');
  const hourNodes = document.querySelectorAll('[data-hours]');
  const minuteNodes = document.querySelectorAll('[data-minutes]');
  const secondNodes = document.querySelectorAll('[data-seconds]');
  const priceNodes = document.querySelectorAll('[data-live-price]');
  const buyButtons = document.querySelectorAll('.js-buy');

  function renderTimer() {
    const diff = Math.max(0, deadline - Date.now());
    const total = Math.floor(diff / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    hourNodes.forEach(el => el.textContent = pad(h));
    minuteNodes.forEach(el => el.textContent = pad(m));
    secondNodes.forEach(el => el.textContent = pad(s));

    if (total <= 0) {
      document.body.classList.add('expired');
      priceNodes.forEach(el => el.textContent = REAL_PRICE);
      buyButtons.forEach(btn => {
        btn.textContent = btn.textContent.includes('Comprar') ? 'Comprar al precio real' : 'Ver disponibilidad';
      });
    } else {
      priceNodes.forEach(el => el.textContent = OFFER_PRICE);
    }
  }

  renderTimer();
  setInterval(renderTimer, 1000);

  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));

  const faqs = document.querySelectorAll('.faq__list details');
  faqs.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) faqs.forEach(other => { if (other !== item) other.removeAttribute('open'); });
    });
  });
});
