# Refonte WeFiiT.com

Blocs et pages du site wefiit.com, construits en HTML/CSS/JS autonome puis collés dans des éléments **Embed** de Webflow.

L'idée : chacun peut connecter ce repo à son Claude Code et construire ou modifier des blocs seul, en partant de ce qui est déjà validé plutôt que de repartir de zéro.

## Organisation

```
.
├── README.md
├── design-system.md      couleurs, typographie, espacements, conventions de code, pièges déjà rencontrés
├── library.md            catalogue des blocs existants et des patterns réutilisables
├── blocks/
│   └── equipe/           les 7 blocs de la page Équipe (un fichier = un bloc)
└── pages/
    └── equipe/
        └── equipe.html   la page Équipe assemblée (les 7 blocs mis bout à bout)
```

Règle de rangement : un dossier par page dans `blocks/` et dans `pages/`. Un nouveau bloc va dans `blocks/<page>/`, la page assemblée dans `pages/<page>/`.

## La page Équipe

Blocs, dans l'ordre de la page :

| Bloc | Fichier |
|---|---|
| Faire partie de l'équipe WeFiiT (titre + photo) | `blocks/equipe/hero-equipe.html` |
| WeFiiT en 2025 c'était ça (vidéo) | `blocks/equipe/wefiit-2025.html` |
| Un cadre pour t'engager, évoluer et durer | `blocks/equipe/cadre-sans-photos.html` |
| Paroles de WeFiiTers (vidéos) | `blocks/equipe/paroles.html` |
| S'épanouir grâce au collectif (onglets + vidéos + témoignage) | `blocks/equipe/collectif.html` |
| Construire ensemble le WeFiiT de demain (tribes) | `blocks/equipe/tribes.html` |
| Photo pleine largeur avant le footer | `blocks/equipe/photo-pleine-largeur.html` |

`pages/equipe/equipe.html` est la concaténation de ces 7 fichiers, dans cet ordre, entre un `<head>` minimal et `</body></html>`. Elle sert à voir l'ensemble dans un navigateur, pas à être collée dans Webflow : dans Webflow, chaque bloc est collé séparément dans son propre Embed.

## Travailler avec Claude Code

1. Cloner le repo et ouvrir Claude Code dans le dossier.
2. Lui demander de lire `design-system.md` et `library.md` avant de construire quoi que ce soit.
3. Un bloc est un fichier unique : une balise `<section id="wt-...">` qui contient son `<style>` (scopé sur cet id) et son `<script>`. Il ne dépend de rien d'autre. Les conventions complètes (variables locales, marges, accessibilité, garde d'initialisation du script...) sont dans `design-system.md`.
4. Vérifier le résultat dans un navigateur, puis coller le contenu du fichier dans un Embed Webflow.
5. Si le bloc modifié fait partie d'une page assemblée, régénérer la page (concaténer à nouveau les blocs dans l'ordre) pour que `pages/` reste cohérent avec `blocks/`.

## Points d'attention

- **Webflow n'est pas synchronisé avec ce repo.** Modifier un bloc ici ne change rien sur le site tant que son contenu n'a pas été recollé dans l'Embed correspondant. Inversement, un bloc modifié directement dans Webflow n'est pas répercuté ici.
- **Certains blocs de ce repo peuvent être en avance sur Webflow** (modifications faites ici et pas encore recollées, par exemple les vignettes vidéo en chargement différé de `collectif.html`). En cas de doute avant de modifier un bloc, comparer avec le code actuel de l'Embed.
- **Les vidéos YouTube peuvent afficher une erreur 153** quand `pages/equipe/equipe.html` est ouvert directement depuis le disque (`file://`). C'est une limite de YouTube hors d'un vrai site, pas un bug du bloc.
- Le fichier `cadre-sans-photos.html` garde son nom historique alors qu'il contient désormais une photo.
- La page **Culture** est en cours de construction et n'est pas encore publiée dans ce repo. Certaines références dans `design-system.md` et `library.md` y renvoient.
