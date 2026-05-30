# Nasazení backendu

Aplikace musí běžet jako Cloudflare Pages projekt s Functions a D1 databází. Nestačí nahrát jen obsah složky `public` na GitHub Pages.

Správná struktura projektu:

- `public/index.html`
- `public/_routes.json`
- `functions/api/[[path]].js`
- D1 binding `DB`

Kontrola po nasazení:

1. Otevři `/api/health` nebo `/api-test.html`.
2. Správná odpověď je JSON, např. `{ "ok": true, "api": true }`.
3. Pokud se zobrazí HTML stránky, backend Functions není nasazený nebo Cloudflare nevidí složku `functions`.
