// Aperçu de CollectifGaleries : « S’épanouir grâce au collectif » de la page Équipe, ses trois
// onglets et leurs vidéos (src/contenu/equipe.ts, bloc 06-collectif). Une seule cellule : les
// ids internes du composant sont fixes, une deuxième instance les dupliquerait.
import { CollectifGaleries } from 'wefiit-com';

export const Collectif = () => (
  <CollectifGaleries
    id="apercu-collectif"
    titre="S’épanouir grâce au collectif"
    intro={
      'Chez WeFiiT, nous sommes convaincus que l’épanouissement professionnel passe par le collectif. Grandir, partager, débattre et apprendre les uns des autres font partie intégrante de notre quotidien.<br><br>Chaque deuxième jeudi du mois, nous prenons le temps de nous retrouver lors de nos rituels <span class="wtc-highlight">We.Talk</span>, <span class="wtc-highlight">We.Share</span> ou <span class="wtc-highlight">Afterworks</span> : des temps forts dédiés au partage d’expériences, d’expertises et de points de vue.<br><br>Et tout au long de l’année, le <span class="wtc-highlight">WeFiiT Live</span>, les <span class="wtc-highlight">séminaires</span>, <span class="wtc-highlight">Armadas</span> et la <span class="wtc-highlight">Kermesse</span> annuelle nous permettent de prendre du recul, de célébrer le chemin parcouru et d’imaginer ensemble la suite de l’aventure WeFiiT.'
    }
    categories={[
      {
        id: 2,
        nom: 'We.Talk',
        description: 'Une personne influente de la sphère Produit nous livre son expertise et ses best-practices.',
        videos: [
          { id: 'A8a5QrMxt4g', titre: 'We.Talk de Claire Rohaut', legende: 'We.Talk - Claire Rohaut, Lead Product Manager chez PlayPlay' },
          { id: 'Oa4EOYsvIRs', titre: 'We.Talk de Sylvain Grande', legende: 'We.Talk - Sylvain Grande, Chief Product Officer chez Payfit' },
          { id: '1PdKWaVdn-U', titre: 'We.Talk de Frédéric Bardolle', legende: 'We.Talk - Frédéric Bardolle, Head of Product chez Scaleway' },
          { id: 'MEWktufBlg4', titre: "We.Talk d'Anne-Claire Baschet", legende: 'We.Talk - Anne-Claire Baschet, Chief Data & AI Officer chez Mirakl' },
        ],
      },
      {
        id: 1,
        nom: 'WeFiiT Live & Séminaires',
        description:
          "Le WeFiiT Live c'est un moment de rencontres, de feedbacks, de sollicitation d'avis, de démo, de plaisir, de surprises… Sans oublier les séminaires, les Armadas et la Kermesse annuelle.",
        videos: [
          { id: '9qj77xJ6gjc', titre: 'WeFiiT Live', legende: 'WeFiiT Live - The Product Builder Show' },
          { id: 'ieVvuySbfHs', titre: 'WeFiiT Live Décembre 2025', legende: 'WeFiiT Live - Décembre 2025' },
          { id: 'aI5jmMEL5jg', titre: 'WeFiiT Live édition We.Sea', legende: 'WeFiiT Live - Édition We.Sea' },
          { id: 'PWjXb1Tc9eU', titre: "Kermesse de l'Université WeFiiT", legende: "Kermesse de l'Université WeFiiT 🎓" },
        ],
      },
      {
        id: 0,
        nom: 'We.Share & Afterworks',
        description:
          'Voyage, sport, gastronomie, art ; et si les passions étaient contagieuses ? Un ou plusieurs WeFiiTers nous partagent une expérience, un savoir-faire, un talent, une aventure... On a hâte de découvrir les tiennes !',
        videos: [
          { id: '7nBMmFm06v4', titre: 'We.Share magique', legende: 'We.Share magique ! 🪄' },
          { id: 'etNcPdHOB9M', titre: 'We.Share Musique', legende: 'We.Share Musique 🎵' },
          { id: 'rfbRoSief58', titre: 'We.Share Voyage', legende: 'We.Share Voyage ✈️' },
          { id: '1rXx5LouUKE', titre: 'We.Share édition We.Act', legende: 'We.Share - Édition We.Act 🎭' },
        ],
      },
    ]}
    conclusion="Et quand des WeFiiTers partagent une passion commune, de nouveaux rituels voient le jour pour faire vivre l'équipe : <strong>We.Swim, Nous.Lisons, We.Act</strong>, et bien d'autres encore."
  />
);
