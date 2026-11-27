// Questions fréquentes en accordéon. Version composant du bloc neutre de Paul
// (blocs-neutres/faq-accordeon.html) : même balisage <details name> (une seule question
// ouverte à la fois, sans JavaScript), mêmes styles, ancres #question-N, et données
// structurées schema.org FAQPage générées à partir des props (utile au SEO et au GEO).
// Deuxième mode, par la prop `rubriques` : des rubriques numérotées qui sont elles-mêmes des
// volets (<details name>), chacune montrant à l'ouverture ses questions (H4) et leurs réponses
// écrites en entier (bloc « Questions fréquentes » de la page Culture).
// Composant React rendu en HTML statique par Astro ; l'ouverture par ancre et le secours
// des vieux navigateurs vivent dans FaqAccordeon.comportement.ts.
import { useEffect, useRef } from 'react';
import { init } from './FaqAccordeon.comportement';
import './FaqAccordeon.css';

export interface Question {
  question: string;
  reponse: string; // HTML autorisé (<p>, <a>, <strong>)
  // Mode `rubriques` seulement :
  id?: string; // ancre de la question (ex. « faq-onboarding »), qui ouvre sa rubrique quand on y accède
  reponseTexte?: string; // texte brut pour les données structurées, quand il diffère du texte affiché (pictos en SVG)
}
export interface Rubrique {
  id: string; // id du volet (ex. « faq-r-wefiit »)
  titre: string; // H3 du volet ; son numéro (1, 2, 3...) est ajouté devant
  questions: Question[]; // H4 + réponse, toutes visibles à l'ouverture du volet
}
// Identité des données structurées FAQPage, quand elles se rattachent à une page (@id, langue, WebPage).
export interface SchemaFaq {
  id: string; // @id de la FAQPage (ex. https://www.wefiit.com/culture#faq)
  langue?: string; // inLanguage (ex. fr-FR)
  pageId?: string; // @id de la WebPage à laquelle elle est rattachée (isPartOf)
}
export interface FaqAccordeonProps {
  titre: string; // sans le point final : il est ajouté en dégradé orange
  surtitre?: string; // eyebrow au-dessus du titre
  intro?: string;
  questions?: Question[]; // mode « questions » : un volet par question
  rubriques?: Rubrique[]; // mode « rubriques » : un volet par rubrique numérotée (prioritaire sur `questions`)
  schema?: SchemaFaq; // identité des données structurées ; absent : FAQPage sans @id
  groupe?: string; // valeur du name des <details> (un seul ouvert à la fois) ; par défaut l'id du composant
  idTitre?: string; // id du H2 (et aria-labelledby de la section) ; par défaut `<id>-titre`
  id?: string;
}

// Texte brut des réponses pour les données structurées (sans balises HTML, entités décodées).
const texteBrut = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
const reponseHtml = (html: string) => (/^\s*</.test(html) ? html : `<p>${html}</p>`);
// Le texte d'une question (H4) est injecté avec la réponse : on échappe ses caractères spéciaux.
const echapper = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Section de questions fréquentes en accordéon (une seule réponse ouverte à la fois),
 * avec surtitre et intro optionnels. Chaque question a une ancre #question-N et la section
 * embarque les données structurées FAQPage (SEO, GEO).
 */
export default function FaqAccordeon({ titre, surtitre, intro, questions = [], rubriques, schema, groupe, idTitre, id = 'wt-faq' }: FaqAccordeonProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);

  const nomGroupe = groupe ?? id;
  const idH2 = idTitre ?? `${id}-titre`;

  // Mode rubriques : les données structurées listent les questions de toutes les rubriques. Leur nom passe par
  // texteBrut (les espaces insécables de l'affichage deviennent des espaces simples).
  const toutes = rubriques ? rubriques.flatMap((r) => r.questions) : questions;
  const donnees = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(schema && {
      '@id': schema.id,
      ...(schema.langue && { inLanguage: schema.langue }),
      ...(schema.pageId && { isPartOf: { '@id': schema.pageId } }),
    }),
    mainEntity: toutes.map((q) => ({
      '@type': 'Question',
      name: rubriques ? texteBrut(q.question) : q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.reponseTexte ?? texteBrut(q.reponse) },
    })),
  };

  return (
    <section ref={ref} className="wt-faq" id={id} aria-labelledby={idH2}>
      <header className="wtq-head">
        {surtitre && (
          <p className="wtq-eyebrow">
            <span className="wtq-eyebrow-line"></span>
            {surtitre}
          </p>
        )}
        <h2 className="wtq-title" id={idH2}>
          {titre}
          <span className="wtq-title-dot">.</span>
        </h2>
        {intro && <p className="wtq-intro">{intro}</p>}
      </header>

      {rubriques ? (
        <div className="wtq-rubriques">
          {rubriques.map((r, i) => (
            <details className="wtq-item wtq-rubrique-item" id={r.id} name={nomGroupe} key={r.id}>
              <summary className="wtq-q">
                <span className="wtq-rubrique-num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="wtq-rubrique">{r.titre}</h3>
                <span className="wtq-icon" aria-hidden="true"></span>
              </summary>
              <div className="wtq-a">
                {r.questions.map((q, j) => (
                  // Réponses issues de nos fichiers de contenu (jamais d'un visiteur) : HTML injecté sans risque.
                  // Le H4 et la réponse sont injectés ensemble pour rester frères dans le bloc de la question.
                  <div
                    className="wtq-qa"
                    id={q.id}
                    key={q.id ?? j}
                    dangerouslySetInnerHTML={{ __html: `<h4 class="wtq-qa-q">${echapper(q.question)}</h4>${reponseHtml(q.reponse)}` }}
                  />
                ))}
              </div>
            </details>
          ))}
        </div>
      ) : (
        <div className="wtq-list">
          {questions.map((q, i) => (
            <details className="wtq-item" id={`question-${i + 1}`} name={nomGroupe} key={i}>
              <summary className="wtq-q">
                <span className="wtq-q-text">{q.question}</span>
                <span className="wtq-icon" aria-hidden="true" />
              </summary>
              {/* Réponses issues de nos fichiers de contenu (jamais d'un visiteur) : HTML injecté sans risque. */}
              <div className="wtq-a" dangerouslySetInnerHTML={{ __html: reponseHtml(q.reponse) }} />
            </details>
          ))}
        </div>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }} />
    </section>
  );
}
