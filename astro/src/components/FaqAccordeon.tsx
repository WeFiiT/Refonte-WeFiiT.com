// Questions fréquentes en accordéon. Version composant du bloc neutre de Paul
// (blocs-neutres/faq-accordeon.html) : même balisage <details name> (une seule question
// ouverte à la fois, sans JavaScript), mêmes styles, ancres #question-N, et données
// structurées schema.org FAQPage générées à partir des props (utile au SEO et au GEO).
// Composant React rendu en HTML statique par Astro ; l'ouverture par ancre et le secours
// des vieux navigateurs vivent dans FaqAccordeon.comportement.ts.
import { useEffect, useRef } from 'react';
import { init } from './FaqAccordeon.comportement';
import './FaqAccordeon.css';

export interface Question {
  question: string;
  reponse: string; // HTML autorisé (<p>, <a>, <strong>)
}
export interface FaqAccordeonProps {
  titre: string; // sans le point final : il est ajouté en dégradé orange
  surtitre?: string; // eyebrow au-dessus du titre
  intro?: string;
  questions: Question[];
  id?: string;
}

// Texte brut des réponses pour les données structurées (sans balises HTML).
const texteBrut = (html: string) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const reponseHtml = (html: string) => (/^\s*</.test(html) ? html : `<p>${html}</p>`);

/**
 * Section de questions fréquentes en accordéon (une seule réponse ouverte à la fois),
 * avec surtitre et intro optionnels. Chaque question a une ancre #question-N et la section
 * embarque les données structurées FAQPage (SEO, GEO).
 */
export default function FaqAccordeon({ titre, surtitre, intro, questions, id = 'wt-faq' }: FaqAccordeonProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);

  const donnees = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: texteBrut(q.reponse) },
    })),
  };

  return (
    <section ref={ref} className="wt-faq" id={id} aria-labelledby={`${id}-titre`}>
      <header className="wtq-head">
        {surtitre && (
          <p className="wtq-eyebrow">
            <span className="wtq-eyebrow-line"></span>
            {surtitre}
          </p>
        )}
        <h2 className="wtq-title" id={`${id}-titre`}>
          {titre}
          <span className="wtq-title-dot">.</span>
        </h2>
        {intro && <p className="wtq-intro">{intro}</p>}
      </header>

      <div className="wtq-list">
        {questions.map((q, i) => (
          <details className="wtq-item" id={`question-${i + 1}`} name={id} key={i}>
            <summary className="wtq-q">
              <span className="wtq-q-text">{q.question}</span>
              <span className="wtq-icon" aria-hidden="true" />
            </summary>
            {/* Réponses issues de nos fichiers de contenu (jamais d'un visiteur) : HTML injecté sans risque. */}
            <div className="wtq-a" dangerouslySetInnerHTML={{ __html: reponseHtml(q.reponse) }} />
          </details>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }} />
    </section>
  );
}
