# Refonte WeFiiT.com

Blocs et pages du site wefiit.com, construits en HTML, CSS et JS autonomes puis collés dans des éléments **Embed** de Webflow.

L'idée : chacun peut connecter ce repo à son Claude Code et construire ou modifier des blocs seul, en partant de ce qui est déjà validé plutôt que de repartir de zéro.

**Nouveau sur le repo ?** Commence par [docs/prise-en-main.md](docs/prise-en-main.md).

## Voir les blocs

Ouvre `librairie/index.html` dans un navigateur (double-clic, rien à installer) : tous les **blocs neutres** en aperçu, rangés par typologie, avec un bouton « Copier le code ».

## Organisation

```
.
├── README.md
├── blocs-neutres/        les blocs réutilisables, sans contenu (lorem ipsum, photos à venir)
├── pages/
│   └── equipe/
│       ├── blocs/        les blocs réels de la page, numérotés dans l'ordre (01-hero.html, 02-…)
│       └── equipe.html   la page assemblée (généré, ne pas modifier à la main)
├── librairie/            la librairie visuelle des blocs neutres (index.html généré)
├── docs/
│   ├── prise-en-main.md          guide pour démarrer
│   ├── design-system.md          référence unique : couleurs, typographie, espacements, conventions de code
│   └── catalogue-des-blocs.md    les blocs existants et leurs patterns réutilisables
└── outils/
    └── assembler-page.sh         génère pages/<page>/<page>.html
```

Deux jeux de blocs, deux usages :
- **`blocs-neutres/`** : pour **construire** quelque chose de nouveau. Chaque fichier est un bloc complet, vide, à copier puis à remplir. Un bloc qui relève de plusieurs typologies (par exemple les onglets avec galerie de vidéos, rangés dans « Vidéo » et dans « Onglets et galeries ») est un seul fichier.
- **`pages/<page>/blocs/`** : pour **modifier** une page existante. Ce sont les blocs tels qu'ils sont (ou seront) collés dans Webflow, avec leur contenu.

Règle de rangement : un dossier par page dans `pages/`. Un nouveau bloc de page va dans `pages/<page>/blocs/` et s'appelle `<NN>-<nom-court>.html`, où `NN` est sa position dans la page.

## La page Équipe

Blocs, dans l'ordre de la page :

| N° | Bloc | Fichier |
|---|---|---|
| 01 | Faire partie de l'équipe WeFiiT (titre et photo) | `pages/equipe/blocs/01-hero.html` |
| 02 | WeFiiT en 2025 c'était ça (vidéo) | `pages/equipe/blocs/02-wefiit-2025.html` |
| 03 | Un cadre pour t'engager, évoluer et durer | `pages/equipe/blocs/03-cadre.html` |
| 04 | Témoignage de Yamila | `pages/equipe/blocs/04-temoignage-yamila.html` |
| 05 | Paroles de WeFiiTers (vidéos) | `pages/equipe/blocs/05-paroles.html` |
| 06 | S'épanouir grâce au collectif (onglets et vidéos) | `pages/equipe/blocs/06-collectif.html` |
| 07 | Témoignage d'Anne-Claire | `pages/equipe/blocs/07-temoignage-anne-claire.html` |
| 08 | Construire ensemble le WeFiiT de demain (Tribes) | `pages/equipe/blocs/08-tribes.html` |
| 09 | Témoignage de Guillaume | `pages/equipe/blocs/09-temoignage-guillaume.html` |
| 10 | Photo pleine largeur avant le footer | `pages/equipe/blocs/10-photo-pleine-largeur.html` |

Les témoignages sont des blocs à part : chacun **prolonge le bloc qui le précède** (même bande de couleur pour 04 et 07). Ils doivent donc se suivre directement dans la page.

`pages/equipe/equipe.html` met ces 10 fichiers bout à bout. Elle sert à voir l'ensemble dans un navigateur, pas à être collée dans Webflow (un bloc = un Embed).

## Travailler avec Claude Code

1. Cloner le repo et ouvrir Claude Code dans le dossier.
2. Lui demander de lire `docs/design-system.md` et `docs/catalogue-des-blocs.md` avant de construire quoi que ce soit.
3. **Nouvelle page** : partir des blocs de `blocs-neutres/` (le catalogue dit lesquels existent et à quoi ils servent). **Page existante** : modifier les blocs de `pages/<page>/blocs/`.
4. Un bloc est un fichier unique : une balise `<section id="wt-...">` qui contient son `<style>` (scopé sur cet id) et son `<script>`. Il ne dépend de rien d'autre. Les conventions complètes (variables locales, marges, accessibilité, garde d'initialisation du script) sont dans `docs/design-system.md`.
5. Vérifier le résultat dans un navigateur, puis coller le contenu du fichier dans l'Embed Webflow correspondant.
6. Après une modification, régénérer ce qui en dépend :
   - la page assemblée : `bash outils/assembler-page.sh equipe`
   - la librairie : `bash librairie/build.sh`

## Points d'attention

- **Webflow n'est pas synchronisé avec ce repo.** Modifier un bloc ici ne change rien sur le site tant que son contenu n'a pas été recollé dans l'Embed correspondant. Inversement, un bloc modifié directement dans Webflow n'est pas répercuté ici.
- **Certains blocs peuvent être en avance sur Webflow** (modifications faites ici et pas encore recollées). Avant de modifier un bloc, compare avec le code actuel de l'Embed.
- **Les blocs neutres sont des modèles**, pas des blocs prêts à publier : textes en lorem ipsum, photos et vidéos à renseigner (les commentaires du code disent où). Leurs identifiants internes (`#wt-…`) sont ceux des blocs de pages : si deux blocs de même type se retrouvent sur une même page, renomme l'identifiant de l'un d'eux.
- **Les vidéos YouTube peuvent afficher une erreur 153** quand une page est ouverte directement depuis le disque (`file://`). C'est une limite de YouTube hors d'un vrai site, pas un bug du bloc.
- **Les identifiants internes des blocs** (`#wt-cadrec`, `#wt-collectif`…) ne suivent pas les noms de fichiers : ils sont propres à chaque bloc et déjà collés dans Webflow. Ne les renomme pas sans recoller le bloc.
- La page **Culture** est en cours de construction et n'est pas encore publiée dans ce repo.
