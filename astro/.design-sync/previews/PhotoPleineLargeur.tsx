// Aperçu de PhotoPleineLargeur : la photo de groupe en bas de la page Équipe
// (src/contenu/equipe.ts, bloc 10-photo-pleine-largeur).
import { PhotoPleineLargeur } from 'wefiit-com';

const PHOTO_EQUIPE = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/659bfd283ed39bb587c3e1b0_%C3%A9quipe-wefiit%20(1)';

export const PhotoEquipe = () => (
  <PhotoPleineLargeur
    id="apercu-photo"
    src={`${PHOTO_EQUIPE}.avif`}
    srcset={[
      [`${PHOTO_EQUIPE}-p-500.avif`, 500],
      [`${PHOTO_EQUIPE}-p-800.avif`, 800],
      [`${PHOTO_EQUIPE}-p-1080.avif`, 1080],
      [`${PHOTO_EQUIPE}.avif`, 1878],
    ]}
    alt="L’équipe WeFiiT"
    ratio="802 / 291"
  />
);
