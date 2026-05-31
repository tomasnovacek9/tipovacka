# v70 – oprava černé obrazovky

Opraveno:
- odstraněna rekurze `topbar()` způsobující `Maximum call stack size exceeded`,
- odstraněna rekurze admin wrapperu,
- zkontrolována syntaxe frontendu i `functions/api/[[path]].js` přes `node --check`,
- zachovány skupiny soutěže z v69.

Po nasazení zkontrolovat:
1. `/api-test.html`
2. přihlášení Admin / admiN9
3. sekce Domů, Zápasy, Pořadí, Profil, Admin
