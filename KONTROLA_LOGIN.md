# Kontrola přihlášení

Po nasazení otevři `/api-test.html`. Musí projít:

- `/api` vrací JSON
- `/api/health` vrací JSON
- `admin login` vrací token

Admin přihlášení v aplikaci:

- Jméno: `Admin`
- Příjmení: nechat prázdné
- Heslo: `admiN9`

Pokud `/api-test.html` vrací HTML, není správně nasazená Cloudflare Function nebo `_routes.json`.
