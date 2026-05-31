# Audit v68 – skupiny soutěže

Zkontrolováno a upraveno:

- zachováno přihlášení přes Jméno / Příjmení / Heslo,
- zachováno serverové API přes Cloudflare Functions + D1,
- ponechán hlavní admin `Admin / admiN9`,
- skupiny soutěže jsou v databázi `v21_groups`,
- stávající uživatelé bez skupiny se při migraci přesunou do `Pokus / testovací`,
- registrace ukládá uživatele do vybrané skupiny,
- admin může přepínat spravovanou skupinu,
- pořadí se počítá podle skupiny,
- startovné, bankovní účet, pravidla a bank hry jsou podle skupiny,
- výsledky zápasů zůstávají společné pro všechny skupiny,
- tipy ostatních hráčů se nyní zobrazují jen v rámci aktuální skupiny,
- opraveno routování `_routes.json`, aby Functions běžely jen pro `/api` a `/api/*`,
- odstraněny duplicitní fallback soubory `functions/api.js`, `functions/api/index.js`, `functions/api/health.js`, které mohly mást routování,
- ponechán jen `functions/_middleware.js` + `functions/api/[[path]].js`.

Po nahrání zkontroluj:

1. `/api` vrací JSON.
2. `/api/health` vrací JSON.
3. `/api-test.html` projde admin login.
4. Admin vidí skupinu `Pokus / testovací`.
5. Registrace do skupiny vytvoří uživatele v dané skupině.
6. Pořadí ve skupinách je oddělené.

Důležité: výsledky zápasů jsou společné. Skupiny mají oddělené hráče, pořadí, peníze a pravidla.
