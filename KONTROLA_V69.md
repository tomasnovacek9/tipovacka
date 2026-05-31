# Kontrola v69

Oprava nasazení Cloudflare Pages Functions.

## Co bylo špatně
Ve `functions/api/[[path]].js` byly omylem dvakrát deklarované funkce:

- `publicGroups`
- `resolveGroupId`
- `createGroup`
- `saveGroup`

Cloudflare kvůli tomu zastavil build hláškou `Duplicate top-level function declarations`.

## Co je opraveno
Duplicitní deklarace byly odstraněny. Zůstává jedna funkční sada endpointů.

Po nahrání zkontroluj:

1. Deployment musí projít zeleně.
2. `/api` musí vrátit JSON.
3. `/api/health` musí vrátit JSON.
4. `/api-test.html` musí projít včetně admin loginu.
