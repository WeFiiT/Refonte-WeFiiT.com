// Aperçu de GrillePiliers : « Chez WeFiiT on prend soin de vous ! » de /product-management
// (src/contenu/product-management.ts), les 5 piliers (3 + 2 centrés).
import { GrillePiliers } from 'wefiit-com';

export const ProductManagement = () => (
  <GrillePiliers
    id="apercu-piliers"
    titre="Chez WeFiiT on prend soin de vous "
    point="!"
    sousTitre="Bienvenue dans notre expérience client"
    etoiles
    piliers={[
      {
        titre: 'Excellence en mission',
        texte: 'Avec un <strong>taux de sélectivité de 5%</strong>, nous avons bâti une équipe regroupant les meilleurs talents Lead PM, Product Manager, Product Owner, Coach Produit, QA. Nos <a href="#">consultants PM</a> ont des expériences à la fois dans des grands groupes et en scale-ups, et délivrent avec un fort niveau de qualité (9/10 de CSAT).',
      },
      {
        titre: 'Proactivité, sur-mesure et rapidité',
        texte: '<strong>De la théorie mais surtout de la pratique</strong> : chaque WeFiiTer se distingue par sa capacité à embarquer et son pragmatisme dans son approche. Nous déployons des offres sur mesure qui peuvent prendre la forme de conseil, immersion &amp; coaching.',
      },
      {
        titre: "Plus qu'un consultant, un équipage",
        texte: "WeFiiT c'est avant tout un <strong>équipage de consultants passionnés</strong> : partage d'expériences, mentorings entre pairs, formations dédiées, nous favorisons l'émulation collective pour relever vos challenges produits.",
      },
      {
        titre: 'Du contenu spécialiste pour vous éclairer',
        texte: 'Nous vous offrons un accès exclusif à une <strong>veille des tendances du marché,</strong> nos contenus vidéos IMPAQT, des articles de blog et des We.TalK animées par nos experts et influenceurs Produit.',
      },
      {
        titre: 'Accès à des services inclus exclusifs',
        texte: 'Des <strong>journées offsite</strong>, des ateliers dans nos locaux, des rencontres entre pairs <strong>CPO/VP/Head of Product,</strong> des <strong>We.MeeT</strong> entre entreprises au même enjeu, <strong>coachings en développement personnel</strong> et leadership produit...',
      },
    ]}
  />
);
