# Tipovačka v67 – skupiny soutěže

Novinky:
- Přidány skupiny soutěže: například Pokus / testovací, Škola, Firma, Kamarádi.
- Stávající uživatelé se automaticky zařadí do skupiny `Pokus / testovací` s kódem `TEST`.
- Zápasy a výsledky jsou společné pro všechny skupiny.
- Pořadí, aktivace hráčů, startovné, bank hry, účet a pravidla se počítají podle vybrané skupiny.
- Admin může v sekci Admin přepínat spravovanou skupinu a vytvářet nové skupiny.
- Při registraci i přihlášení se vybírá skupina.

Po nahrání zkontroluj:
1. `/api` vrací JSON.
2. `/api/health` vrací JSON.
3. `/api-test.html` projde test API.
4. Admin: Jméno `Admin`, příjmení prázdné, heslo `admiN9`.
5. V Adminu se zobrazí panel Skupiny soutěže.

Poznámka: Databáze se migruje automaticky při prvním spuštění. Přidá tabulku `v21_groups` a sloupec `group_id` do `v21_users`.
