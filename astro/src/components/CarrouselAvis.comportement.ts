// Comportement de CarrouselAvis : points de pagination, un point par « page » de cartes
// visibles, recalculés au redimensionnement ; le point actif suit le défilement. Partagé par
// le site (src/comportements.ts, appelé sur chaque bloc de la page) et par le composant React
// (useEffect, dans Claude Design).
export const selecteur = '.wt-avis';
export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wt-init') === '1') return;
  root.setAttribute('data-wt-init', '1');
  const piste = root.querySelector<HTMLElement>('.wt-piste')!;
  const points = root.querySelector<HTMLElement>('.wt-points')!;
  const cartes = piste.querySelectorAll<HTMLElement>('.wt-carte');
  let pages = 0;

  const parPage = () => {
    const largeur = cartes[0]?.getBoundingClientRect().width || 1;
    return Math.max(1, Math.round(piste.clientWidth / largeur));
  };
  const actualiser = () => {
    const max = piste.scrollWidth - piste.clientWidth;
    const index = max > 0 ? Math.round((piste.scrollLeft / max) * (pages - 1)) : 0;
    points.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-selected', i === index ? 'true' : 'false'));
  };
  const construire = () => {
    pages = Math.ceil(cartes.length / parPage());
    points.innerHTML = '';
    points.hidden = pages <= 1;
    for (let i = 0; i < pages; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `Avis, page ${i + 1} sur ${pages}`);
      b.addEventListener('click', () => {
        const max = piste.scrollWidth - piste.clientWidth;
        piste.scrollTo({ left: pages > 1 ? (max * i) / (pages - 1) : 0, behavior: 'smooth' });
      });
      points.appendChild(b);
    }
    actualiser();
  };
  piste.addEventListener('scroll', () => window.requestAnimationFrame(actualiser), { passive: true });
  window.addEventListener('resize', construire);
  construire();
}
