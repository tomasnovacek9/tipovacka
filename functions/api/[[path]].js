export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api/, "") || "/";

  try {
    if (path === "/live-data") return json(await liveData(env));
    return json({ error: "Nenalezená API cesta: " + path }, 404);
  } catch (e) {
    return json({ error: e.message || String(e) }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json;charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function safeDate(x) {
  return x || new Date().toISOString();
}

function statusText(g) {
  return g?.status?.long || g?.status?.short || g?.status || "neznámý stav";
}

function statusShort(g) {
  return String(g?.status?.short || g?.status || "").toUpperCase();
}

function isLive(g) {
  const s = statusShort(g);
  return ["1P","2P","3P","OT","BT","P"].includes(s) || /progress|live/i.test(statusText(g));
}

function isDone(g) {
  const s = statusShort(g);
  return ["FT","AOT","AP"].includes(s) || /finished|after/i.test(statusText(g));
}

function homeName(g) {
  return g?.teams?.home?.name || g?.teams?.home || "Domácí";
}

function awayName(g) {
  return g?.teams?.away?.name || g?.teams?.away || "Hosté";
}

function scoreObj(g) {
  const h = g?.scores?.home ?? g?.goals?.home ?? null;
  const a = g?.scores?.away ?? g?.goals?.away ?? null;
  return { h, a };
}

function scoreText(g) {
  const { h, a } = scoreObj(g);
  return h !== null || a !== null ? `${h ?? ""}:${a ?? ""}` : "";
}

function normalizeGame(g) {
  return {
    id: String(g.id || g.game?.id || crypto.randomUUID()),
    date: safeDate(g.date || g.time),
    phase: g.league?.name || "World Championship",
    home: homeName(g),
    away: awayName(g),
    statusText: statusText(g),
    statusShort: statusShort(g),
    live: isLive(g),
    done: isDone(g),
    score: scoreText(g),
    rawStatus: g.status || null
  };
}

function buildTeams(games) {
  const map = {};
  function ensure(name) {
    if (!map[name]) map[name] = { name, played: 0, goalsFor: 0, goalsAgainst: 0, w: 0, d: 0, l: 0 };
    return map[name];
  }

  for (const g of games) {
    const h = ensure(g.home);
    const a = ensure(g.away);
    if (!g.done || !g.score) continue;

    const [hg, ag] = g.score.split(":").map(Number);
    if (Number.isNaN(hg) || Number.isNaN(ag)) continue;

    h.played++; a.played++;
    h.goalsFor += hg; h.goalsAgainst += ag;
    a.goalsFor += ag; a.goalsAgainst += hg;

    if (hg > ag) { h.w++; a.l++; }
    else if (hg < ag) { a.w++; h.l++; }
    else { h.d++; a.d++; }
  }

  return Object.values(map).sort((a,b)=>a.name.localeCompare(b.name, "cs"));
}

async function fetchGames(env, league, season) {
  const apiUrl = `https://v1.hockey.api-sports.io/games?league=${encodeURIComponent(league)}&season=${encodeURIComponent(season)}`;
  const res = await fetch(apiUrl, {
    headers: { "x-apisports-key": env.APISPORTS_KEY }
  });
  const text = await res.text();
  let data = {};
  try { data = JSON.parse(text); } catch { data = { raw: text }; }
  return { res, data, apiUrl };
}

async function liveData(env) {
  if (!env.APISPORTS_KEY) throw new Error("Chybí APISPORTS_KEY v Cloudflare proměnných.");

  const league = "111";
  const season = "2026";
  const { res, data, apiUrl } = await fetchGames(env, league, season);

  if (!res.ok) {
    throw new Error(`API-SPORTS chyba ${res.status}: ${JSON.stringify(data).slice(0, 300)}`);
  }

  const response = Array.isArray(data.response) ? data.response : [];
  const games = response.map(normalizeGame).sort((a,b)=>new Date(a.date)-new Date(b.date));
  const teams = buildTeams(games);

  return {
    league,
    season,
    games,
    teams,
    debug: {
      apiUrl,
      status: res.status,
      responseCount: response.length,
      firstItemKeys: response[0] ? Object.keys(response[0]) : [],
      errors: data.errors || null,
      paging: data.paging || null
    }
  };
}
