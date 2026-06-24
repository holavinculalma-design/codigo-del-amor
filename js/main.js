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


  // Diagnóstico rápido de relación
  const diagnosticBtn = document.getElementById('diagnosticBtn');
  const diagnosticResult = document.getElementById('diagnosticResult');
  if (diagnosticBtn && diagnosticResult) {
    diagnosticBtn.addEventListener('click', () => {
      const selected = Array.from(document.querySelectorAll('#loveDiagnostic input:checked')).map(el => el.value);
      let title = 'Empieza por reconectar paso a paso';
      let items = [
        'Lee el capítulo de comunicación efectiva.',
        'Usa el Bono 1 para abrir una conversación sincera.',
        'Agenda una cita sencilla del Bono 2 esta semana.'
      ];
      if (selected.includes('confianza')) {
        title = 'Tu relación necesita sanar y reconstruir confianza';
        items = ['Empieza por el Bono 3: Reconstruyendo la relación después del dolor.', 'Después usa las preguntas del Bono 1 para hablar sin atacar.', 'Cierra con un acuerdo pequeño y realista para esta semana.'];
      } else if (selected.includes('rutina')) {
        title = 'Tu relación necesita volver a crear momentos especiales';
        items = ['Empieza por el Bono 2: 30 ideas de citas románticas.', 'Elige una cita económica y sencilla.', 'Agrega un detalle pequeño que tu pareja no espere.'];
      } else if (selected.includes('comunicacion')) {
        title = 'Tu relación necesita comunicación más tranquila';
        items = ['Empieza por el capítulo de comunicación efectiva.', 'Haz una pregunta del Bono 1 sin interrumpir.', 'Acuerden una pausa si la conversación se calienta.'];
      } else if (selected.includes('intimidad')) {
        title = 'Tu relación necesita más cercanía emocional';
        items = ['Lee la parte de intimidad emocional y física.', 'Usa una cita romántica sencilla del Bono 2.', 'Vuelvan a hablar de lo que cada uno necesita para sentirse amado.'];
      }
      if (!selected.length) {
        title = 'Marca al menos una situación';
        items = ['Selecciona lo que más se parece a tu relación para recibir una recomendación.'];
      }
      diagnosticResult.innerHTML = `<h3>${title}</h3><p>Recomendación para iniciar hoy:</p><ul>${items.map(i => `<li>♡ ${i}</li>`).join('')}</ul><a class="btn btn--primary js-buy" href="https://www.paypal.com/ncp/payment/5SVQS9JZCKNDE" target="_blank" rel="noopener" style="margin-top:18px">Quiero el método completo</a>`;
    });
  }

});


// Notificaciones flotantes tipo compra reciente.
// Recomendación ética: reemplaza estos datos por compras reales cuando tengas ventas verificadas.
(function(){
  const popup = document.getElementById('purchasePopup');
  if(!popup) return;

  const nameEl = document.getElementById('purchaseName');
  const productEl = document.getElementById('purchaseProduct');
  const timeEl = document.getElementById('purchaseTime');

  const purchases = [
    { name: 'Daniela R. de Bogotá', product: 'compró El Código del Amor', time: 'Hace 2 minutos' },
    { name: 'Laura M. de Medellín', product: 'compró el libro + 3 bonos', time: 'Hace 2 minutos' },
    { name: 'Carlos A. de Cali', product: 'compró El Código del Amor', time: 'Hace 3 minutos' },
    { name: 'Paola S. de Pasto', product: 'compró el paquete completo', time: 'Hace 4 minutos' },
    { name: 'Miguel T. de Popayán', product: 'compró El Código del Amor', time: 'Hace 5 minutos' },
    { name: 'Andrea P. de Ciudad de México', product: 'compró el libro + 3 bonos', time: 'Hace 6 minutos' },
    { name: 'Sofía L. de Guatemala', product: 'compró El Código del Amor', time: 'Hace 7 minutos' },
    { name: 'Valentina C. de Barranquilla', product: 'compró el paquete completo', time: 'Hace 8 minutos' },
    { name: 'Mariana G. de Buenos Aires', product: 'compró El Código del Amor', time: 'Hace 9 minutos' },
    { name: 'Andrés F. de Pereira', product: 'compró el libro + 3 bonos', time: 'Hace 10 minutos' }
  ];

  let index = 0;

  function showPurchase(){
    const item = purchases[index];

    nameEl.textContent = item.name + ' acaba de comprar';
    productEl.textContent = item.product;
    timeEl.textContent = item.time;

    popup.classList.add('is-visible');

    setTimeout(() => {
      popup.classList.remove('is-visible');
    }, 5200);

    index = (index + 1) % purchases.length;
  }

  // Aparece por primera vez a los 2 segundos.
  setTimeout(showPurchase, 2000);

  // Luego va mostrando una notificación nueva cada 12 segundos.
  setInterval(showPurchase, 12000);
})();
