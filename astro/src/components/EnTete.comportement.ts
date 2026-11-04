// Comportement de EnTete : ouverture du menu burger (mobile) et des menus déroulants au clic
// (mobile, clavier), fermeture au clic en dehors. Partagé par le site (src/comportements.ts,
// appelé sur chaque bloc de la page) et par le composant React (useEffect, dans Claude Design).
export const selecteur = '.wt-entete';
export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wt-init') === '1') return;
  root.setAttribute('data-wt-init', '1');
  const burger = root.querySelector<HTMLElement>('.wt-burger')!;
  burger.addEventListener('click', () => {
    const ouvert = root.classList.toggle('is-menu-open');
    burger.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
  });
  // Menus déroulants : clic (mobile, clavier) ; au survol sur ordinateur, le CSS suffit.
  const menus = root.querySelectorAll<HTMLElement>('.wt-dd');
  const fermerTout = () =>
    menus.forEach((m) => {
      m.classList.remove('is-open');
      m.querySelector('.wt-toggle')?.setAttribute('aria-expanded', 'false');
    });
  menus.forEach((dd) => {
    const bouton = dd.querySelector<HTMLElement>('.wt-toggle')!;
    bouton.addEventListener('click', () => {
      const ouvrir = !dd.classList.contains('is-open');
      fermerTout();
      dd.classList.toggle('is-open', ouvrir);
      bouton.setAttribute('aria-expanded', ouvrir ? 'true' : 'false');
    });
  });
  document.addEventListener('click', (e) => {
    if (!root.contains(e.target as Node)) fermerTout();
  });
}
