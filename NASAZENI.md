# Nasazení

Doporučené prostředí: Cloudflare Pages + Functions + D1.

## Nastavení Pages

- Build command: prázdné
- Build output directory: `public`
- Functions directory: `functions`

## D1

V Cloudflare vytvoř D1 databázi a připoj ji k Pages projektu jako binding:

`DB`

Backend používá `env.DB`, takže název bindingu musí být přesně `DB`.

## Kontrola

Po nasazení otevři:

`/api-test.html`

Správný stav: zobrazí JSON odpověď z `/api/health`.

Špatný stav: místo JSONu se zobrazí HTML – to znamená, že `/api/*` nejde do functions.
