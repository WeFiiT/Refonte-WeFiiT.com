// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

// Les blocs vivent dans ../pages/<page>/blocs/ (source de vérité, collée telle quelle
// dans Webflow) : Astro les lit directement, sans copie. Le serveur de dev doit donc
// être autorisé à lire le dossier parent.
const racineSite = fileURLToPath(new URL('..', import.meta.url));

// https://astro.build/config
export default defineConfig({
  vite: {
    server: { fs: { allow: [racineSite] } },
  },
});
