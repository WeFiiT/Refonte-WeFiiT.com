// Aperçu d'ActionsZigzag : « Agir et s'engager, ensemble » de /notre-engagement-rse
// (src/contenu/rse.ts), 3 actions sur 6 pour montrer l'alternance droite / gauche.
import { ActionsZigzag } from 'wefiit-com';

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';

export const Rse = () => (
  <ActionsZigzag
    id="apercu-zigzag"
    titre="Agir et s'engager, ensemble"
    intro="En 2023, à l’initiative des WeFiiTers, la squad interne « Challengers » est née. Sa mission : <br>« Sensibiliser et engager tous les WeFiiTers autour d’actions utiles à la société et à l’environnement ».<br>Depuis, la squad fait vivre ces enjeux dans l’entreprise, voici quelques exemples de ses actions :"
    actions={[
      {
        titre: 'Clean walk',
        texte: 'Et si on commençait par nettoyer devant notre porte ? Par une journée ensoleillée, nos WeFiiTers se sont mobilisés pour nettoyer l’Avenue du Maine.',
        photo: `${CDN}6904d2de30a28bd3b928ad8d_RSE_CleanWalk.avif`,
        alt: "L'équipe WeFiiT après un clean walk rue du Maine à Paris",
      },
      {
        titre: 'Collecte banques alimentaires',
        texte: 'Pour contribuer à la collecte des banques alimentaires, quelques bras supplémentaires sont toujours les bienvenus ! Bravo et merci pour eux !',
        photo: `${CDN}6904d2dc6a09afedcc715456_RSE_BA_1.avif`,
        alt: 'Une consultante WeFiiT souriante en gilet orange collecte pour les banques alimentaires',
      },
      {
        titre: 'Don du sang',
        texte: 'Merci à nos WeFiiTers qui ont courageusement bravé la seringue et participé à remplir les stocks de sang !',
        photo: `${CDN}6904d2dd34c035e76490a858_RSE_DonDuSang.avif`,
        alt: 'Deux consultantes WeFiiT sourient après avoir donné leur sang',
      },
    ]}
  />
);
