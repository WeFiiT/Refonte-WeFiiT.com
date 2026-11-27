// Comportement de CarteCarrouselInfos : flèches, points avec trait de position et clavier du
// carrousel de photos (le défilement lui-même est natif, par scroll-snap). Port fidèle du
// script du bloc pages/culture/blocs/08-bureaux.html. Partagé par le site (src/comportements.ts,
// appelé sur chaque bloc de la page) et par le composant React (useEffect, dans Claude Design).
export const selecteur = '.wt-nos-bureaux';

export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wtb-init') === '1') return;
  root.setAttribute('data-wtb-init', '1');

  const car = root.querySelector<HTMLElement>('.wtb-carousel');
  const track = root.querySelector<HTMLElement>('.wtb-slides');
  if (!car || !track) return;
  const piste: HTMLElement = track;
  const slides = Array.from(piste.children) as HTMLElement[];
  const n = slides.length;
  // Une seule photo : ni flèches ni points (masqués par .is-single)
  if (n < 2) { car.classList.add('is-single'); return; }

  const prev = root.querySelector<HTMLElement>('.wtb-arrow-left')!;
  const next = root.querySelector<HTMLElement>('.wtb-arrow-right')!;
  const dotsBox = root.querySelector<HTMLElement>('.wtb-dots')!;
  const reduced = !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dots: HTMLButtonElement[] = [];

  // Pastilles : une par photo (boutons, nom lu par les lecteurs d'écran).
  slides.forEach((_s, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'wtb-dot';
    b.setAttribute('aria-label', 'Photo ' + (i + 1) + ' sur ' + n);
    b.appendChild(document.createElement('span'));
    b.addEventListener('click', () => { go(i); });
    dotsBox.appendChild(b);
    dots.push(b);
  });

  // La piste reçoit le focus clavier : flèches gauche/droite pour changer de photo. Son nom
  // accessible reprend celui du carrousel (« Photos du ... ») et ajoute la consigne.
  piste.setAttribute('tabindex', '0');
  piste.setAttribute('aria-label', (car.getAttribute('aria-label') ?? '') + ', utiliser les flèches pour changer de photo');

  function index(): number {
    const w = piste.clientWidth;
    return w ? Math.max(0, Math.min(n - 1, Math.round(piste.scrollLeft / w))) : 0;
  }
  function go(i: number): void {
    i = Math.max(0, Math.min(n - 1, i));
    piste.scrollTo({ left: i * piste.clientWidth, behavior: reduced ? 'auto' : 'smooth' });
  }
  let cur = 0;
  function update(): void {
    const i = index();
    cur = i;
    dots.forEach((d, k) => {
      d.classList.toggle('is-current', k === i);
      if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
    });
    prev.classList.toggle('is-visible', i > 0);
    next.classList.toggle('is-visible', i < n - 1);
  }

  prev.addEventListener('click', () => { go(index() - 1); });
  next.addEventListener('click', () => { go(index() + 1); });
  piste.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index() - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(index() + 1); }
  });

  let raf: number | null = null;
  piste.addEventListener('scroll', () => {
    if (raf) return;
    raf = window.requestAnimationFrame(() => { raf = null; update(); });
  }, { passive: true });

  // Changement de largeur : on reste calé sur la même photo.
  let w0 = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === w0) return;
    w0 = window.innerWidth;
    piste.scrollLeft = cur * piste.clientWidth;
    update();
  });

  update();
}
