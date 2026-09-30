const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    let value = 0;
    const step = Math.max(1, Math.ceil(target / 24));
    const tick = () => {
      value += step;
      if (value >= target) { el.textContent = target; return; }
      el.textContent = value;
      requestAnimationFrame(tick);
    };
    tick();
    observer.unobserve(el);
  });
}, {threshold:.7});
counters.forEach(el => counterObserver.observe(el));

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

const modal = document.getElementById('galleryModal');
const modalTitle = document.getElementById('modalTitle');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    modalTitle.textContent = item.dataset.title.toUpperCase();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});
document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  if (glow) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }
});

document.getElementById('bookingForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const subject = `Réservation FLUFFY PLANET — ${data.get('activity')}`;
  const body = [
    `Nom : ${data.get('name')}`,
    `Téléphone : ${data.get('phone')}`,
    `Activité : ${data.get('activity')}`,
    `Nombre de personnes : ${data.get('people') || 'Non précisé'}`,
    '',
    `Message : ${data.get('message') || ''}`
  ].join('\n');
  window.location.href = `mailto:hello@fluffypanet.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
