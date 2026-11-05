# Notes design-sync (WeFiiT.com)

Projet Claude Design : « WeFiiT.com Design System », https://claude.ai/design/p/48ac127e-756c-4882-b1e8-68fbb6bff717. Premier envoi le 2026-11-04 (3 composants), puis les 17 le même jour.

**Depuis le 2026-11-04, le design system est un artefact Claude** : https://claude.ai/artifact/XsQkBzshq5qycJ8oPYMvJZ (type « Design System », migré depuis le projet Claude Design). `DesignSync write_files` est refusé (« This design system moved to Claude »). Envoi actuel : copier `ds-bundle/` (sans `_ds_sync.json`, `_ds_needs_recompile`, `_vendor/`, `_screenshots/`) sous `.design-sync/.cache/envoi-ds/project/`, puis Artifact `publish` avec `url` = l'artefact, `root` = `envoi-ds` (chemin long, pas `ANTOIN~1` : bloqué par la règle de lecture), `files` = `project/<chemin>` ; `.d.ts` et `.jsx` avec `contentType: "text/plain"`. Le système est encore dans l'ancien format (index `editing: "off"`, `source`) : sa conversion au format natif (`components/bundle.js`, `components/<Nom>/README.md` + `preview.html`, `tokens.json`) reste à faire.

## Particularités de ce repo

- Pas de `dist/` : le repo est un site Astro, pas un paquet. Le point d'entrée est `src/design-system/index.ts` (cfg.entry), qui ré-exporte par nom les composants React (ils sont en `export default`). **Ajouter chaque nouveau composant à cet index ET à `componentSrcMap`.**
- **Props** : `cfg.buildCmd` (`node .design-sync/generer-types.mjs`) génère les `.d.ts` dans `astro/types/` (gitignoré) à partir des `.tsx`, avec le TypeScript embarqué par ts-morph. Le convertisseur les trouve tout seul (dossier `types/`). **Lancer le buildCmd avant chaque build**, sinon les props sont celles de la dernière génération.
- **Fork `overrides/dts.mjs`** (déclaré dans `cfg.libOverrides`) : ajoute en prelude du `.d.ts` émis les types imbriqués du repo (`Tribe`, `Cta`, `Carte`...). Sans lui, l'agent voit `tribes: Tribe[]` sans définition. ts-morph y est chargé par `createRequire` depuis `.ds-sync/` (pas de lien symbolique `.design-sync/node_modules` : sous Windows/msys, `ln -s` copie au lieu de lier). À la mise à jour de la skill, comparer avec `lib/dts.mjs`.
- Les commentaires `//` des props ne passent pas dans les `.d.ts` (seuls les `/** */` passent) : le détail d'usage est dans les fiches `.design-sync/docs/<Nom>.md` (frontmatter `category` = groupe).
- Comportements (onglets, carrousels...) : dans `src/components/<Nom>.comportement.ts`. Les composants les branchent par `useEffect`, donc ils marchent dans Claude Design (rendu navigateur).
- Polices servies par le CDN Webflow (URL absolues dans `src/styles/polices.css`, partagé avec le layout). Pas de fichiers de police dans le bundle.
- Playwright : épinglé en 1.62.1 dans `.ds-sync/` pour correspondre au chromium-1234 en cache (la dernière version demande 1248, absent).
- Tous les composants sauf `Bouton` en `cardMode: column` avec viewport 1280 de large : sous 991px, les grilles passent à 2 colonnes et les cartes étaient coupées.

## Commandes

```bash
node .design-sync/generer-types.mjs
node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --out ./ds-bundle
node .ds-sync/package-validate.mjs ./ds-bundle
node .ds-sync/package-capture.mjs --out ./ds-bundle
```

## Known render warns

Aucun.

## Re-sync risks

- Les aperçus (`previews/`) reprennent des textes et images du site relevés le 2026-11-03/04 (contenus `src/contenu/*.ts` et instantané CMS) : si le site change, les aperçus restent sur l'ancien contenu (sans gravité, ce sont des exemples).
- Le fork `overrides/dts.mjs` peut diverger de la version de la skill.
- Les polices dépendent du CDN Webflow : si Webflow est abandonné, il faudra héberger les fichiers et passer par `cfg.extraFonts`.
