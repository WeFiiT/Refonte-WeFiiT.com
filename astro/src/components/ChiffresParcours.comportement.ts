// Comportement de ChiffresParcours : barre de parité, bandeau des secteurs à défilement
// automatique (en boucle, pausable, glissable) et décompte animé des chiffres. Partagé par le
// site (src/comportements.ts, appelé sur chaque bloc de la page) et par le composant React
// (useEffect, dans Claude Design). `root` est la section qui contient les chiffres, la parité
// et les secteurs (classe .wt-notre-equipe).
export const selecteur = '.wt-notre-equipe';

export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wte-init') === '1') return;
  root.setAttribute('data-wte-init', '1');

  initParite(root);
  initSecteurs(root);
  initDecompte(root);
}

// Barre de parité : largeur tirée du pourcentage de femmes affiché au-dessus (seule source de la valeur).
function initParite(root: HTMLElement): void {
  const pf = root.querySelector<HTMLElement>('[data-wte-pct="f"]');
  const barF = root.querySelector<HTMLElement>('.wte-bar-f');
  if (pf && barF) {
    const nf = parseFloat((pf.textContent ?? '').replace(',', '.'));
    if (!isNaN(nf)) {
      barF.style.flexBasis = 'calc(' + nf + '% - 1px)';
    }
  }
}

