#!/usr/bin/env bash
# Régénère librairie/index.html à partir de :
#   - template.html   la mise en page de la librairie
#   - catalogue.txt   la liste des blocs (titre, typologie, étiquettes, description)
#   - ../blocs-neutres/  le code des blocs (embarqué tel quel dans index.html)
#
# Usage, depuis la racine du repo :  bash librairie/build.sh
# Aucune dépendance : bash, sed, base64 et tr (présents avec Git Bash sur Windows, macOS, Linux).
set -euo pipefail

cd "$(dirname "$0")"
BLOCKS_DIR="../blocs-neutres"
CATALOGUE="catalogue.txt"
TEMPLATE="template.html"
OUT="index.html"

trim() {
  local s="$1"
  s="${s%$'\r'}"
  s="${s#"${s%%[![:space:]]*}"}"
  s="${s%"${s##*[![:space:]]}"}"
  printf '%s' "$s"
}

esc() {
  printf '%s' "$1" | sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g' -e 's/"/\&quot;/g'
}

[ -f "$CATALOGUE" ] || { echo "Erreur : $CATALOGUE introuvable" >&2; exit 1; }
[ -f "$TEMPLATE" ] || { echo "Erreur : $TEMPLATE introuvable" >&2; exit 1; }

listed="$(mktemp)"
trap 'rm -f "$listed"' EXIT

emit_blocks() {
  printf '<div id="lib-meta" hidden data-date="%s"></div>\n' "$(date +%Y-%m-%d)"
  while IFS='|' read -r file title type tags desc || [ -n "${file:-}" ]; do
    file="$(trim "${file:-}")"
    case "$file" in ''|'#'*) continue ;; esac
    title="$(trim "$title")"; type="$(trim "$type")"; tags="$(trim "$tags")"; desc="$(trim "$desc")"
    if [ ! -f "$BLOCKS_DIR/$file" ]; then
      echo "Erreur : $BLOCKS_DIR/$file est dans $CATALOGUE mais n'existe pas" >&2
      exit 1
    fi
    echo "$file" >> "$listed"
    printf '<div class="bloc-data" hidden data-file="blocs-neutres/%s" data-title="%s" data-type="%s" data-tags="%s" data-desc="%s" data-b64="%s"></div>\n' \
      "$(esc "$file")" "$(esc "$title")" "$(esc "$type")" "$(esc "$tags")" "$(esc "$desc")" \
      "$(base64 < "$BLOCKS_DIR/$file" | tr -d '\n\r')"
  done < "$CATALOGUE"
}

: > "$OUT.tmp"
while IFS= read -r line || [ -n "$line" ]; do
  case "$line" in
    *'<!--BLOCS-->'*) emit_blocks >> "$OUT.tmp" ;;
    *) printf '%s\n' "$line" >> "$OUT.tmp" ;;
  esac
done < "$TEMPLATE"
mv "$OUT.tmp" "$OUT"

count="$(wc -l < "$listed" | tr -d ' ')"
echo "Librairie générée : librairie/$OUT ($count blocs)"

# Prévient si un bloc existe dans blocks/ sans être dans le catalogue.
(cd "$BLOCKS_DIR" && find . -name '*.html' | sed 's#^\./##' | sort) | while IFS= read -r f; do
  grep -qxF "$f" "$listed" || echo "Attention : blocks/$f n'est pas dans $CATALOGUE (absent de la librairie)" >&2
done
