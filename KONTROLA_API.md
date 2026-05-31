# Rychlá kontrola nasazení Cloudflare Pages

Po nahrání ověř tyto adresy:

1. `/api`
   - musí vrátit JSON s `ok: true`

2. `/api/health`
   - musí vrátit JSON s `ok: true`, `api: true`, `db: true`

Pokud `/api` nebo `/api/health` vrací HTML, není problém v přihlášení, ale v nasazení:
- složka `functions` musí být v kořeni repozitáře,
- soubor `functions/api/[[path]].js` musí být v repozitáři,
- `public/_routes.json` musí obsahovat `/api` a `/api/*`,
- v Cloudflare Pages musí být D1 binding přesně `DB`.

Nepoužívej statický hosting bez Functions. GitHub Pages samotný backend nespustí.
