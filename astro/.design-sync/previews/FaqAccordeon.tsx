// Aperçu de FaqAccordeon : « Foire aux Questions » de /product-management
// (src/contenu/product-management.ts), 3 questions sur 5. Une seule cellule : les ancres
// question-N ne dépendent pas de l'id et se répéteraient entre deux instances.
import { FaqAccordeon } from 'wefiit-com';

export const ProductManagement = () => (
  <FaqAccordeon
    id="apercu-faq"
    titre="Foire aux Questions"
    questions={[
      {
        question: 'Qui sommes-nous ?',
        reponse:
          'WeFiiT est un cabinet de conseil français spécialisé en <a href="#">Product Management</a>, fondé en 2019 à Paris. Nous accompagnons grandes entreprises - Accor, Louis Vuitton, FDJ, France TV - et scale-ups pour structurer, renforcer et faire grandir leurs équipes Produit. Avec 110 consultants, plus de 200 missions réalisées et un CSAT client supérieur à 9/10, WeFiiT intervient en conseil, immersion et formation sur l\'ensemble du spectre produit.',
      },
      {
        question: "Dans quels secteurs d'activité sommes-nous présents ?",
        reponse:
          "Nous accompagnons des entreprises dans des secteurs variés : hôtellerie et luxe (Accor, Louis Vuitton), retail et sport (Decathlon), legal tech (LexisNexis), immobilier (SeLoger), médias (France TV, Le Parisien), jeux (FDJ) ou encore foodtech (ePack Pro). Nos consultants basés à Paris s'adaptent aux spécificités métier de chaque secteur pour délivrer un impact business mesurable.",
      },
      {
        question: "Quels sont nos retours d'expérience en IA et Data ?",
        reponse:
          "Chez LexisNexis, nous avons accompagné le développement de Lexis+ AI, une solution d'IA générative pour les professionnels du droit. Chez Decathlon, nous avons construit la solution de calcul d'empreinte carbone de ses produits. Chez Energisme, nous avons transformé la plateforme de monitoring énergétique en outil d'aide à la décision exploitant des millions de données quotidiennes.",
      },
    ]}
  />
);
