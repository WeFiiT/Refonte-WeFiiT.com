// Point d'entrée du design system envoyé à Claude Design (/design-sync). Liste les
// composants React du site par leur nom, avec les couleurs (tokens) et les polices : c'est
// tout ce que l'agent de Claude Design reçoit pour construire avec nos composants.
// Ajouter ici chaque nouveau composant (et son type XProps).
import '../styles/tokens.css';
import '../styles/polices.css';

// Navigation
export { default as EnTete } from '../components/EnTete';
export type { EnTeteProps } from '../components/EnTete';
export { default as PiedDePage } from '../components/PiedDePage';

// Actions
export { default as Bouton } from '../components/Bouton';
export type { BoutonProps } from '../components/Bouton';

// Sections
export { default as HeroPhotoBande } from '../components/HeroPhotoBande';
export type { HeroPhotoBandeProps } from '../components/HeroPhotoBande';
export { default as BandeCta } from '../components/BandeCta';
export type { BandeCtaProps } from '../components/BandeCta';
export { default as GrilleCartes } from '../components/GrilleCartes';
export type { GrilleCartesProps } from '../components/GrilleCartes';
export { default as GrillePiliers } from '../components/GrillePiliers';
export type { GrillePiliersProps } from '../components/GrillePiliers';
export { default as ActionsZigzag } from '../components/ActionsZigzag';
export type { ActionsZigzagProps } from '../components/ActionsZigzag';
export { default as CadrePrincipes } from '../components/CadrePrincipes';
export type { CadrePrincipesProps } from '../components/CadrePrincipes';
export { default as TribesOnglets } from '../components/TribesOnglets';
export type { TribesOngletsProps } from '../components/TribesOnglets';
export { default as FaqAccordeon } from '../components/FaqAccordeon';
export type { FaqAccordeonProps } from '../components/FaqAccordeon';

// Témoignages et médias
export { default as Temoignage } from '../components/Temoignage';
export type { TemoignageProps } from '../components/Temoignage';
export { default as CarrouselAvis } from '../components/CarrouselAvis';
export type { CarrouselAvisProps } from '../components/CarrouselAvis';
export { default as TitreVideo } from '../components/TitreVideo';
export type { TitreVideoProps } from '../components/TitreVideo';
export { default as ParolesVideos } from '../components/ParolesVideos';
export type { ParolesVideosProps } from '../components/ParolesVideos';
export { default as CollectifGaleries } from '../components/CollectifGaleries';
export type { CollectifGaleriesProps } from '../components/CollectifGaleries';
export { default as PhotoPleineLargeur } from '../components/PhotoPleineLargeur';
export type { PhotoPleineLargeurProps } from '../components/PhotoPleineLargeur';
