// Compare un bloc HTML d'origine (../pages/<page>/blocs/<bloc>.html) avec le rendu d'un composant dans dist/.
// Sert à vérifier qu'une conversion en composant React est identique au bloc collé dans Webflow.
//
//   node outils/comparer-bloc.mjs html <page> <bloc> <idRacine>
//       Compare le balisage (éléments, classes, attributs, textes, JSON-LD) du bloc d'origine et de l'élément
//       de dist/<page>/index.html dont l'id est <idRacine>. Il faut avoir lancé `npx astro build` après avoir
//       remplacé le bloc par le composant dans src/contenu/<page>.ts. Le HTML d'origine est lu dans
//       _prive/reference/blocs-html-originaux/<page>/<bloc>.html s'il existe (copie faite avant conversion),
//       sinon dans pages/<page>/blocs/.
//   node outils/comparer-bloc.mjs css <page> <bloc> <classeRacine> <fichier.css> [<autre.css> ...]
//       Compare les règles CSS du <style> du bloc (sélecteur #idRacine remplacé par .<classeRacine>, variables
//       --wt-* remplacées par --wf-*) avec celles du ou des fichiers CSS du composant.
//
// Sortie : « IDENTIQUE » ou la liste des différences (les 40 premières). Code de sortie 0 si identique, 1 sinon.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ici = path.dirname(fileURLToPath(import.meta.url));
const astro = path.resolve(ici, '..');
const site = path.resolve(astro, '..');

function lireOrigine(page, bloc) {
  const copie = path.join(site, '_prive/reference/blocs-html-originaux', page, bloc + '.html');
  return fs.readFileSync(fs.existsSync(copie) ? copie : path.join(site, 'pages', page, 'blocs', bloc + '.html'), 'utf8');
}

// ---------- HTML ----------
const entites = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", rsquo: '’', lsquo: '‘', hellip: '…', middot: '·' };
const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
  if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
  return entites[e.toLowerCase()] ?? m;
});
const IGNORE_ATTR = /^(data-[a-z]+-init|data-astro-.*|data-reactroot)$/;
const VOID = new Set(['br', 'img', 'input', 'hr', 'meta', 'link', 'source', 'path-void']);

