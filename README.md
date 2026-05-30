# Tipovačka MS 2026 – v21 GitHub/Cloudflare Pages

Tato verze je připravená jako kompletní složka k nahrání na GitHub.

## Co je v této verzi

- tmavý Apple/sportovní vzhled podle schváleného směru
- logo TIP v kruhu + fajfka jako PWA/app ikona
- zachované logo FIFA World Cup 26 v horním bloku aplikace
- přihlášení jménem + příjmením + heslem
- registrace: jméno, příjmení, přezdívka, e-mail, telefon, heslo, vstupní kód
- veřejně se zobrazuje pouze přezdívka
- admin vidí jméno, příjmení, přezdívku, e-mail, telefon a údaj do platby
- údaj do platby se generuje jako `TIP-PREZDIVKA`
- ruční správa zápasů, žádné externí API zápasů
- import zápasů přes textové pole
- ruční zadávání výsledků
- aktivace/deaktivace hráčů
- role hráč/admin
- automatická aktualizace každých 5 sekund
- PWA manifest + ikony + favicon

## Admin účet

Jméno: `admin`  
Příjmení: nevyplňovat  
Heslo: `admiN9`

## Vstupní kód pro registraci

Výchozí kód: `TIP2026`  
Admin ho může změnit v administraci.

## Struktura

```text
public/
  index.html
  manifest.json
  sw.js
  app-icon.png
  favicon.ico
  worldcup2026-logo.png
  icons/
functions/api/[[path]].js
schema.sql
README.md
```

## Nasazení na Cloudflare Pages

1. Nahraj obsah ZIPu do GitHub repozitáře.
2. V Cloudflare Pages vytvoř projekt z GitHubu.
3. Build command nech prázdný.
4. Build output nastav na `public`.
5. Vytvoř D1 databázi a v Pages Functions přidej binding s názvem `DB`.
6. Do D1 spusť `schema.sql`.
7. Otevři web. Tabulky se při prvním spuštění případně vytvoří i automaticky.

## Import zápasů

V adminu lze vložit řádky ve formátu:

```text
2026-06-11 21:00; Skupina A; Mexiko; Jihoafrická republika
2026-06-12 04:00; Skupina A; Česko; Korejská republika
```

## Důležité

Tato verze nepoužívá externí sportovní API. Zápasy a výsledky spravuje admin ručně.
