// Données structurées (JSON-LD schema.org) d'une page : WebPage, fil d'Ariane et lieu.
// Version composant du bloc pages/culture/blocs/13-donnees-structurees.html : même contenu,
// même structure, générée depuis les props. Aucun rendu visuel (un simple <script>).
// L'organisation (@id organisationId) et le WebSite sont déclarés une fois sur tout le site :
// on s'y réfère par leur @id sans les redéclarer. Un éventuel FAQPage (composant FaqAccordeon)
// se rattache à cette page par isPartOf.
// À tenir à jour : url (adresse définitive), nom et description (mêmes valeurs que le titre SEO
// et la méta description réglés dans Webflow, Page Settings), dateModification.
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur).

export interface ElementFilAriane {
  nom: string;
  url: string;
}
export interface Horaires {
  jours: string[]; // noms anglais schema.org : « Monday », « Tuesday »...
  ouverture: string; // « 08:30 »
  fermeture: string; // « 19:00 »
}
export interface LieuPage {
  ancre: string; // fin de l'@id du lieu : « wojo » donne « <url de la page>#wojo »
  nom: string;
  url?: string;
  adresse: { rue: string; codePostal: string; ville: string; pays: string }; // pays = code ISO, ex. « FR »
  horaires?: Horaires[];
}
export interface DonneesStructureesProps {
  url: string; // adresse définitive de la page
  nom: string; // identique au titre SEO réglé dans Webflow
  description: string; // identique à la méta description réglée dans Webflow
  dateModification: string; // AAAA-MM-JJ, date de la dernière mise à jour du contenu
  imagePrincipale?: { url: string; largeur: number; hauteur: number };
  filAriane: ElementFilAriane[]; // du plus haut au plus bas : Accueil, puis la page
  lieu?: LieuPage; // lieu dont parle la page (contentLocation)
  types?: string[]; // par défaut WebPage + AboutPage
  langue?: string;
  site?: { nom: string; url: string };
  organisationId?: string;
}

/**
 * Données structurées d'une page (WebPage, BreadcrumbList et, si fourni, Place) injectées dans
 * un script JSON-LD. Les identifiants @id sont dérivés de l'adresse de la page.
 */
export default function DonneesStructurees({
  url,
  nom,
  description,
  dateModification,
  imagePrincipale,
  filAriane,
  lieu,
  types = ['WebPage', 'AboutPage'],
  langue = 'fr-FR',
  site = { nom: 'WeFiiT', url: 'https://www.wefiit.com' },
  organisationId = 'https://www.wefiit.com/#organization',
}: DonneesStructureesProps) {
  const idPage = `${url}#webpage`;
  const idFilAriane = `${url}#breadcrumb`;
  const idLieu = lieu ? `${url}#${lieu.ancre}` : undefined;

  const page = {
    '@type': types,
    '@id': idPage,
    url,
    name: nom,
    description,
    inLanguage: langue,
    isPartOf: { '@type': 'WebSite', name: site.nom, url: site.url },
    about: { '@id': organisationId },
    publisher: { '@id': organisationId },
    ...(imagePrincipale && {
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imagePrincipale.url,
        width: imagePrincipale.largeur,
        height: imagePrincipale.hauteur,
      },
    }),
    breadcrumb: { '@id': idFilAriane },
    dateModified: dateModification,
    ...(idLieu && { contentLocation: { '@id': idLieu } }),
  };

  const filArianeLd = {
    '@type': 'BreadcrumbList',
    '@id': idFilAriane,
    itemListElement: filAriane.map((e, i) => ({ '@type': 'ListItem', position: i + 1, name: e.nom, item: e.url })),
  };

  const lieuLd = lieu && {
    '@type': 'Place',
    '@id': idLieu,
    name: lieu.nom,
    ...(lieu.url && { url: lieu.url }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: lieu.adresse.rue,
      postalCode: lieu.adresse.codePostal,
      addressLocality: lieu.adresse.ville,
      addressCountry: lieu.adresse.pays,
    },
    ...(lieu.horaires && {
      openingHoursSpecification: lieu.horaires.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.jours,
        opens: h.ouverture,
        closes: h.fermeture,
      })),
    }),
  };

  const donnees = { '@context': 'https://schema.org', '@graph': [page, filArianeLd, ...(lieuLd ? [lieuLd] : [])] };

  // Le JSON vient de nos fichiers de contenu (jamais d'un visiteur) ; « < » est tout de même
  // échappé pour qu'un texte contenant « </script> » ne puisse pas fermer la balise.
  const json = JSON.stringify(donnees).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
