// Aperçus de Temoignage : les trois témoignages de la page Équipe (src/contenu/equipe.ts),
// sans bande (Guillaume), avec bande (Yamila) et avec bande + carteMobileHaut (Anne-Claire).
import { Temoignage } from 'wefiit-com';

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';

export const SansBande = () => (
  <Temoignage
    personne="apercu-guillaume"
    nom="Guillaume"
    role="Consultant Product Leader"
    texte="J'ai tout de suite accroché à la vision des co-fondateurs pour WeFiiT, à savoir la construction d'un collectif d'experts bienveillants (...) où chacun peut apporter sa pierre à l'édifice pour construire un WeFiiT qui nous ressemble"
    photo={`${CDN}64118ccd9e750a2969c2eb5b_Mission%20-%20T%C3%A9moignages%20WeFiiTers%20-%20Consultant%20Product%20Guillaume.webp`}
  />
);

export const AvecBande = () => (
  <Temoignage
    personne="apercu-yamila"
    nom="Yamila"
    role="Lead People Experience"
    texte="L’université WeFiiT, c’est un programme de formation qu’on déploie tout au long de l’année (…) ce qui est assez différenciant des autres, c’est que ce sont les WeFiiTers qui choisissent les formations qu’ils veulent voir dans ce parcours, et on le fait évoluer tous les ans."
    photo={`${CDN}6a8c35a519d54491c9ab5e1d_yamila.webp`}
    bande={{ padding: '1rem 0 6rem' }}
  />
);

export const AvecBandeMobileHaut = () => (
  <Temoignage
    personne="apercu-anne-claire"
    nom="Anne-Claire"
    role="Consultante Product Confirmée"
    texte="Ce qui est fou chez WeFiiT c'est qu'on se connait tous mais au final on se rend compte qu'on a des talents cachés"
    photo={`${CDN}6a8c05d73b86dda0c4334ef0_anne-claire.webp`}
    bande={{ padding: '2.75rem 0 5rem' }}
    carteMobileHaut="5.5rem"
  />
);
