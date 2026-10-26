#!/bin/sh
# Rulează Lighthouse pe build-ul din out/ (rulați întâi `npm run build`).
# Pornește serverul local pe portul 4191 dacă nu rulează deja.
# Folosire: sh scripts/lighthouse.sh [mobile|desktop] [pagini...]
FORM=${1:-mobile}; shift
PAGES=${*:-"/ /servicii/ /acte-necesare/ /onorarii/ /procedura/ /echipa/ /programari/ /intrebari-frecvente/ /contact/ /confidentialitate/ /termeni/"}
export CHROME_PATH="${CHROME_PATH:-$(node -e "console.log(require('playwright').chromium.executablePath())")}"
mkdir -p lighthouse
if ! curl -s -o /dev/null http://localhost:4191/; then
  PORT=4191 node scripts/serve.mjs >/dev/null 2>&1 &
  SERVER=$!
  trap 'kill $SERVER 2>/dev/null' EXIT
  sleep 1
fi
PRESET=""; [ "$FORM" = desktop ] && PRESET="--preset=desktop"
for p in $PAGES; do
  name=$(echo "$p" | sed 's#/#_#g')
  npx -y lighthouse@12.8.2 "http://localhost:4191$p" --quiet $PRESET --chrome-flags="--headless=new" \
    --output=json --output-path="lighthouse/$FORM$name.json" >/dev/null 2>&1
  node -e "const r=require('./lighthouse/$FORM$name.json');console.log('$FORM $p', Object.values(r.categories).map(c=>c.id+':'+Math.round(c.score*100)).join(' '), '| LCP', Math.round(r.audits['largest-contentful-paint'].numericValue)+'ms', 'CLS', r.audits['cumulative-layout-shift'].numericValue.toFixed(3), 'TBT', Math.round(r.audits['total-blocking-time'].numericValue)+'ms')"
done
