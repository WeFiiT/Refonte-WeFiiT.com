// Comportements des composants interactifs (onglets, carrousels, menu...), chargés par le
// layout sur toutes les pages. Les composants React sont rendus en HTML au build, sans React
// chez le visiteur : c'est ce script qui leur branche leur comportement, bloc par bloc.
// Le même code sert aux composants React dans Claude Design (via leur useEffect).
// Tout fichier src/components/<Nom>.comportement.ts (qui exporte `selecteur` et `init(root)`)
// est pris en compte automatiquement : plus de liste à tenir à jour.
const modules = import.meta.glob<{ selecteur: string; init: (root: HTMLElement) => void }>('./components/*.comportement.ts', { eager: true });

for (const { selecteur, init } of Object.values(modules)) {
  document.querySelectorAll<HTMLElement>(selecteur).forEach((root) => init(root));
}
