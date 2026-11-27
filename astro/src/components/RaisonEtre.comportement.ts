// Comportement de RaisonEtre : effet « balayage » (inspiré de la section manifeste de
// bivouac-builders.com). On découpe la phrase en lignes telles qu'elles s'affichent, puis une
// barre orange passe sur chaque ligne et révèle le texte derrière elle, ligne après ligne.
// Joué une seule fois, à l'arrivée du bloc à l'écran ; sans JavaScript, ou si le visiteur
// réduit les animations, la phrase est simplement affichée. Les lignes dépendent de la police
// et de la largeur : on attend le chargement des polices, et on recalcule (sans rejouer
// l'animation) quand la largeur de la fenêtre change.
// Port fidèle du script de pages/culture/blocs/03-raison-etre.html (mêmes classes, même
// protection data-wtre-init). Partagé par le site (src/comportements.ts, appelé sur chaque bloc
// de la page) et par le composant React (useEffect, dans Claude Design).
export const selecteur = '.wt-raison-etre';

export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wtre-init') === '1') return;
  root.setAttribute('data-wtre-init', '1');

  const p = root.querySelector<HTMLElement>('.wtre-text');
  if (!p) return;
  const plain = (p.textContent ?? '').replace(/\s+/g, ' ').trim();
  const reduced = !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let played = false;

  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  // Le point final (dernier caractère) reçoit l'accent orange.
  const html = (s: string) => {
    const m = s.match(/^([\s\S]*?)(\.)$/);
    return m ? esc(m[1]) + '<span class="wtre-dot">.</span>' : esc(s);
  };

  // Découpe la phrase en lignes : on pose chaque mot dans un <span>, on regroupe par position
  // verticale, puis on remplace par une ligne (texte + barre) par groupe.
  function split(): void {
    const words = plain.split(' ');
    p!.innerHTML = words.map((w) => '<span>' + esc(w) + '</span>').join(' ');
    const spans = p!.querySelectorAll<HTMLElement>('span');
    const lines: string[][] = [];
    let last: number | null = null;
    for (let i = 0; i < spans.length; i++) {
      const top = spans[i].offsetTop;
      if (last === null || Math.abs(top - last) > 4) {
        lines.push([]);
        last = top;
      }
      lines[lines.length - 1].push(words[i]);
    }
    p!.innerHTML = lines
      .map(
        (l, i) =>
          '<span class="wtre-ligne" style="--i:' +
          i +
          '"><span class="wtre-ligne-texte">' +
          // espace de fin de ligne : invisible, mais garde les mots séparés pour les lecteurs d'écran et le copier-coller
          (i === lines.length - 1 ? html(l.join(' ')) : esc(l.join(' ')) + ' ') +
          '</span><span class="wtre-balai" aria-hidden="true"></span></span>',
      )
      .join('');
  }

  function prepare(): void {
    split();
    // Déjà joué (ou animation désactivée) : le texte est affiché tel quel, sans nouveau balayage.
    root.classList.toggle('is-fini', played || reduced);
  }

  function play(): void {
    if (played) return;
    played = true;
    root.classList.add('is-joue');
    // Fin de l'animation : on fige l'état « affiché » pour que le texte ne repasse jamais en transparent.
    const n = p!.querySelectorAll('.wtre-ligne').length;
    window.setTimeout(() => root.classList.add('is-fini'), 150 + (n - 1) * 320 + 950);
  }

  if (reduced) return; // le texte reste affiché tel quel

  function start(): void {
    root.classList.add('is-anim');
    prepare();
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            io.disconnect();
            play();
          }
        },
        { threshold: 0.3 },
      );
      io.observe(p!);
    } else {
      play();
    }
  }
  // Les lignes dépendent de la police : on attend qu'elle soit chargée.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(start);
  } else {
    start();
  }

  // Changement de largeur : on recalcule les lignes (sans rejouer l'animation).
  let t: number | undefined;
  let w0 = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === w0) return;
    w0 = window.innerWidth;
    window.clearTimeout(t);
    t = window.setTimeout(() => {
      if (root.classList.contains('is-anim')) prepare();
    }, 150);
  });
}
