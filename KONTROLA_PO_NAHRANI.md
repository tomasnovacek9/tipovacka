# Kontrola po nahrání v65

1. Otevři `/api` – musí se zobrazit JSON, ne HTML.
2. Otevři `/api/health` – musí se zobrazit JSON.
3. Otevři `/api-test.html` a spusť test.
4. Admin login:
   - Jméno: `Admin`
   - Příjmení: prázdné
   - Heslo: `admiN9`

V této verzi je přidaný `functions/_middleware.js`, který zachytí `/api` a `/api/*`, i kdyby Cloudflare špatně spároval konkrétní API routu.
