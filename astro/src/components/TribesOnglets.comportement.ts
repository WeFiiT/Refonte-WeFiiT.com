// Comportement de TribesOnglets : changement d'onglet, un seul panneau actif à la fois.
// Partagé par le site (src/comportements.ts, appelé sur chaque bloc de la page) et par le
// composant React (useEffect, dans Claude Design).
export const selecteur = '.wt-tribes';

export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wt-init') === '1') return;
  root.setAttribute('data-wt-init', '1');
  const tabs = root.querySelectorAll<HTMLElement>('.wt-tab');
  const panels = root.querySelectorAll<HTMLElement>('.wt-panel');
  const tabsBar = root.querySelector<HTMLElement>('.wt-tabs');
  // Empêche le navigateur de faire défiler la barre d'onglets de quelques px au chargement
  // (observé sur certains navigateurs mobiles), ce qui mangeait le padding gauche et
  // laissait un trou en croissant à côté du coin arrondi de la première pilule.
  if (tabsBar) tabsBar.scrollLeft = 0;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const index = tab.getAttribute('data-tab');
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      panels.forEach((p) => {
        p.classList.toggle('is-active', p.getAttribute('data-panel') === index);
      });
    });
  });
}