// Secteurs : défilement automatique en boucle sans coupure, pilotable. Le script duplique les 6 tuiles (copies
// masquées aux lecteurs d'écran), active la classe .is-marquee puis fait avancer le défilement horizontal de la
// rangée (24 px par seconde) ; quand il a avancé d'un tour (la moitié de la piste), il revient d'un tour en arrière,
// ce qui ne se voit pas. Il s'arrête : tant qu'un doigt est posé (et le temps de l'élan après un glissement), tant
// que la souris survole la rangée, pendant un glissement à la souris, et quand la rangée a le focus clavier.
// Il reprend ensuite tout seul, là où l'utilisateur l'a laissé. Si l'utilisateur réduit les animations, la rangée
// reste telle quelle et se fait défiler à la main.
function initSecteurs(root: HTMLElement): void {
  const boite = root.querySelector<HTMLElement>('.wte-sec-marquee');
  const liste = boite && boite.querySelector<HTMLElement>('.wte-sec-list');
  if (!boite || !liste) return;
  // références non nulles pour les fonctions internes (TypeScript ne propage pas le test ci-dessus)
  const box: HTMLElement = boite;
  const list: HTMLElement = liste;
  const SPEED = 24; // px par seconde
  const HOLD = 900; // ms de pause après un geste (élan du doigt, molette)
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let on = false;
  let raf = 0;
  let last = 0;
  let pos = 0;
  let applied = 0;
  let holdUntil = 0;
  let hovering = false;
  let touching = false;
  let dragging = false;
  let focused = false;
  let visible = true;
  let startX = 0;
  let startScroll = 0;

  const paused = (now: number) => hovering || touching || dragging || focused || now < holdUntil;
  const period = () => list.offsetWidth / 2; // largeur d'un tour (les 6 tuiles + leurs marges)
  const wrap = (v: number) => {
    const p = period();
    return p > 0 && v >= p ? v - p : v;
  };
  const userMoved = () => {
    holdUntil = performance.now() + HOLD;
  };

  function frame(now: number) {
    raf = 0;
    if (!on) return;
    const dt = Math.min(100, now - last);
    last = now;
    if (!paused(now) && visible && !document.hidden) {
      // reprend là où l'utilisateur l'a laissé, puis avance
      if (Math.abs(box.scrollLeft - applied) > 1.5) {
        pos = box.scrollLeft;
      }
      pos = wrap(pos + (SPEED * dt) / 1000);
      box.scrollLeft = pos;
      applied = box.scrollLeft;
    } else {
      pos = box.scrollLeft;
    }
    raf = window.requestAnimationFrame(frame);
  }
  function startLoop() {
    if (!raf && on) {
      last = performance.now();
      raf = window.requestAnimationFrame(frame);
    }
  }

  // Glissement au doigt (natif : le conteneur défile tout seul) ; on ne fait que figer / relancer.
  // Doigt posé sans bouger : pause ; doigt relevé : reprise immédiate. Si le doigt a fait glisser la rangée, on
  // attend la fin de l'élan (les événements de défilement prolongent la pause) avant de reprendre.
  let movedByTouch = false;
  function onTouchStart() {
    touching = true;
    movedByTouch = false;
  }
  function onTouchEnd() {
    touching = false;
    if (movedByTouch) {
      userMoved();
    } else {
      holdUntil = 0;
    }
  }
  // Souris : survol = pause ; clic-glissé = défilement à la main.
  function onPointerEnter(e: PointerEvent) {
    if (e.pointerType === 'mouse') hovering = true;
  }
  function onPointerLeave(e: PointerEvent) {
    if (e.pointerType === 'mouse') {
      hovering = false;
    }
  }
  function onPointerDown(e: PointerEvent) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    dragging = true;
    startX = e.clientX;
    startScroll = box.scrollLeft;
    box.classList.add('is-dragging');
    try {
      box.setPointerCapture(e.pointerId);
    } catch (err) {}
  }
  function onPointerMove(e: PointerEvent) {
    if (!dragging) return;
    box.scrollLeft = startScroll - (e.clientX - startX);
    pos = box.scrollLeft;
    applied = pos;
  }
  function onPointerUp(e: PointerEvent) {
    if (!dragging) return;
    dragging = false;
    box.classList.remove('is-dragging');
    try {
      box.releasePointerCapture(e.pointerId);
    } catch (err) {}
    pos = box.scrollLeft;
    applied = pos;
    userMoved();
  }
  // Le focus ne fige que s'il vient du clavier (:focus-visible) : un clic ou un toucher donne aussi le focus au
  // conteneur, mais ne doit pas le bloquer.
  function onFocusIn() {
    let kb = false;
    try {
      kb = box.matches(':focus-visible');
    } catch (err) {}
    focused = kb;
  }
  function onFocusOut() {
    focused = false;
    userMoved();
  }
  function onScroll() {
    // défilement qui ne vient pas du script (molette, pavé tactile, flèches du clavier, doigt) : on laisse la main
    if (Math.abs(box.scrollLeft - applied) > 1.5) {
      userMoved();
      pos = box.scrollLeft;
      if (touching) {
        movedByTouch = true;
      }
    }
  }
  function onVisible(entries: IntersectionObserverEntry[]) {
    visible = entries[0].isIntersecting;
  }

  let io: IntersectionObserver | null = null;
  const handlers: [string, (e: any) => void, AddEventListenerOptions?][] = [
    ['touchstart', onTouchStart, { passive: true }],
    ['touchend', onTouchEnd, { passive: true }],
    ['touchcancel', onTouchEnd, { passive: true }],
    ['pointerenter', onPointerEnter],
    ['pointerleave', onPointerLeave],
    ['pointerdown', onPointerDown],
    ['pointermove', onPointerMove],
    ['pointerup', onPointerUp],
    ['pointercancel', onPointerUp],
    ['focusin', onFocusIn],
    ['focusout', onFocusOut],
    ['scroll', onScroll, { passive: true }],
  ];

  function enable() {
    Array.prototype.slice.call(list.children).forEach((li: HTMLElement) => {
      const c = li.cloneNode(true) as HTMLElement;
      c.setAttribute('aria-hidden', 'true');
      c.classList.add('wte-sec-clone');
      list.appendChild(c);
    });
    list.removeAttribute('tabindex');
    box.setAttribute('tabindex', '0'); // le conteneur défilant est atteignable au clavier (flèches)
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Secteurs d’activité, défilement automatique');
    box.classList.add('is-marquee');
    box.scrollLeft = 0;
    pos = 0;
    applied = 0;
    handlers.forEach((h) => box.addEventListener(h[0], h[1], h[2]));
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(onVisible);
      io.observe(box);
    }
    on = true;
    startLoop();
  }
  function disable() {
    on = false;
    if (raf) {
      window.cancelAnimationFrame(raf);
      raf = 0;
    }
    handlers.forEach((h) => box.removeEventListener(h[0], h[1], h[2]));
    if (io) {
      io.disconnect();
      io = null;
    }
    hovering = touching = dragging = focused = false;
    Array.prototype.slice.call(list.querySelectorAll('.wte-sec-clone')).forEach((c: HTMLElement) => list.removeChild(c));
    box.removeAttribute('tabindex');
    box.removeAttribute('role');
    box.removeAttribute('aria-label');
    list.setAttribute('tabindex', '0');
    box.classList.remove('is-marquee', 'is-dragging');
    box.scrollLeft = 0;
  }
  function sync() {
    const want = !mqReduce.matches;
    if (want && !on) enable();
    else if (!want && on) disable();
  }
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) startLoop();
  });
  if (mqReduce.addEventListener) {
    mqReduce.addEventListener('change', sync);
  } else {
    mqReduce.addListener(sync);
  }
  sync();
}

