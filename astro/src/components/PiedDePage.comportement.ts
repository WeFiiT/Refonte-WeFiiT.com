// Comportement de PiedDePage : le lien « Cookies » ouvre le bandeau Axeptio s'il est chargé
// (c'est le cas sur wefiit.com). Partagé par le site (src/comportements.ts, appelé sur chaque
// bloc de la page) et par le composant React (useEffect, dans Claude Design).
// Sélecteur restreint à footer.wt-pied : CarrouselAvis utilise aussi la classe .wt-pied
// (sur ses <figcaption>), qu'il ne faut pas initialiser ici.
export const selecteur = 'footer.wt-pied';
export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wt-init') === '1') return;
  root.setAttribute('data-wt-init', '1');
  root.querySelectorAll<HTMLElement>('.wt-cookies').forEach((lien) => {
    lien.addEventListener('click', (e) => {
      e.preventDefault();
      const w = window as unknown as { openAxeptioCookies?: () => void };
      w.openAxeptioCookies?.();
    });
  });
}
