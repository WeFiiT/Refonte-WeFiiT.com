#!/usr/bin/env bash
# Assemble une page à partir de ses blocs : met bout à bout pages/<page>/blocs/*.html
# (dans l'ordre alphabétique, donc l'ordre des numéros 01-, 02-, ...) entre un <head>
# minimal et </body></html>. Le résultat (pages/<page>/<page>.html) sert à voir la page
# entière dans un navigateur ; ce n'est pas ce qui est collé dans Webflow (un bloc = un Embed).
#
# Usage, depuis la racine du repo :  bash outils/assembler-page.sh equipe
set -euo pipefail
cd "$(dirname "$0")/.."
page="${1:-}"
[ -n "$page" ] || { echo "Usage : bash outils/assembler-page.sh <page>   (ex. equipe)" >&2; exit 1; }
[ -d "pages/$page/blocs" ] || { echo "Erreur : pages/$page/blocs n'existe pas" >&2; exit 1; }
out="pages/$page/$page.html"
{
  printf '%s\n' '<!doctype html>' '<html lang="fr">' '<head>' '<meta charset="utf-8">' \
    '<meta name="viewport" content="width=device-width, initial-scale=1">' \
    "<title>WeFiiT.com, page $page (assemblée)</title>" \
    "<!-- Page assemblée automatiquement par outils/assembler-page.sh à partir de pages/$page/blocs/. Ne pas modifier à la main : modifier les blocs puis relancer le script. -->" \
    '<style>' '  body { margin: 0; background: #fff; font-family: "Work Sans v2", Arial, sans-serif; }' '</style>' \
    '</head>' '<body>'
  for f in pages/"$page"/blocs/*.html; do cat "$f"; done
  printf '%s\n' '</body>' '</html>'
} > "$out"
echo "Page assemblée : $out ($(ls pages/"$page"/blocs/*.html | wc -l | tr -d ' ') blocs)"
