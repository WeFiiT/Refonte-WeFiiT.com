// Comportement de FaqAccordeon : secours « une seule question ouverte » pour les navigateurs
// sans <details name>, et ouverture de la question visée par l'ancre (#question-N) au
// chargement et quand l'ancre change. Partagé par le site (src/comportements.ts, appelé sur
// chaque bloc de la page) et par le composant React (useEffect, dans Claude Design).
export const selecteur = '.wt-faq';
export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wtq-init') === '1') return;
  root.setAttribute('data-wtq-init', '1');
  const items = Array.from(root.querySelectorAll<HTMLDetailsElement>('.wtq-item'));

  // Secours pour les navigateurs sans <details name> : ouvrir un item referme les autres.
  if (!('name' in document.createElement('details'))) {
    items.forEach((d) =>
      d.addEventListener('toggle', () => {
        if (d.open) items.forEach((o) => { if (o !== d) o.open = false; });
      }),
    );
  }

  // Ancre (#question-2, etc.) : la question visée est ouverte au chargement et quand l'ancre change.
  const ouvrirDepuisAncre = () => {
    let cible = '';
    try { cible = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const el = cible ? document.getElementById(cible) : null;
    if (el instanceof HTMLDetailsElement && root.contains(el)) {
      el.open = true;
      el.scrollIntoView({ block: 'start' });
    }
  };
  ouvrirDepuisAncre();
  window.addEventListener('hashchange', ouvrirDepuisAncre);
}
