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

  // Une question à l'intérieur d'un volet fraîchement ouvert n'a pas encore sa place dans la mise en page : un
  // scrollIntoView immédiat ne défile pas (mesuré dans Chrome : il faut attendre le premier rendu du volet ouvert,
  // environ 50 ms). On réessaie donc tant que la page n'a pas bougé, quelques fois seulement.
  const defilerVers = (el: HTMLElement, essais = 6) => {
    const y = window.scrollY;
    el.scrollIntoView({ block: 'start' });
    if (essais > 0) window.setTimeout(() => { if (window.scrollY === y) defilerVers(el, essais - 1); }, 50);
  };

  // Ancre (#question-2, #faq-onboarding, etc.) : le volet visé, ou qui contient l'élément visé (question d'une
  // rubrique), est ouvert au chargement et quand l'ancre change.
  const ouvrirDepuisAncre = () => {
    let cible = '';
    try { cible = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const el = cible ? document.getElementById(cible) : null;
    if (!el || !root.contains(el)) return;
    const volet = el instanceof HTMLDetailsElement ? el : el.closest('details');
    if (volet) {
      volet.open = true;
      // Le volet lui-même défile tout de suite, comme avant.
      if (el === volet) el.scrollIntoView({ block: 'start' });
      else defilerVers(el);
    }
  };
  ouvrirDepuisAncre();
  window.addEventListener('hashchange', ouvrirDepuisAncre);
}
