// Aperçu de CadrePrincipes : « Un cadre pour t’engager, évoluer et impacter » de la page Équipe
// (src/contenu/equipe.ts, bloc 03-cadre), textes complets.
import { CadrePrincipes } from 'wefiit-com';

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';

export const Equipe = () => (
  <CadrePrincipes
    id="apercu-cadre"
    titre="Un cadre pour t’engager, évoluer et impacter"
    photo={`${CDN}65830dbb97aa2a27f503a401_Equipe%20-%20Tribe%20RH.webp`}
    intro="Avoir un rôle actif dans ta mission est le point initial de ton parcours, pas une finalité.<br><br>Chez WeFiiT, nous avons surtout à cœur de créer un cadre dans lequel tu peux t’inscrire dans la durée, progresser et t’impliquer selon ce qui te motive."
    suite="Ton évolution chez WeFiiT se construit avec toi : en fonction de tes envies, de tes forces et des opportunités que tu choisis de saisir.<br><br>Il ne s’agit pas de suivre une trajectoire toute tracée dans un cadre imposé, mais de construire ta propre trajectoire dans un environnement sain, où tu as des perspectives et de l’horizon pour faire grandir, à ton rythme, ton <strong>impact</strong>, tes <strong>compétences</strong> et ton <strong>rôle au sein du collectif</strong>.<br><br>Cette évolution s’appuie sur ce qui te motive : devenir spécialiste Produit, apprendre, faire partie d’une équipe et co-construire, en mission comme en interne."
    accroche="En rejoignant WeFiiT, tu intègres un environnement qui te permet de :"
    points={[
      { titre: 'Devenir spécialiste Produit', texte: 'T’investir pleinement en mission, affiner ton expertise et faire reconnaître ton impact, auprès des clients comme en interne.' },
      { titre: 'Apprendre', texte: 'Développer tes compétences au fil des expériences, avec un cadre de soutien, d’échange et de feedback.' },
      { titre: 'Faire partie d’une équipe', texte: 'T’impliquer dans la vie de l’équipe et faire grandir ton rôle au sein d’un collectif, en mission comme en interne.' },
      { titre: 'Co-construire', texte: 'Participer à la construction du WeFiiT de demain en t’investissant sur des initiatives clés.' },
    ]}
  />
);
