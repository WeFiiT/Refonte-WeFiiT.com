// Comportement de ParolesVideos : carrousel mobile à défilement infini, glisser (Pointer
// Events), flèches et pastilles. Partagé par le site (src/comportements.ts, appelé sur chaque
// bloc de la page) et par le composant React (useEffect, dans Claude Design).
export const selecteur = '.wt-paroles';

export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wtp-init') === '1') return;
  root.setAttribute('data-wtp-init', '1');

  const viewport = root.querySelector<HTMLElement>('.wt-carousel-viewport')!;
  const track = root.querySelector<HTMLElement>('.wt-carousel-track')!;
  const dots = root.querySelectorAll<HTMLElement>('.wt-dot');
  const total = dots.length; // nombre de vraies vidéos
  const slideIframes = Array.from(track.querySelectorAll<HTMLElement>('.wt-slide')).map((slide) => {
    const iframe = slide.querySelector<HTMLIFrameElement>('iframe');
    // Vimeo, tube.rvere.com... chaque plateforme a sa propre API de contrôle (ou
    // aucune) : plutôt que de dépendre de l'une d'elles, on coupe la lecture en
    // rechargeant l'iframe (retour à about:blank puis à sa source d'origine),
    // ce qui fonctionne quelle que soit la vidéo.
    if (iframe) iframe.dataset.origSrc = iframe.getAttribute('src') ?? '';
    return iframe;
  });
  function stopVideoAt(index: number) {
    const iframe = slideIframes[index];
    if (!iframe || !iframe.dataset.origSrc) return;
    iframe.src = 'about:blank';
    iframe.src = iframe.dataset.origSrc;
  }
  // Piste = [clone de la dernière, vidéo 0, vidéo 1, vidéo 2, clone de la première]
  let pos = 1;
  let isAnimating = false;
  let pointerActive = false; // du pointerdown au pointerup/cancel, avant même de savoir si c'est un glisser
  let dragging = false; // seulement vrai une fois le seuil de déplacement dépassé (voir DRAG_THRESHOLD)
  let startX = 0;
  let deltaX = 0;
  const DRAG_THRESHOLD = 8; // px

  function setPosition(newPos: number, animate: boolean) {
    track.style.transition = animate ? 'transform 0.35s ease' : 'none';
    track.style.transform = 'translateX(' + -newPos * 100 + '%)';
    pos = newPos;
  }

  function updateDots() {
    const real = (pos - 1 + total) % total;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === real));
  }

  function goTo(newPos: number) {
    if (isAnimating) return;
    if (newPos !== pos) stopVideoAt(pos); // coupe la vidéo de la slide qu'on quitte
    isAnimating = true;
    setPosition(newPos, true);
    updateDots();
  }

  setPosition(pos, false);
  updateDots();

  // Saut invisible (sans animation) d'un clone vers la vraie vidéo correspondante,
  // une fois l'animation de défilement terminée : c'est ce qui donne l'effet de
  // boucle infinie.
  track.addEventListener('transitionend', () => {
    isAnimating = false;
    if (pos === total + 1) setPosition(1, false);
    else if (pos === 0) setPosition(total, false);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i + 1));
  });

  root.querySelectorAll<HTMLElement>('.wt-arrow').forEach((arrow) => {
    arrow.addEventListener('click', () => {
      goTo(pos + parseInt(arrow.getAttribute('data-dir') ?? '0', 10));
    });
  });

  // Pointer Events (et non Touch Events) pour que le glisser fonctionne aussi
  // à la souris/trackpad (ex. en testant le rendu mobile sur un Chrome de
  // bureau redimensionné, où les événements tactiles ne se déclenchent jamais).
  //
  // Important : les slides contiennent des iframes vidéo. On ne doit engager
  // le glisser (et surtout ne JAMAIS appeler setPointerCapture) que si l'on a
  // détecté un vrai déplacement au-delà d'un petit seuil. Sinon, un simple
  // clic sur le bouton lecture de la vidéo était intercepté par le carrousel :
  // la vidéo ne démarrait jamais, et pire, la branche "pas de vrai glisser" du
  // endDrag posait isAnimating=true puis rejouait la même position via
  // setPosition — comme le transform ne changeait pas de valeur, aucun
  // transitionend ne se déclenchait, isAnimating restait bloqué à true pour
  // toujours, et goTo() (flèches et pastilles) ne faisait plus rien ensuite.
  viewport.addEventListener('pointerdown', (e) => {
    if (isAnimating) return;
    pointerActive = true;
    dragging = false;
    startX = e.clientX;
    deltaX = 0;
  });

  viewport.addEventListener('pointermove', (e) => {
    if (!pointerActive) return;
    deltaX = e.clientX - startX;
    if (!dragging) {
      if (Math.abs(deltaX) < DRAG_THRESHOLD) return;
      dragging = true;
      track.style.transition = 'none';
      viewport.setPointerCapture(e.pointerId);
    }
    const base = -pos * viewport.clientWidth;
    track.style.transform = 'translateX(' + (base + deltaX) + 'px)';
  });

  function endDrag() {
    if (!pointerActive) return;
    pointerActive = false;
    if (!dragging) return; // simple clic (ex. play sur la vidéo) : on ne touche à rien, il passe normalement
    dragging = false;
    const threshold = 40;
    if (deltaX < -threshold) goTo(pos + 1);
    else if (deltaX > threshold) goTo(pos - 1);
    else {
      isAnimating = true;
      setPosition(pos, true);
    }
  }

  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
}
