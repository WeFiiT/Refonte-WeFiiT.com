# Prise en main

Ce guide est pour quelqu'un qui découvre le repo et va gérer les blocs du site. Il ne suppose aucune connaissance de GitHub.

## 1. Récupérer le repo

Le repo est ici : https://github.com/WeFiiT/Refonte-WeFiiT.com (il faut un compte GitHub qui a accès à l'organisation WeFiiT).

La façon la plus simple :
1. Installe **GitHub Desktop** (https://desktop.github.com) et connecte ton compte.
2. Menu **File > Clone repository**, onglet **URL**, colle l'adresse du repo, choisis un dossier sur ton ordinateur, **Clone**.

Tu obtiens un dossier avec tous les fichiers. Pour récupérer plus tard les changements des autres : bouton **Fetch origin**, puis **Pull origin**.

## 2. Regarder les blocs

Ouvre le fichier `librairie/index.html` par double-clic. Tu vois tous les blocs neutres en aperçu, tu peux filtrer par type (vidéo, onglets, texte et photo, témoignage…) et copier le code d'un bloc avec **Copier le code**.

## 3. Comprendre ce qu'est un bloc

Un bloc est **un seul fichier** HTML. Il contient sa mise en forme (CSS) et son comportement (JS) et ne dépend de rien d'autre. Dans Webflow, un bloc correspond à **un élément Embed** : on ouvre l'Embed, on remplace son contenu par celui du fichier, on enregistre.

Il y a deux dossiers de blocs :
- `blocs-neutres/` : les blocs **vides et réutilisables** (lorem ipsum, photos « à venir »). C'est là qu'on part pour **construire** une nouvelle page.
- `pages/<page>/blocs/` : les blocs **réels** d'une page, avec leur contenu. C'est là qu'on **modifie** une page existante. Le numéro au début du nom est la position du bloc dans la page : `03-cadre.html` est le troisième bloc de la page Équipe.

## 4. Construire une nouvelle page

1. Ouvre la librairie et repère les blocs dont tu as besoin (le fichier `docs/catalogue-des-blocs.md` décrit chaque bloc).
2. Dans Claude Code, demande-lui de lire `docs/design-system.md` et `docs/catalogue-des-blocs.md`, puis de créer `pages/<ta-page>/blocs/` avec une copie des blocs choisis, numérotés dans l'ordre de la page (`01-…`, `02-…`), et d'y mettre ton contenu.
3. Pour chaque bloc, remplace les textes, les photos et les vidéos (les commentaires du code indiquent où). Demande-lui de ne changer que ce que tu demandes.
4. Ouvre le fichier dans un navigateur pour vérifier le résultat (sur ordinateur et en mobile).
5. Colle le contenu de chaque fichier dans un Embed Webflow.
6. Génère la page assemblée pour la voir d'un coup : `bash outils/assembler-page.sh <ta-page>`.

## 5. Modifier une page existante

1. Ouvre Claude Code dans le dossier du repo et demande-lui de lire `docs/design-system.md` et `docs/catalogue-des-blocs.md`.
2. Décris ce que tu veux changer, bloc par bloc, dans `pages/<page>/blocs/`.
3. Vérifie dans un navigateur, puis recolle le contenu du fichier dans l'Embed Webflow correspondant.
4. Régénère ce qui en dépend, depuis le dossier du repo :
   ```
   bash outils/assembler-page.sh equipe
   ```

## 6. Ajouter un nouveau bloc neutre

Si tu crées un bloc qui pourrait servir ailleurs, ajoute-le à `blocs-neutres/` (textes en lorem ipsum, photos et vidéos en emplacements), puis :
1. Ajoute une ligne dans `librairie/catalogue.txt` (titre, typologies séparées par des points-virgules, étiquettes, description).
2. Relance `bash librairie/build.sh`.
3. Ajoute-le à l'index de `docs/catalogue-des-blocs.md`.

## 7. Envoyer ses changements sur GitHub

Dans GitHub Desktop, tu vois la liste des fichiers modifiés :
1. Écris un résumé court en bas à gauche (« Corrige le titre mobile du bloc Paroles »).
2. **Commit to main** (ou sur une branche si tu veux une relecture avant).
3. **Push origin** pour envoyer.

## À savoir

- **Webflow n'est pas synchronisé avec le repo.** Modifier un fichier ici ne change rien sur le site tant que tu n'as pas recollé le code dans l'Embed.
- Ne renomme pas les identifiants à l'intérieur des blocs d'une page (`#wt-…`) : ils sont déjà collés dans Webflow. Dans un nouveau bloc copié depuis `blocs-neutres/`, renomme-les si deux blocs de même type se retrouvent sur la même page.
- Le style (couleurs, tailles, boutons) vient de `docs/design-system.md`. Si tu hésites sur une valeur, c'est la référence.
- Les vidéos YouTube peuvent afficher une erreur quand tu ouvres une page directement depuis ton disque : c'est normal, hors Webflow.
