// Comportement de ManifesteCommandements : accordéon sur mobile (premier commandement ouvert),
// grille entièrement ouverte sur desktop, et apparition des numéros au défilement. Port fidèle
// du script du bloc pages/culture/blocs/05-manifesto.html. Partagé par le site
// (src/comportements.ts, appelé sur chaque bloc de la page) et par le composant React
// (useEffect, dans Claude Design).
export const selecteur = '.wt-manifesto';

type Item = HTMLElement;

export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wtm-init') === '1') return;
  root.setAttribute('data-wtm-init', '1');

  const items: Item[] = Array.from(root.querySelectorAll<HTMLElement>('.wtm-item'));
  const mqMobile = window.matchMedia('(max-width: 767px)');
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  // minuteur de masquage par item (équivaut au `item._hideTimer` du script d'origine)
  const minuteurs = new Map<Item, ReturnType<typeof setTimeout>>();

  // Ouvre ou ferme un item (mobile). À la fermeture, le panneau n'est masqué (hidden) qu'après
  // la fin de l'animation, pour rester invisible aux lecteurs d'écran et hors de l'ordre de
  // tabulation. Un délai fixe plutôt que transitionend : il se déclenche même si la
  // transition n'a pas lieu.
  function setState(item: Item, open: boolean, animate: boolean): void {
    const btn = item.querySelector<HTMLElement>('.wtm-btn')!;
    const panel = item.querySelector<HTMLElement>('.wtm-panel')!;
    const animated = animate && !mqReduce.matches;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    clearTimeout(minuteurs.get(item));
    if (open) {
      panel.hidden = false;
      if (animated) {
        // deux images : le panneau doit d'abord exister fermé pour que la hauteur s'anime
        requestAnimationFrame(() => { requestAnimationFrame(() => { item.classList.add('is-open'); }); });
      } else {
        item.classList.add('is-open');
      }
    } else {
      item.classList.remove('is-open');
      if (animated) {
        minuteurs.set(item, setTimeout(() => {
          if (!item.classList.contains('is-open')) panel.hidden = true;
        }, 230));
      } else {
        panel.hidden = true;
      }
    }
  }

  // Applique le mode courant : accordéon en mobile (1er item ouvert), grille entièrement
  // ouverte en desktop. Rappelé à chaque changement de breakpoint.
  function apply(): void {
    const mobile = mqMobile.matches;
    root.classList.toggle('wtm-acc', mobile);
    items.forEach((item, k) => {
      const btn = item.querySelector<HTMLElement>('.wtm-btn')!;
      if (mobile) {
        btn.removeAttribute('tabindex');
        setState(item, k === 0, false);
      } else {
        // desktop : bouton neutralisé (hors de l'ordre de tabulation), panneau toujours visible
        btn.setAttribute('tabindex', '-1');
        item.classList.remove('is-open');
        item.querySelector<HTMLElement>('.wtm-panel')!.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  items.forEach((item) => {
    item.querySelector('.wtm-btn')!.addEventListener('click', () => {
      if (!mqMobile.matches) return;
      const wasOpen = item.classList.contains('is-open');
      items.forEach((other) => {
        if (other !== item && other.classList.contains('is-open')) setState(other, false, true);
      });
      setState(item, !wasOpen, true);
    });
  });

  // Apparition des numéros : ils se déposent (fondu + descente, via la transition CSS), une
  // seule fois par cellule. Sur desktop, la 2e colonne démarre 120 ms après la 1re pour un
  // effet en cascade. Les numéros sont aria-hidden.
  function revealNumbers(): void {
    if (mqReduce.matches || !('IntersectionObserver' in window)) return;
    root.classList.add('wtm-anim');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const item = entry.target as Item;
        io.unobserve(item);
        const delay = mqMobile.matches ? 0 : (items.indexOf(item) % 2) * 120;
        item.style.setProperty('--wtm-delay', delay + 'ms');
        // le délai de cascade est porté par la transition CSS (--wtm-delay)
        item.classList.add('is-vu');
      });
    }, { threshold: 0.5 });
    items.forEach((item) => { io.observe(item); });
  }

  // addListener : anciens navigateurs (Safari < 14) sans addEventListener sur MediaQueryList
  if (mqMobile.addEventListener) mqMobile.addEventListener('change', apply);
  else mqMobile.addListener(apply);
  apply();
  revealNumbers();
}
