# Nasazení TIPovačky

Tahle verze musí běžet na Cloudflare Pages s Functions a D1 databází.

## Důležité

Ve starší verzi byl špatně soubor `public/_routes.json`:

```json
"exclude": ["/*"]
```

Tím se omylem vypnuly i `/api/*` funkce. Výsledek byl, že `/api` vracelo HTML místo JSONu a nešlo se přihlásit.

V této verzi je opraveno:

```json
{
  "version": 1,
  "include": ["/api/*"],
  "exclude": []
}
```

## Nastavení Cloudflare Pages

- Build command: nechat prázdné
- Build output directory: `public`
- Functions directory: `functions`

## D1 databáze

V Pages projektu musí být připojená D1 databáze s bindingem přesně:

```text
DB
```

Pokud binding nebude `DB`, backend nebude fungovat.

## Kontrola po nahrání

Otevři:

```text
/api/health
```

Správně musí vrátit JSON, např.:

```json
{"ok":true,"version":"v54","api":true,"db":true}
```

Když se zobrazí HTML stránka, Functions nejsou nasazené nebo Cloudflare nepoužívá složku `functions`.

## Přihlášení admina

```text
Admin / admiN9
```

Na úvodní obrazovce se admin údaje nezobrazují.