function jetons(html) {
  const out = [];
  const ld = [];
  const re = /<!--[\s\S]*?-->|<(script|style)\b([^>]*)>([\s\S]*?)<\/\1>|<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>|[^<]+|</g;
  let m;
  while ((m = re.exec(html))) {
    const [t, bal, attrsScript, contenu, fermant, nom, attrs] = m;
    if (t.startsWith('<!--')) continue;
    if (bal) {
      if (bal === 'script' && /application\/ld\+json/.test(attrsScript)) { try { ld.push(JSON.parse(contenu)); } catch { ld.push('JSON invalide'); } }
      continue; // contenu des <style> et <script> comparé à part
    }
    if (nom) {
      const tag = nom.toLowerCase();
      if (fermant) { if (!VOID.has(tag)) out.push('</' + tag + '>'); continue; }
      const a = {};
      for (const x of attrs.matchAll(/([:@\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
        const k = x[1].toLowerCase();
        if (IGNORE_ATTR.test(k)) continue;
        let v = decode(x[2] ?? x[3] ?? x[4] ?? '');
        if (k === 'class') v = v.split(/\s+/).filter(Boolean).sort().join(' ');
        if (k === 'style') v = v.replace(/\s*([:;])\s*/g, '$1').replace(/\s+/g, ' ').replace(/;\s*$/, '').trim();
        if (k === 'hidden' && (v === '' || v === 'hidden' || v === 'until-found')) v = '';
        a[k] = v;
      }
      const attrStr = Object.keys(a).sort().map((k) => (a[k] === '' ? k : `${k}="${a[k]}"`)).join(' ');
      out.push(`<${tag}${attrStr ? ' ' + attrStr : ''}>`);
      // syntaxe auto-fermante (<path />) : équivaut à une balise ouvrante suivie de sa fermante
      if (/\/\s*$/.test(attrs) && !VOID.has(tag)) out.push('</' + tag + '>');
      continue;
    }
    if (t === '<') { out.push('«<»'); continue; }
    const txt = decode(t).replace(/\s+/g, ' ').trim();
    if (txt) out.push('«' + txt + '»');
  }
  return { jetons: out, ld };
}

function sousArbre(jt, idRacine) {
  const debut = jt.findIndex((x) => x.startsWith('<') && !x.startsWith('</') && new RegExp(`\\sid="${idRacine}"(\\s|>|$)`).test(x));
  if (debut < 0) return null;
  const nomRacine = jt[debut].match(/^<([\w:-]+)/)[1];
  let prof = 0;
  for (let i = debut; i < jt.length; i++) {
    const x = jt[i];
    if (x.startsWith('</')) { if (x.slice(2, -1) === nomRacine) prof--; }
    else if (x.startsWith('<') && x.match(/^<([\w:-]+)/)?.[1] === nomRacine) prof++;
    if (prof === 0) return jt.slice(debut, i + 1);
  }
  return jt.slice(debut);
}

function comparerHtml(page, bloc, idRacine) {
  const orig = jetons(lireOrigine(page, bloc));
  const dist = fs.readFileSync(path.join(astro, 'dist', page, 'index.html'), 'utf8');
  const rendu = jetons(dist);
  const a = sousArbre(orig.jetons, idRacine) ?? orig.jetons;
  const b = sousArbre(rendu.jetons, idRacine);
  if (!b) { console.log(`Élément #${idRacine} introuvable dans dist/${page}/index.html`); return false; }
  const diffs = [];
  let i = 0, j = 0;
  while ((i < a.length || j < b.length) && diffs.length < 40) {
    if (a[i] === b[j]) { i++; j++; continue; }
    // resynchronisation simple : cherche la prochaine ligne commune dans une fenêtre de 6
    let ok = false;
    for (let d = 1; d <= 6 && !ok; d++) {
      if (a[i + d] !== undefined && a[i + d] === b[j]) { diffs.push(`- (origine seulement) ${a.slice(i, i + d).join(' ')}`); i += d; ok = true; }
      else if (b[j + d] !== undefined && b[j + d] === a[i]) { diffs.push(`+ (composant seulement) ${b.slice(j, j + d).join(' ')}`); j += d; ok = true; }
    }
    if (!ok) { diffs.push(`≠ origine : ${a[i]}\n  composant : ${b[j]}`); i++; j++; }
  }
  const ldOrig = JSON.stringify(orig.ld);
  // les JSON-LD du composant : ceux contenus dans l'élément racine ne sont pas isolés ici ; on compare l'ensemble de la page
  const ldRendu = rendu.ld.filter((x) => ldOrig.includes(JSON.stringify(x)));
  const ldManquants = orig.ld.filter((x) => !rendu.ld.some((y) => JSON.stringify(y) === JSON.stringify(x)));
  if (ldManquants.length) diffs.push(`JSON-LD d'origine absent du rendu (${ldManquants.length}) : ${JSON.stringify(ldManquants[0]).slice(0, 300)}`);
  console.log(`Jetons : origine ${a.length}, composant ${b.length}. JSON-LD : origine ${orig.ld.length}, retrouvés ${ldRendu.length}.`);
  if (!diffs.length) { console.log('IDENTIQUE (balisage, classes, attributs, textes, JSON-LD)'); return true; }
  console.log('DIFFÉRENCES :\n' + diffs.join('\n'));
  return false;
}

// ---------- CSS ----------
const VARS = { '--wt-blue': '--wf-blue-900', '--wt-blue-2': '--wf-blue-800', '--wt-blue-3': '--wf-blue-600', '--wt-orange': '--wf-orange-500', '--wt-orange-2': '--wf-orange-600', '--wt-ghost': '--wf-blue-50', '--wt-border': '--wf-grey-100', '--wt-label': '--wf-blue-300' };

function regles(css, mapSel) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const out = [];
  function lire(txt, ctx) {
    let i = 0;
    while (i < txt.length) {
      const o = txt.indexOf('{', i);
      if (o < 0) break;
      const tete = txt.slice(i, o).trim();
      let prof = 1, k = o + 1;
      while (k < txt.length && prof) { if (txt[k] === '{') prof++; else if (txt[k] === '}') prof--; k++; }
      const corps = txt.slice(o + 1, k - 1);
      if (tete.startsWith('@media') || tete.startsWith('@supports')) lire(corps, ctx + ' ' + tete.replace(/\s+/g, ' '));
      else if (tete.startsWith('@keyframes')) out.push({ ctx, sel: tete.replace(/\s+/g, ' '), decl: corps.replace(/\s+/g, ' ').trim() });
      else {
        const decl = corps.split(';').map((d) => d.trim()).filter(Boolean).map((d) => d.replace(/\s*:\s*/, ':').replace(/\s+/g, ' ').toLowerCase()).sort();
        for (const sel of tete.split(',').map((s) => s.trim()).filter(Boolean)) out.push({ ctx, sel: mapSel(sel.replace(/\s+/g, ' ')), decl: decl.join(';') });
      }
      i = k;
    }
  }
  lire(css, '');
  return out;
}

function comparerCss(page, bloc, classeRacine, fichiers) {
  const html = lireOrigine(page, bloc);
  const idRacine = html.match(/<(?:section|div|aside|header|article)[^>]*\sid="([^"]+)"/)?.[1];
  const styleOrigine = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((x) => x[1]).join('\n');
  const mapVar = (s) => s.replace(/--wt-[a-z0-9-]+/g, (v) => VARS[v] ?? v);
  const mapSelOrig = (sel) => mapVar(sel.replace(new RegExp('^#' + idRacine + '(?![\\w-])'), '.' + classeRacine));
  const o = regles(styleOrigine, mapSelOrig).map((r) => ({ ...r, decl: mapVar(r.decl).split(';').filter((d) => !/^--wf-[a-z0-9-]+:|^--wt-[a-z0-9-]+:/.test(d)).join(';') })).filter((r) => r.decl !== '' || r.sel.startsWith('@'));
  const c = regles(fichiers.map((f) => fs.readFileSync(path.resolve(f), 'utf8')).join('\n'), (s) => s).map((r) => ({ ...r, decl: r.decl.split(';').filter((d) => !/^--wf-[a-z0-9-]+:|^--wt-[a-z0-9-]+:/.test(d)).join(';') })).filter((r) => r.decl !== '' || r.sel.startsWith('@'));
  const cle = (r) => `${r.ctx} | ${r.sel} | ${r.decl}`;
  const so = new Set(o.map(cle)), sc = new Set(c.map(cle));
  const seulesO = o.filter((r) => !sc.has(cle(r))), seulesC = c.filter((r) => !so.has(cle(r)));
  console.log(`Règles : origine ${o.length}, composant ${c.length} (variables --wt-* renommées en --wf-*, définitions de variables ignorées).`);
  if (!seulesO.length && !seulesC.length) { console.log('IDENTIQUE (règles CSS)'); return true; }
  console.log('RÈGLES DE L’ORIGINE ABSENTES OU DIFFÉRENTES DANS LE COMPOSANT :');
  seulesO.slice(0, 40).forEach((r) => console.log(`  ${r.ctx} ${r.sel} { ${r.decl} }`));
  console.log('RÈGLES DU COMPOSANT ABSENTES OU DIFFÉRENTES DANS L’ORIGINE :');
  seulesC.slice(0, 40).forEach((r) => console.log(`  ${r.ctx} ${r.sel} { ${r.decl} }`));
  return false;
}

const [, , mode, page, bloc, ...reste] = process.argv;
let ok = false;
if (mode === 'html') ok = comparerHtml(page, bloc, reste[0]);
else if (mode === 'css') ok = comparerCss(page, bloc, reste[0], reste.slice(1));
else { console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 17).join('\n')); }
process.exit(ok ? 0 : 1);
