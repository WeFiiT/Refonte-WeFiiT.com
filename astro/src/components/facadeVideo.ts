// Création du lecteur YouTube d'une façade vidéo (vignette + bouton lecture) : l'iframe n'est
// créée qu'au clic, en youtube-nocookie avec lecture automatique, car le lecteur intégré
// affiche une miniature basse résolution sur un petit conteneur. Partagé par les comportements
// des composants à façade vidéo (TexteVideo ; CollectifGaleries garde pour l'instant sa copie).
export function creerLecteurYouTube(id: string, titre: string): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1';
  iframe.title = titre;
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
  iframe.setAttribute('allowfullscreen', '');
  return iframe;
}

// Adresse de la vignette (maxresdefault ; hqdefault si la vignette devait être grise).
export function vignetteYouTube(id: string): string {
  return 'https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/maxresdefault.jpg';
}
