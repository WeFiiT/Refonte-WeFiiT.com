// Aperçu de CadrePrincipes : « Un cadre pour t’engager, évoluer et durer » de la page Équipe
// (src/contenu/equipe.ts, bloc 03-cadre), textes complets.
import { CadrePrincipes } from 'wefiit-com';

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';

export const Equipe = () => (
  <CadrePrincipes
    id="apercu-cadre"
    titre="Un cadre pour t’engager, évoluer et durer"
    photo={`${CDN}65830dbb97aa2a27f503a401_Equipe%20-%20Tribe%20RH.webp`}
    intro="Avoir un rôle actif dans ta mission est un point de départ, pas une finalité.<br><br>Chez WeFiiT, nous avons surtout à cœur de créer un cadre dans lequel tu peux t’inscrire dans la durée, progresser et t’impliquer selon ce qui te motive."
    suite="Ton évolution chez WeFiiT se construit avec toi : en fonction de tes envies, de tes forces et des opportunités que tu choisis de saisir.<br><br>Il ne s’agit pas de suivre une trajectoire toute tracée ou de gravir une échelle hiérarchique, mais de faire grandir progressivement ton <span>impact</span>, tes <strong>compétences</strong> et ton <strong>rôle au sein du collectif</strong>, à ton rythme.<br><br>Cette évolution s’appuie sur trois dimensions complémentaires : développer ton expertise, t’impliquer dans la vie de l’équipe et créer de l’impact, en mission comme en interne."
    accroche="En rejoignant WeFiiT, tu intègres un environnement qui te permet de :"
    points={[
      { accent: 'T’investir pleinement en mission', reste: ', tout en bénéficiant d’un cadre de soutien, d’échange et de feedback' },
      { accent: 'Co-construire', reste: ' le WeFiiT de demain en t’investissant sur des initiatives clés' },
      { accent: 'Faire évoluer ton rôle et tes responsabilités', reste: ' au fil des expériences, sans parcours figé ni trajectoire imposée' },
      { accent: 'Développer tes compétences', reste: ', affiner tes expertises et faire reconnaître ton impact, auprès des clients comme en interne' },
    ]}
  />
);
