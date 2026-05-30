# Tipovačka – čistá verze v53

Tahle verze je uklizená. V balíčku jsou jen soubory, které jsou potřeba pro nasazení aplikace.

## Struktura

- `public/` – veřejná část aplikace
  - `index.html` – hlavní aplikace
  - `manifest.json` – PWA manifest
  - `app-icon.png`, `favicon.ico`, `icons/` – ikony
  - `_routes.json` – směrování `/api/*` na Cloudflare Functions
  - `api-test.html` – jednoduchý test backendu
  - `sw.js` – no-op service worker kvůli odstranění staré cache
- `functions/api/[[path]].js` – backend API
- `schema.sql` – databázové schéma
- `wrangler.toml.example` – příklad Cloudflare konfigurace

## Co bylo odstraněno

Z balíčku jsem odstranil staré kontrolní a pomocné soubory typu:

- `check.js`
- `check_index.js`
- `script_v43.js`
- `tmp_script.js`
- `app2.js`
- staré testovací skripty
- prázdné a dočasné soubory

Tyhle soubory nebyly potřeba pro běh aplikace a zbytečně mátly projekt.

## Důležité

Aplikace je serverová. Nestačí nahrát jen `public/` na GitHub Pages. Musí běžet i `functions/api/[[path]].js` a databáze D1.

Po nasazení ověř:

`/api-test.html`

Pokud vrací JSON, backend běží. Pokud se zobrazí HTML nebo chyba, není správně nasazený backend/functions.
