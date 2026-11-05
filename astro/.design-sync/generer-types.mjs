// Génère les fichiers de types (.d.ts) des composants React dans astro/types/, à partir de
// src/design-system/index.ts. /design-sync y lit les props de chaque composant pour Claude
// Design : elles viennent ainsi toujours du code, jamais d'une copie à la main.
// À lancer avant chaque synchro (c'est le buildCmd de .design-sync/config.json).
// Utilise le TypeScript embarqué par ts-morph dans les outils de synchro (.ds-sync/), pas une
// dépendance du site.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { rmSync } from 'node:fs';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const { ts } = createRequire(join(racine, '.ds-sync', 'package.json'))('ts-morph');

const sortie = join(racine, 'types');
rmSync(sortie, { recursive: true, force: true });

const programme = ts.createProgram([join(racine, 'src', 'design-system', 'index.ts')], {
  declaration: true,
  emitDeclarationOnly: true,
  jsx: ts.JsxEmit.ReactJSX,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  target: ts.ScriptTarget.ES2022,
  rootDir: join(racine, 'src'),
  outDir: sortie,
  skipLibCheck: true,
  allowArbitraryExtensions: true,
});
const resultat = programme.emit();
const n = resultat.emittedFiles?.length ?? programme.getSourceFiles().filter((f) => f.fileName.includes('/src/')).length;
console.log(`types générés dans types/ (${n} fichier(s))${resultat.emitSkipped ? ' — ÉCHEC' : ''}`);
if (resultat.emitSkipped) process.exit(1);
