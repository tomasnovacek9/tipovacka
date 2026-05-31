# Tipovačka – opravený balíček pro Cloudflare Pages + D1

Hlavní opravy:

- Pages Functions jsou ve složce `functions`.
- `public/_routes.json` explicitně posílá `/api/*` do Functions.
- API vrací vždy JSON, ne HTML.
- D1 binding se jmenuje přesně `DB`.
- Test endpoint: `/api/test`.

## 1) Cloudflare Pages nastavení

V projektu na Cloudflare Pages nastav:

- Build command: nech prázdné, případně `echo "static"`
- Build output directory: `public`
- Functions directory: automaticky `functions`

## 2) D1 binding

Cloudflare Pages → Settings → Bindings → D1 database bindings:

- Variable name: `DB`
- D1 database: tvoje databáze

Po změně bindingu udělej znovu Deploy.

## 3) Databáze

Spusť SQL z:

```txt
migrations/0001_init.sql
```

Buď v Cloudflare D1 konzoli, nebo přes Wrangler.

## 4) Vytvoření prvního admina

Doporučeně nastav v Pages proměnnou:

```txt
SETUP_TOKEN = nějaké-tajné-heslo-pro-první-nastavení
```

Pak zavolej endpoint `/api/admin/create-user` metodou POST:

```json
{
  "setupToken": "nějaké-tajné-heslo-pro-první-nastavení",
  "login": "admin",
  "email": "admin@skola.cz",
  "name": "Admin",
  "password": "ZMENIT-SILNE-HESLO",
  "role": "admin"
}
```

Například v prohlížeči přes DevTools Console:

```js
fetch('/api/admin/create-user', {
  method: 'POST',
  headers: {'content-type':'application/json'},
  body: JSON.stringify({
    setupToken: 'nějaké-tajné-heslo-pro-první-nastavení',
    login: 'admin',
    email: 'admin@skola.cz',
    name: 'Admin',
    password: 'ZMENIT-SILNE-HESLO',
    role: 'admin'
  })
}).then(r => r.json()).then(console.log)
```

## 5) Kontrola

Otevři:

```txt
/api/test
```

Správná odpověď:

```json
{
  "ok": true,
  "source": "cloudflare-pages-function",
  "hasDB": true
}
```

Když `/api/test` vrací HTML, Cloudflare nenasadil Functions nebo špatně bere adresáře.

## 6) Nejčastější chyba

Špatně:

```txt
public/functions/api/...
```

Správně:

```txt
functions/api/...
public/_routes.json
```
