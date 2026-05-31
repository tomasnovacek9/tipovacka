# Kontrola v73

- Odstraněn `functions/_middleware.js`, aby se API nespouštělo dvojí cestou.
- Aktivní backend je pouze `functions/api/[[path]].js`.
- `/api` a `/api/health` musí vracet JSON.
- Přihlášení admina: Jméno `Admin`, příjmení prázdné, heslo `admiN9`.
- Varování `background.js` a `FrameDoesNotExistError` pochází z rozšíření prohlížeče, ne z aplikace. Skutečná chyba byla 503 na `/api/auth/login`.
- Base seed rozpisu se nespouští zbytečně při každém požadavku, pokud je už rozpis založený.
