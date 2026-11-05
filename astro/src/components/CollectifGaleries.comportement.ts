// Comportement de CollectifGaleries : flèches des galeries, vignettes YouTube (iframe créée
// au clic) et onglets des catégories. Partagé par le site (src/comportements.ts, appelé sur
// chaque bloc de la page) et par le composant React (useEffect, dans Claude Design).
export const selecteur = '.wt-collectif';

export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wtc-init') === '1') return;
  root.setAttribute('data-wtc-init', '1');

  // Flèches : font défiler d'une carte (+ l'écart entre cartes) à chaque clic,
  // en bornant toujours la position cible entre 0 et le scroll maximum pour ne
  // jamais dépasser la dernière carte (zones blanches en bout de course).
  // La flèche gauche reste masquée tant qu'on n'a pas commencé à défiler, la
  // flèche droite se masque une fois arrivé au bout (et les deux restent
  // masquées si tout tient déjà dans la largeur visible).
  const scrollerWraps: { wrap: HTMLElement; update: () => void }[] = [];
  root.querySelectorAll<HTMLElement>('.wtc-scroller-wrap').forEach((wrap) => {
    const scroller = wrap.querySelector<HTMLElement>('.wtc-scroller')!;
    const track = wrap.querySelector<HTMLElement>('.wtc-track')!;
    const firstCard = track.querySelector<HTMLElement>('.wtc-card')!;
    const leftArrow = wrap.querySelector<HTMLElement>('.wtc-arrow-left')!;
    const rightArrow = wrap.querySelector<HTMLElement>('.wtc-arrow-right')!;

    function updateArrows() {
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      leftArrow.classList.toggle('is-visible', scroller.scrollLeft > 4);
      rightArrow.classList.toggle('is-visible', scroller.scrollLeft < maxScroll - 4);
    }

    function scrollByCard(dir: number) {
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const amount = (firstCard.getBoundingClientRect().width + gap) * dir;
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      const target = Math.min(Math.max(scroller.scrollLeft + amount, 0), maxScroll);
      scroller.scrollTo({ left: target, behavior: 'smooth' });
    }

    leftArrow.addEventListener('click', () => scrollByCard(-1));
    rightArrow.addEventListener('click', () => scrollByCard(1));
    scroller.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    updateArrows();

    scrollerWraps.push({ wrap, update: updateArrows });
  });

  // Vignettes YouTube : voir le commentaire CSS sur .wtc-media pour le
  // pourquoi (miniature basse résolution servie par le lecteur YouTube sur
  // un petit conteneur). On ne crée l'iframe (avec autoplay) qu'au clic.
  root.querySelectorAll<HTMLElement>('.wtc-media[data-yt-id]').forEach((media) => {
    const play = media.querySelector<HTMLElement>('.wtc-play');
    if (!play) return;
    play.addEventListener('click', () => {
      const id = media.getAttribute('data-yt-id');
      const title = media.getAttribute('data-yt-title') || '';
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1';
      iframe.title = title;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      media.innerHTML = '';
      media.appendChild(iframe);
    });
  });

  // Onglets (soulignés, pas de pilule) : basculent entre les 3 catégories.
  const tabs = root.querySelectorAll<HTMLElement>('.wtc-tab');
  const panels = root.querySelectorAll<HTMLElement>('.wtc-panel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const index = tab.getAttribute('data-tab');
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      let activePanel: HTMLElement | null = null;
      panels.forEach((p) => {
        const active = p.getAttribute('data-panel') === index;
        p.classList.toggle('is-active', active);
        if (active) activePanel = p;
      });
      // Un panneau caché (display:none) a scrollWidth/clientWidth à 0 : le
      // calcul initial des flèches était donc faux pour les onglets non actifs
      // au chargement. On le refait maintenant qu'il est réellement visible.
      scrollerWraps.forEach((sw) => {
        if (activePanel && (activePanel as HTMLElement).contains(sw.wrap)) sw.update();
      });
    });
  });
}
