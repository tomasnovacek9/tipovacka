export async function onRequest(context) {
  const { env } = context;
  try { return json(await liveData(env)); }
  catch (e) { return json({ error: e.message || String(e) }, 500); }
}

function json(data, status=200) {
  return new Response(JSON.stringify(data), {status, headers: {"content-type":"application/json;charset=utf-8","cache-control":"no-store"}});
}

const FLAGS = {
  "Canada":"🇨🇦","United States":"🇺🇸","USA":"🇺🇸","Czech Republic":"🇨🇿","Czechia":"🇨🇿","Czech Republic W":"🇨🇿",
  "Finland":"🇫🇮","Sweden":"🇸🇪","Switzerland":"🇨🇭","Germany":"🇩🇪","Slovakia":"🇸🇰","Latvia":"🇱🇻",
  "Norway":"🇳🇴","Denmark":"🇩🇰","France":"🇫🇷","Austria":"🇦🇹","Poland":"🇵🇱","Kazakhstan":"🇰🇿",
  "Great Britain":"🇬🇧","Slovenia":"🇸🇮","Italy":"🇮🇹","Hungary":"🇭🇺"
};

function flag(name){return FLAGS[name] || "🏒";}
function statusText(g){return g?.status?.long || g?.status?.short || g?.status || "neznámý stav";}
function statusShort(g){return String(g?.status?.short || g?.status || "").toUpperCase();}
function isLive(g){const s=statusShort(g);return ["1P","2P","3P","OT","BT","P"].includes(s)||/progress|live/i.test(statusText(g));}
function isDone(g){const s=statusShort(g);return ["FT","AOT","AP"].includes(s)||/finished|after/i.test(statusText(g));}
function homeName(g){return g?.teams?.home?.name || g?.teams?.home || "Domácí";}
function awayName(g){return g?.teams?.away?.name || g?.teams?.away || "Hosté";}
function scoreObj(g){return {h:g?.scores?.home ?? g?.goals?.home ?? null, a:g?.scores?.away ?? g?.goals?.away ?? null};}
function scoreText(g){const {h,a}=scoreObj(g);return h!==null||a!==null?`${h ?? ""}:${a ?? ""}`:"";}

function periods(g){
  const p = g?.periods || g?.scores?.periods || g?.period || {};
  const arr = [];
  for (const [k,v] of Object.entries(p || {})) {
    if (v && typeof v === "object") arr.push(`${k}: ${v.home ?? ""}:${v.away ?? ""}`);
  }
  return arr;
}

function normalize(g){
  const home=homeName(g), away=awayName(g);
  return {
    id:String(g.id || g.game?.id || crypto.randomUUID()),
    date:g.date || g.time || new Date().toISOString(),
    phase:g.league?.name || "World Championship",
    stage:g.stage || g.round || g.group || "",
    home, away,
    homeFlag: flag(home),
    awayFlag: flag(away),
    statusText: statusText(g),
    statusShort: statusShort(g),
    live:isLive(g),
    done:isDone(g),
    score:scoreText(g),
    periods:periods(g),
    raw:g
  };
}

function buildTeams(games){
  const map={};
  function ensure(name){if(!map[name])map[name]={name,flag:flag(name),played:0,goalsFor:0,goalsAgainst:0,w:0,d:0,l:0};return map[name];}
  for(const g of games){
    const h=ensure(g.home), a=ensure(g.away);
    if(!g.done || !g.score) continue;
    const [hg,ag]=g.score.split(":").map(Number);
    if(Number.isNaN(hg)||Number.isNaN(ag)) continue;
    h.played++; a.played++;
    h.goalsFor+=hg; h.goalsAgainst+=ag;
    a.goalsFor+=ag; a.goalsAgainst+=hg;
    if(hg>ag){h.w++;a.l++;} else if(hg<ag){a.w++;h.l++;} else {h.d++;a.d++;}
  }
  return Object.values(map).sort((a,b)=>(b.w*3+b.d)-(a.w*3+a.d)||a.name.localeCompare(b.name,"cs"));
}

async function liveData(env){
  if(!env.APISPORTS_KEY) throw new Error("Chybí APISPORTS_KEY v Cloudflare proměnných.");
  const league="111";
  const season="2024";
  const apiUrl=`https://v1.hockey.api-sports.io/games?league=${league}&season=${season}`;
  const res=await fetch(apiUrl,{headers:{"x-apisports-key":env.APISPORTS_KEY}});
  const text=await res.text();
  let data={}; try{data=JSON.parse(text);}catch{data={raw:text};}
  if(!res.ok) throw new Error(`API-SPORTS chyba ${res.status}: ${JSON.stringify(data).slice(0,300)}`);
  const response=Array.isArray(data.response)?data.response:[];
  const games=response.map(normalize).sort((a,b)=>new Date(a.date)-new Date(b.date));
  const teams=buildTeams(games);
  return {league,season,games,teams,debug:{apiUrl,status:res.status,responseCount:response.length,errors:data.errors||null,firstRaw:response[0]||null}};
}
