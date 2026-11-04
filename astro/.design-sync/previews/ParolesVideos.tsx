// Aperçu de ParolesVideos : « Paroles de WeFiiTers » de la page Équipe, avec ses trois
// vidéos (src/contenu/equipe.ts, bloc 05-paroles ; faute « Recontrez » d'origine conservée).
import { ParolesVideos } from 'wefiit-com';

export const ParolesDeWefiiters = () => (
  <ParolesVideos
    id="apercu-paroles"
    titre="Paroles de WeFiiTers"
    intro="<em>« Diriger, c’est avant tout savoir bien s’entourer »</em> : une conviction que les WeFiiTers incarnent au quotidien. À travers ces vidéos, il·elle·s partagent leur rôle, leur manière de travailler et ce qui les a amenés à rejoindre l’aventure WeFiiT."
    videos={[
      { src: 'https://player.vimeo.com/video/1014693029', titre: 'Rencontrez Anne-Pauline - Product Manager', legende: 'Rencontrez Anne-Pauline - Product Manager' },
      { src: 'https://tube.rvere.com/embed?v=ueLmj4Ws03k', titre: 'Rencontrez Louis - Quality Analyst', legende: 'Rencontrez Louis - Quality Analyst' },
      { src: 'https://tube.rvere.com/embed?v=g9pShBUcTDI', titre: 'Rencontrez Alice - Product Owner', legende: 'Recontrez Alice - Product Owner' },
    ]}
    ctaTexte="REJOINS L'AVENTURE WEFIIT"
    ctaLien="https://www.welcometothejungle.com/fr/companies/wefiit/jobs"
  />
);
