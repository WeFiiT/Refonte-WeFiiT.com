// Comportement de WidgetPodcast : ouverture / fermeture de la carte, lecteur Spotify (API iFrame, créé à
// l'ouverture seulement), indicateur « En lecture », repli de la pastille à 15 % du défilement et fermeture
// à Échap. Partagé par le site (src/comportements.ts, appelé sur chaque bloc de la page) et par le composant
// React (useEffect, dans Claude Design).
export const selecteur = '.wt-podcast';

// Partie de l'API iFrame de Spotify qu'on utilise (https://open.spotify.com/embed/iframe-api/v1).
interface SpotifyController {
  addListener(evenement: string, rappel: (e: { data?: { isPaused?: boolean } } | undefined) => void): void;
  destroy?: () => void;
}
interface SpotifyIFrameApi {
  createController(
    element: HTMLElement,
    options: { uri: string; width: string; height: string },
    rappel: (controller: SpotifyController) => void,
  ): void;
}
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameApi) => void;
  }
}

export function init(root: HTMLElement): void {
  if (root.getAttribute('data-wtp-init') === '1') return;
  root.setAttribute('data-wtp-init', '1');

  const pill = root.querySelector<HTMLButtonElement>('.wtp-pill')!;
  const card = root.querySelector<HTMLElement>('.wtp-card')!;
  const closeBtn = root.querySelector<HTMLButtonElement>('.wtp-close')!;
  const slot = root.querySelector<HTMLElement>('.wtp-player-slot')!;
  const episode = slot.getAttribute('data-spotify-episode');
  const titreLecteur = slot.getAttribute('data-spotify-title') || '';
  let hasPlayer = false; // un lecteur existe (visible ou masqué)
  let playing = false; // le lecteur est en train de lire
  let controller: SpotifyController | null = null; // contrôleur de l'API iFrame de Spotify
  let api: SpotifyIFrameApi | null = null;
  let apiRequested = false;
  let apiFailed = false;
  let pendingCreate = false;

  // Lecteur Spotify, créé à l'ouverture seulement (rien de Spotify n'est chargé avant) avec l'API iFrame de Spotify,
  // pour savoir s'il joue :
  //  - fermer la carte pendant la lecture la masque seulement : le son continue (pastille « En lecture » + anneau) ;
  //  - fermer la carte à l'arrêt retire le lecteur, qui est recréé à la prochaine ouverture. Le lecteur fait défiler
  //    lui-même les titres trop longs (animation interne, non commandable) : en le recréant, on voit le début du titre.
  // Si l'API ne se charge pas, un simple <iframe> est utilisé (état de lecture inconnu : retiré à la fermeture).
  function setPlaying(v: boolean) {
    playing = !!v;
    root.classList.toggle('is-playing', playing);
    // la lecture se termine ou est mise en pause alors que la carte est fermée : on retire le lecteur
    if (!playing && card.hidden && hasPlayer) unloadPlayer();
  }
  function decorate() {
    const fr = slot.querySelector('iframe');
    if (!fr) return;
    fr.classList.add('wtp-player');
    fr.title = titreLecteur;
    fr.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
  }
  function createWithApi() {
    const holder = document.createElement('div');
    slot.appendChild(holder);
    api!.createController(holder, { uri: 'spotify:episode:' + episode, width: '100%', height: '152' }, (c) => {
      controller = c;
      decorate();
      c.addListener('playback_update', (e) => {
        setPlaying(!!(e && e.data && !e.data.isPaused));
      });
    });
    window.setTimeout(decorate, 0);
  }
  function createPlain() {
    const f = document.createElement('iframe');
    f.className = 'wtp-player';
    f.src = 'https://open.spotify.com/embed/episode/' + encodeURIComponent(episode || '') + '?utm_source=generator';
    f.title = titreLecteur;
    f.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
    slot.appendChild(f);
  }
  function requestApi() {
    if (apiRequested) return;
    apiRequested = true;
    window.onSpotifyIframeApiReady = (a) => {
      api = a;
      if (pendingCreate && hasPlayer) {
        pendingCreate = false;
        createWithApi();
      }
    };
    const sc = document.createElement('script');
    sc.src = 'https://open.spotify.com/embed/iframe-api/v1';
    sc.async = true;
    sc.onerror = () => {
      apiFailed = true;
      if (pendingCreate && hasPlayer) {
        pendingCreate = false;
        createPlain();
      }
    };
    document.head.appendChild(sc);
  }
  function loadPlayer() {
    if (hasPlayer || !episode) return;
    hasPlayer = true;
    if (api) createWithApi();
    else if (apiFailed) createPlain();
    else {
      pendingCreate = true;
      requestApi();
    }
  }
  function unloadPlayer() {
    if (controller && controller.destroy) {
      try {
        controller.destroy();
      } catch (e) {
        /* le lecteur est déjà retiré : rien à faire */
      }
    }
    controller = null;
    hasPlayer = false;
    pendingCreate = false;
    setPlaying(false);
    while (slot.firstChild) slot.removeChild(slot.firstChild);
  }

  function setOpen(open: boolean, focus: boolean) {
    card.hidden = !open;
    if (!open && !playing) unloadPlayer();
    pill.hidden = open;
    pill.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      loadPlayer();
      if (focus) closeBtn.focus();
    } else if (focus) {
      pill.focus();
    }
  }

  // Repli à 15 % du défilement de la page (dans les deux sens : on redéploie en remontant au-dessus de 15 %).
  let raf: number | null = null;
  function onScroll() {
    raf = null;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? (window.pageYOffset || document.documentElement.scrollTop || 0) / max : 0;
    root.classList.toggle('is-compact', ratio >= 0.15);
  }
  window.addEventListener(
    'scroll',
    () => {
      if (!raf) raf = window.requestAnimationFrame(onScroll);
    },
    { passive: true },
  );
  window.addEventListener('resize', () => {
    if (!raf) raf = window.requestAnimationFrame(onScroll);
  });
  onScroll();

  pill.addEventListener('click', () => setOpen(true, true));
  closeBtn.addEventListener('click', () => setOpen(false, true));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !card.hidden) setOpen(false, true);
  });
}
