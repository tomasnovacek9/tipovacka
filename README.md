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


## iPhone / Safari troubleshooting v31

Pokud se na iPhonu pořád zobrazuje stará rozbitá verze:
1. Smaž ikonu aplikace z plochy iPhonu.
2. V Safari otevři Nastavení → Safari → Pokročilé → Data stránek a smaž data pro danou doménu.
3. Otevři adresu s parametrem `?v=31`, např. `https://domena.cz/?v=31`.
4. Až potom znovu přidej na plochu.

Ve v31 je service worker vypnutý, aby iPhone nedržel starou cache.


## v32 oprava

- Přepsaný `index.html` bez duplicitních funkcí a nahromaděných starých CSS patchů.
- Horní panel: vlevo TIP + název soutěže, vpravo pouze sekce a přihlášený uživatel.
- Dashboard bez ikon; poslední hodnota je počet vyhodnocených tipů.
- Profil a Admin jsou samostatně vyčištěné sekce.
- Automatická aktualizace každých 5 s zůstává, ale během rozkliknuté úpravy tipu se dočasně pozastaví, aby se výsledek nesmazal.
- Service worker se odregistruje, aby iPhone nedržel starou rozbitou cache.
- Pokud aplikace po nahrání stále ukazuje chybu API, není problém v telefonu, ale v nasazení backendu `/api` / D1 databáze.
