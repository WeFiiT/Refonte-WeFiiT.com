// Comportements des composants interactifs (onglets, carrousels, menu...), chargés par le
// layout sur toutes les pages. Les composants React sont rendus en HTML au build, sans React
// chez le visiteur : c'est ce script qui leur branche leur comportement, bloc par bloc.
// Le même code sert aux composants React dans Claude Design (via leur useEffect).
// Ajouter ici chaque nouveau composant qui a un fichier X.comportement.ts.
import * as EnTete from './components/EnTete.comportement';
import * as PiedDePage from './components/PiedDePage.comportement';
import * as TribesOnglets from './components/TribesOnglets.comportement';
import * as CollectifGaleries from './components/CollectifGaleries.comportement';
import * as ParolesVideos from './components/ParolesVideos.comportement';
import * as CadrePrincipes from './components/CadrePrincipes.comportement';
import * as CarrouselAvis from './components/CarrouselAvis.comportement';
import * as FaqAccordeon from './components/FaqAccordeon.comportement';

const comportements = [EnTete, PiedDePage, TribesOnglets, CollectifGaleries, ParolesVideos, CadrePrincipes, CarrouselAvis, FaqAccordeon];

for (const { selecteur, init } of comportements) {
  document.querySelectorAll<HTMLElement>(selecteur).forEach((root) => init(root));
}