// Décompte : à l'arrivée du bloc à l'écran, les chiffres clés (et ceux de la parité, dont la barre se remplit)
// comptent de 0 jusqu'à leur valeur. Joué une seule fois. Les valeurs finales restent écrites dans le HTML
// (sans JavaScript, ou si l'utilisateur réduit les animations, rien ne bouge) et sont lues telles quelles par
// les lecteurs d'écran. La largeur du compteur est réservée à sa valeur finale pour que rien ne bouge autour.
function initDecompte(root: HTMLElement): void {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const DURATION = 1500;

  interface Valeur {
    n: number;
    dec: number;
    suf: string;
  }
  interface Compteur {
    c: HTMLElement;
    p: Valeur;
  }
  function parse(txt: string): Valeur | null {
    const m = txt.trim().match(/^(\d+(?:[.,]\d+)?)(.*)$/);
    if (!m) return null;
    return { n: parseFloat(m[1].replace(',', '.')), dec: (m[1].split(/[.,]/)[1] || '').length, suf: m[2] };
  }
  const fmt = (v: number, dec: number) => v.toFixed(dec).replace('.', ',');
  const ease = (x: number) => 1 - Math.pow(1 - x, 3);

  // Prépare un chiffre : compteur visible (aria-hidden) + valeur finale pour les lecteurs d'écran.
  function prepare(el: HTMLElement): Compteur | null {
    const p = parse(el.textContent ?? '');
    if (!p) return null;
    const finalTxt = el.textContent ?? '';
    el.innerHTML = '<span class="wte-count" aria-hidden="true"></span><span class="wte-vh"></span>';
    const c = el.firstChild as HTMLElement;
    (el.lastChild as HTMLElement).textContent = finalTxt;
    c.textContent = finalTxt;
    const w = c.getBoundingClientRect().width;
    c.style.display = 'inline-block';
    c.style.minWidth = w + 'px';
    c.textContent = fmt(0, p.dec) + p.suf;
    return { c, p };
  }
  function run(duration: number, step: (e: number) => void, done?: () => void) {
    let t0: number | null = null;
    function frame(now: number) {
      if (t0 === null) t0 = now;
      const x = Math.min(1, (now - t0) / duration);
      step(ease(x));
      if (x < 1) {
        window.requestAnimationFrame(frame);
      } else if (done) {
        done();
      }
    }
    window.requestAnimationFrame(frame);
  }
  function watch(target: Element, threshold: number, play: () => void) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          play();
        }
      },
      { threshold },
    );
    io.observe(target);
  }

  function demarrer() {
    // 1) Chiffres clés
    const stats = root.querySelector<HTMLElement>('.wte-stats');
    if (stats) {
      const figs = (Array.from(stats.querySelectorAll<HTMLElement>('.wte-figure'))
        .map(prepare)
        .filter(Boolean)) as Compteur[];
      watch(stats, 0.35, () => {
        run(DURATION, (e) => {
          figs.forEach((f) => {
            f.c.textContent = fmt(f.p.n * e, f.p.dec) + f.p.suf;
          });
        });
      });
    }
    // 2) Parité : chiffres + barre qui se remplit (les deux segments grandissent depuis la gauche)
    const eq = root.querySelector<HTMLElement>('.wte-eq-body');
    const pf = root.querySelector<HTMLElement>('[data-wte-pct="f"]');
    const pm = root.querySelector<HTMLElement>('[data-wte-pct="m"]');
    const barF = root.querySelector<HTMLElement>('.wte-bar-f');
    const barM = root.querySelector<HTMLElement>('.wte-bar-m');
    if (eq && pf && pm && barF && barM) {
      const finalF = barF.style.flexBasis;
      const a = prepare(pf);
      const b = prepare(pm);
      if (a && b) {
        barF.style.flex = '0 0 0px';
        barM.style.flex = '0 0 0px';
        watch(eq, 0.6, () => {
          run(
            DURATION,
            (e) => {
              a.c.textContent = fmt(a.p.n * e, a.p.dec) + a.p.suf;
              b.c.textContent = fmt(b.p.n * e, b.p.dec) + b.p.suf;
              barF.style.flex = '0 0 max(0px, calc(' + a.p.n * e + '% - 1px))';
              barM.style.flex = '0 0 max(0px, calc(' + b.p.n * e + '% - 1px))';
            },
            () => {
              barF.style.flex = '';
              barF.style.flexBasis = finalF;
              barM.style.flex = '';
            },
          );
        });
      }
    }
  }
  // Les largeurs réservées dépendent de la police : on attend qu'elle soit chargée.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(demarrer);
  } else {
    demarrer();
  }
}
