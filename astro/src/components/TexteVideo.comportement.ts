// Comportement de TexteVideo : façade vidéo. Au chargement, la vignette YouTube est insérée et le
// bouton lecture affiché (sans JavaScript, ou sans identifiant, « Vidéo à venir » reste affiché) ;
// l'iframe n'est créée qu'au clic. Partagé par le site (src/comportements.ts, appelé sur chaque
// bloc de la page) et par le composant React (useEffect, dans Claude Design).
import { creerLecteurYouTube, vignetteYouTube } from './facadeVideo';

export const selecteur = '.wte-women';

export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wtv-init') === '1') return;
  root.setAttribute('data-wtv-init', '1');

  root.querySelectorAll<HTMLElement>('.wte-video').forEach((box) => {
    const id = (box.getAttribute('data-yt-id') || '').trim();
    const btn = box.querySelector<HTMLElement>('.wte-play');
    const placeholder = box.querySelector<HTMLElement>('.wte-video-placeholder');
    if (!id || !btn) return;
    const poster = document.createElement('img');
    poster.className = 'wte-poster';
    poster.alt = '';
    poster.loading = 'lazy';
    poster.src = vignetteYouTube(id);
    box.insertBefore(poster, btn);
    if (placeholder) placeholder.hidden = true;
    btn.hidden = false;
    btn.addEventListener('click', () => {
      // titre du lecteur : attribut data-yt-title, à défaut le libellé du bouton
      const iframe = creerLecteurYouTube(id, box.getAttribute('data-yt-title') || btn.getAttribute('aria-label') || '');
      box.textContent = '';
      box.appendChild(iframe);
      iframe.focus(); // le bouton disparaît : le focus passe sur le lecteur
    });
  });
}
