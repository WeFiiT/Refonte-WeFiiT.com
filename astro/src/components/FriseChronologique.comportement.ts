// Comportement de FriseChronologique : étape active (rail des années, vague pleine rognée et bateau,
// cartes, flèches), rail de cartes borné, clavier sur la rangée des années, glisser (Pointer Events)
// et recalcul au redimensionnement. Partagé par le site (src/comportements.ts, appelé sur chaque
// bloc de la page) et par le composant React (useEffect, dans Claude Design).
// Portage ligne à ligne du script du bloc pages/culture/blocs/02-histoire.html : mêmes crochets DOM
// (classes .wth-*, data-step), mêmes classes d'état (is-active, is-past), même protection data-wth-init.
export const selecteur = '.wt-histoire';

export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wth-init') === '1') return;
  root.setAttribute('data-wth-init', '1');

  const years = Array.from(root.querySelectorAll<HTMLElement>('.wth-year'));
  const cards = Array.from(root.querySelectorAll<HTMLElement>('.wth-card'));
  const track = root.querySelector<HTMLElement>('.wth-track');
  const railWrap = root.querySelector<HTMLElement>('.wth-rail-wrap');
  const waveSolid = root.querySelector<SVGElement>('.wth-wave-solid');
  const boat = root.querySelector<HTMLElement>('.wth-boat');
  const prevBtn = root.querySelector<HTMLButtonElement>('.wth-arrow-left');
  const nextBtn = root.querySelector<HTMLButtonElement>('.wth-arrow-right');
  const yearsRow = root.querySelector<HTMLElement>('.wth-years');
  // Garde-fou ajouté au portage (TypeScript le demande) : le script d'origine supposait ces éléments présents.
  if (!track || !railWrap || !waveSolid || !boat || !prevBtn || !nextBtn || !yearsRow || !cards.length) return;
  const n = years.length;
  let activeIndex = 0;

  // .wth-rail-wrap a un padding gauche/bas (place pour l'ombre des cartes
  // au survol, voir CSS) : clientWidth l'inclut, donc la largeur réellement
  // disponible pour le défilement du rail est plus étroite que clientWidth
  // d'exactement ce padding. Sans ce correctif, le rail ne va pas assez
  // loin et la dernière carte se retrouve rognée par l'overflow:hidden.
  function railVisibleWidth(): number {
    const cs = getComputedStyle(railWrap!);
    return railWrap!.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  }

  // Décalage du rail pour l'étape active. Cartes plus étroites que l'écran (desktop, tablette,
  // mobile large) : la carte précédente garde une amorce visible à gauche pour qu'on puisse
  // cliquer dessus et revenir en arrière ; le rail est borné entre 0 et le maximum pour que les
  // dernières cartes ne laissent jamais de vide à droite. Téléphone (<= 479px) : une carte pleine
  // largeur à la fois, sans amorce ni borne (la carte active est toujours alignée à gauche).
  function railShift(): number {
    const gap = parseFloat(getComputedStyle(track!).gap) || 0;
    const step = cards[0].getBoundingClientRect().width + gap;
    if (window.innerWidth <= 479) return activeIndex * step;
    const pad = parseFloat(getComputedStyle(railWrap!).paddingLeft) || 0;
    const peekVisible = window.innerWidth <= 767 ? 24 : 64;
    const peek = activeIndex > 0 ? Math.max(0, peekVisible + gap - pad) : 0;
    const maxShift = Math.max(0, track!.scrollWidth - railVisibleWidth());
    return Math.min(Math.max(0, activeIndex * step - peek), maxShift);
  }

  function render(): void {
    const pct = (activeIndex / (n - 1)) * 100;
    waveSolid!.style.clipPath = 'inset(-0.25rem ' + (100 - pct) + '% -0.25rem 0)';
    boat!.style.left = pct + '%';

    years.forEach((y, i) => {
      y.classList.toggle('is-active', i === activeIndex);
      y.classList.toggle('is-past', i < activeIndex);
      if (i === activeIndex) y.setAttribute('aria-current', 'step');
      else y.removeAttribute('aria-current');
    });
    cards.forEach((c, i) => c.classList.toggle('is-active', i === activeIndex));

    // Rail borné : jamais au-delà de scrollWidth - largeur visible (les
    // dernières cartes s'activent alors sans que le rail bouge, pas
    // d'effet "3+3+1").
    track!.style.transform = 'translateX(-' + railShift() + 'px)';
    // Flèches mobiles : posées sur le bas de la photo (3/4 de sa hauteur réelle), jamais sur le
    // texte de la carte (qui occupe toute la largeur sur téléphone), sans dépendre de la largeur
    // de la fenêtre ni du padding de la page.
    const photo = cards[0].querySelector<HTMLElement>('.wth-card-photo');
    if (photo) root.style.setProperty('--wth-arrow-top', photo.getBoundingClientRect().height * 0.75 + 'px');

    prevBtn!.disabled = activeIndex === 0;
    nextBtn!.disabled = activeIndex === n - 1;
    prevBtn!.setAttribute('aria-disabled', prevBtn!.disabled ? 'true' : 'false');
    nextBtn!.setAttribute('aria-disabled', nextBtn!.disabled ? 'true' : 'false');
  }

  function setActive(i: number): void {
    activeIndex = Math.max(0, Math.min(n - 1, i));
    render();
  }

  years.forEach((y, i) => y.addEventListener('click', () => setActive(i)));
  cards.forEach((c, i) => {
    // Les cartes ne sont pas des <button> car une carte peut contenir un vrai
    // lien (ex. "Découvrir nos bureaux") : un lien imbriqué dans un bouton est
    // invalide en HTML. L'activation au clavier de cette même étape reste
    // possible via les années de la frise ou les flèches, qui sont de vrais
    // boutons.
    c.addEventListener('click', (e) => {
      if ((e.target as Element).closest('a')) return; // laisser le lien suivre son cours normal
      setActive(i);
    });
  });
  prevBtn.addEventListener('click', () => setActive(activeIndex - 1));
  nextBtn.addEventListener('click', () => setActive(activeIndex + 1));

  yearsRow.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { setActive(activeIndex + 1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { setActive(activeIndex - 1); e.preventDefault(); }
  });

  // Glisser (Pointer Events, pas Touch Events, pour fonctionner aussi à la
  // souris/trackpad) : seuil de 8px avant d'engager le geste et jamais de
  // setPointerCapture avant ce seuil, sinon le clic sur une carte (ou son
  // lien) est intercepté. Pas de flag "isAnimating"
  // qui dépendrait d'un transitionend qui ne se déclenche pas forcément
  // (piège déjà vécu sur le bloc "Paroles de WeFiiTer·e·s") : on se contente de
  // renvoyer l'état courant à chaque relâchement, ce qui rejoue la même
  // position (effet de "retour") quand le glisser n'a pas franchi le seuil
  // de bascule.
  let pointerActive = false, dragging = false, startX = 0, deltaX = 0;
  const DRAG_ENGAGE = 8, DRAG_COMMIT = 40;

  railWrap.addEventListener('pointerdown', (e) => {
    pointerActive = true; dragging = false; startX = e.clientX; deltaX = 0;
  });
  railWrap.addEventListener('pointermove', (e) => {
    if (!pointerActive) return;
    deltaX = e.clientX - startX;
    if (!dragging) {
      if (Math.abs(deltaX) < DRAG_ENGAGE) return;
      dragging = true;
      track.style.transition = 'none';
      railWrap.setPointerCapture(e.pointerId);
    }
    const base = -railShift();
    track.style.transform = 'translateX(' + (base + deltaX) + 'px)';
  });
  function endDrag(): void {
    if (!pointerActive) return;
    pointerActive = false;
    track!.style.transition = '';
    if (!dragging) return;
    dragging = false;
    if (deltaX < -DRAG_COMMIT) setActive(activeIndex + 1);
    else if (deltaX > DRAG_COMMIT) setActive(activeIndex - 1);
    else render();
  }
  railWrap.addEventListener('pointerup', endDrag);
  railWrap.addEventListener('pointercancel', endDrag);

  window.addEventListener('resize', render);
  render();
}
