// Section « Des parcours qui se complètent » : en-tête centré (surtitre, H2, chapô), puis les
// chiffres clés avec parité et secteurs (ChiffresParcours), puis un texte avec vidéo en façade
// (TexteVideo). Version composant du bloc pages/culture/blocs/06-equipe.html, qui est une seule
// <section> : ce parent garde la racine (classe et id du bloc, celle de la portée CSS et des
// comportements) et assemble les deux composants internes dans l'ordre du bloc d'origine.
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur).
import { useEffect, useRef } from 'react';
import ChiffresParcours, { type ChiffresParcoursProps } from './ChiffresParcours';
import { init as initChiffres } from './ChiffresParcours.comportement';
import TexteVideo, { type TexteVideoProps } from './TexteVideo';
import './ParcoursEquipe.css';

export interface ParcoursEquipeProps {
  surtitre: string;
  titre: string; // sans le point final : il est ajouté en orange
  chapo: string;
  chiffres: ChiffresParcoursProps;
  texteVideo: TexteVideoProps;
  id?: string;
  idTitre?: string; // id du H2, lu par aria-labelledby
}

/**
 * Section de présentation d'une équipe : en-tête, chiffres clés, parité, secteurs, puis texte et vidéo.
 * Le comportement de TexteVideo est branché par son propre useEffect (il a une racine à lui).
 */
export default function ParcoursEquipe({ surtitre, titre, chapo, chiffres, texteVideo, id = 'wt-notre-equipe', idTitre = 'wte-title' }: ParcoursEquipeProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) initChiffres(ref.current);
  }, []);

  return (
    <section ref={ref} className="wt-notre-equipe" id={id} aria-labelledby={idTitre}>
      <header className="wte-head">
        <p className="wte-eyebrow">
          <span className="wte-eyebrow-line"></span>
          {surtitre}
        </p>
        <h2 className="wte-title" id={idTitre}>
          {titre}
          <span className="wte-title-dot">.</span>
        </h2>
        <p className="wte-lead">{chapo}</p>
      </header>

      <ChiffresParcours {...chiffres} />
      <TexteVideo {...texteVideo} />
    </section>
  );
}
