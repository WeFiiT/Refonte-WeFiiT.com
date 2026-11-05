// Comportement de CadrePrincipes : apparition des points au défilement (fondu + glissement),
// un par un avec un léger décalage. Sans IntersectionObserver, tous les points sont affichés
// d'emblée. Partagé par le site (src/comportements.ts, appelé sur chaque bloc de la page) et
// par le composant React (useEffect, dans Claude Design).
export const selecteur = '.wt-cadrec';

export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wtc-init') === '1') return;
  root.setAttribute('data-wtc-init', '1');

  const items = root.querySelectorAll<HTMLElement>('.wt-item');

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  items.forEach((item, i) => {
    item.style.transitionDelay = i * 0.08 + 's';
    observer.observe(item);
  });
}
