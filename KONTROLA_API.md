# Kontrola API v64

Po nasazení otevři:

- `/api` – musí vracet JSON `{ ok: true, api: true, version: "v64" }`
- `/api/health` – musí vracet JSON a `db: true`
- `/api-test.html` – musí projít i admin login

Cloudflare Pages nastavení:

- Build output directory: `public`
- Functions directory musí být v kořeni projektu: `functions`
- D1 binding se musí jmenovat přesně `DB`
- `public/_routes.json` obsahuje `/api` a `/api/*`

Když `/api` vrací HTML, není to chyba přihlášení. Cloudflare nespouští Functions nebo je špatně nastavený build output.
