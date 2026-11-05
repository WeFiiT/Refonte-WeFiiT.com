// Accès aux contenus CMS (cas clients, formations, articles) sous forme de cartes prêtes pour
// le composant GrilleCartes. Une page demande « ces éléments », sans savoir d'où ils viennent.
//
// Aujourd'hui : lecture de l'instantané ./instantane.ts (relevé sur wefiit.com).
// Demain : lecture de l'API Webflow au moment du build (clé dans astro/.env, variable
// WEBFLOW_TOKEN, jamais commitée) : seules les fonctions de ce fichier changeront, pas les
// pages ni les composants. Restent à récupérer avec la clé : les ids des collections cas
// clients et formations (Blog = 65292e6cbddf8430fba2ee60) et le nom de leurs champs.
import { casClients, formations, articles } from './instantane';

type Carte = {
  titre: string;
  lien: string;
  image?: string;
  alt?: string;
  surtitre?: string;
  texte?: string;
  tags?: string[];
  auteur?: string;
  date?: string;
  lire?: string;
};

// Garde l'ordre demandé ; un slug absent de la collection est signalé au build.
const choisir = <T extends { slug: string }>(collection: T[], slugs: string[], nom: string): T[] =>
  slugs.map((s) => {
    const e = collection.find((c) => c.slug === s);
    if (!e) throw new Error(`CMS : « ${s} » introuvable dans la collection ${nom}`);
    return e;
  });

const dateFr = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

export const cartesCasClients = (slugs: string[]): Carte[] =>
  choisir(casClients, slugs, 'cas clients').map((c) => ({
    titre: c.titre,
    lien: `/user-stories/${c.slug}`,
    image: c.image,
    alt: c.alt,
    surtitre: `${c.offre} | ${c.client}`, // ordre affiché sur le site : expertise puis client
    tags: c.tags,
  }));

export const cartesFormations = (slugs: string[]): Carte[] =>
  choisir(formations, slugs, 'formations').map((f) => ({
    titre: f.titre,
    lien: `/formations/${f.slug}`,
    image: f.image,
    surtitre: f.accroche,
    tags: [f.categorie],
  }));

export const cartesArticles = (slugs: string[]): Carte[] =>
  choisir(articles, slugs, 'articles').map((a) => ({
    titre: a.titre,
    lien: `/blog/${a.slug}`,
    image: a.image,
    auteur: a.auteur,
    date: dateFr(a.date),
    lire: "Lire l'article",
  }));
