export async function onRequest({request,env}){const path=new URL(request.url).pathname.replace(/^\/api/,"")||"/";try{await tables(env);await ensureAdminAndBase(env);if(path=="/auth/login"&&request.method=="POST")return j(await login(env,await request.json()));if(path=="/auth/register"&&request.method=="POST")return j(await reg(env,await request.json()));const me=await auth(env,request);if(!me)return j({error:"Nepřihlášeno"},401);if(path=="/me")return j({user:pub(me)});if(path=="/app")return j(await app(env,me));if(path=="/bets"&&request.method=="POST")return j(await bet(env,me,await request.json()));if(path=="/admin/approve"&&request.method=="POST")return j(await approve(env,me,await request.json()));if(path=="/admin/settings"&&request.method=="POST")return j(await settings(env,me,await request.json()));if(path=="/admin/create-season"&&request.method=="POST")return j(await createSeason(env,me,await request.json()));if(path=="/admin/add-match"&&request.method=="POST")return j(await addMatch(env,me,await request.json()));if(path=="/admin/status"&&request.method=="POST")return j(await status(env,me,await request.json()));if(path=="/admin/result"&&request.method=="POST")return j(await result(env,me,await request.json()));if(path=="/admin/import"&&request.method=="POST")return j(await bulkImport(env,me,await request.json()));return j({error:"Nenalezeno "+path},404)}catch(e){return j({error:e.message||String(e)},400)}}

function j(d,s=200){return new Response(JSON.stringify(d),{status:s,headers:{"content-type":"application/json;charset=utf-8","cache-control":"no-store"}})}
function id(p){return p+"-"+crypto.randomUUID()}
function adm(me){if(!["admin","superadmin"].includes(me.role))throw Error("Nemáš oprávnění admina.")}
function pub(u){return{id:u.id,name:u.name,role:u.role,approved:!!u.approved,paid:!!u.paid,avatar:u.avatar||"?",points:u.points||0}}
async function hash(t){let h=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t));return[...new Uint8Array(h)].map(b=>b.toString(16).padStart(2,"0")).join("")}
function techEmail(name){return String(name||"user").toLowerCase().replace(/[^a-z0-9._-]+/g,"_")+"@tipovacka.local"}

async function tables(env){
  await env.DB.exec(`
CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY,value TEXT);
CREATE TABLE IF NOT EXISTS settings(id TEXT PRIMARY KEY,admin_fee INTEGER DEFAULT 10,game_fee INTEGER DEFAULT 100,split TEXT DEFAULT '[50,30,20]',bank_account TEXT DEFAULT '240616/617/0300',access_code TEXT DEFAULT 'TIP2026');
CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,name TEXT UNIQUE,email TEXT NOT NULL UNIQUE,password_hash TEXT,role TEXT DEFAULT 'player',approved INTEGER DEFAULT 0,paid INTEGER DEFAULT 0,avatar TEXT,points INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user_id TEXT,created_at TEXT);
CREATE TABLE IF NOT EXISTS seasons(id TEXT PRIMARY KEY,name TEXT,description TEXT,sport TEXT,active INTEGER DEFAULT 0,public INTEGER DEFAULT 0,status TEXT DEFAULT 'draft');
CREATE TABLE IF NOT EXISTS matches(id TEXT PRIMARY KEY,season_id TEXT,phase TEXT,start_time TEXT,home TEXT,away TEXT,home_flag TEXT,away_flag TEXT,status TEXT DEFAULT 'open',score TEXT,confirmed INTEGER DEFAULT 0,info TEXT);
CREATE TABLE IF NOT EXISTS bets(user_id TEXT,match_id TEXT,pick TEXT,created_at TEXT,PRIMARY KEY(user_id,match_id));
`);
  try{await env.DB.prepare("ALTER TABLE settings ADD COLUMN bank_account TEXT DEFAULT '240616/617/0300'").run()}catch{}
  try{await env.DB.prepare("ALTER TABLE settings ADD COLUMN access_code TEXT DEFAULT 'TIP2026'").run()}catch{}
  try{await env.DB.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_users_name ON users(name)").run()}catch{}
}

async function ensureAdminAndBase(env){
  await env.DB.prepare("INSERT OR IGNORE INTO settings(id,bank_account,access_code) VALUES('main','240616/617/0300','TIP2026')").run();
  await env.DB.prepare("INSERT OR IGNORE INTO seasons(id,name,description,sport,active,public,status) VALUES('hockey-2026','MS v hokeji 2026','Tipování aktuálního mistrovství světa v hokeji','hockey',1,1,'running')").run();
  await env.DB.prepare("INSERT OR IGNORE INTO seasons(id,name,description,sport,active,public,status) VALUES('football-2026','MS ve fotbale 2026','Připravená budoucí soutěž','football',0,0,'draft')").run();
  await env.DB.prepare("INSERT OR REPLACE INTO users(id,name,email,password_hash,role,approved,paid,avatar,points) VALUES('u-admin','admin',?,?,'superadmin',1,1,'A',0)")
    .bind(techEmail("admin"),await hash("admiN9")).run();
}

async function login(env,b){
  let name=(b.name||"").trim();
  let u=await env.DB.prepare("SELECT * FROM users WHERE lower(name)=lower(?)").bind(name).first();
  if(!u||u.password_hash!==await hash(b.password||""))throw Error("Špatné jméno nebo heslo.");
  let tok=id("tok");
  await env.DB.prepare("INSERT INTO sessions VALUES(?,?,datetime('now'))").bind(tok,u.id).run();
  return{token:tok};
}

async function reg(env,b){
  let name=(b.name||"").trim(),pass=b.password||"",code=(b.code||"").trim();
  if(!name||pass.length<4)throw Error("Vyplň jméno a heslo alespoň 4 znaky.");
  let set=await env.DB.prepare("SELECT * FROM settings WHERE id='main'").first();
  if(code!==set.access_code)throw Error("Špatný vstupní kód.");
  if(await env.DB.prepare("SELECT id FROM users WHERE lower(name)=lower(?)").bind(name).first())throw Error("Toto jméno už existuje. Zvol jiné.");
  let uid=id("u"),tok=id("tok");
  await env.DB.prepare("INSERT INTO users(id,name,email,password_hash,role,approved,paid,avatar,points) VALUES(?,?,?,?, 'player',0,0,?,0)")
    .bind(uid,name,techEmail(name),await hash(pass),name[0].toUpperCase()).run();
  await env.DB.prepare("INSERT INTO sessions VALUES(?,?,datetime('now'))").bind(tok,uid).run();
  return{token:tok};
}

async function auth(env,req){
  let tok=(req.headers.get("authorization")||"").replace(/^Bearer\s+/i,"");
  if(!tok)return null;
  return await env.DB.prepare("SELECT users.* FROM sessions JOIN users ON users.id=sessions.user_id WHERE token=?").bind(tok).first();
}

function rp(sc){let[h,a]=String(sc).split(":").map(Number);return h>a?"1":h<a?"2":"X"}

async function recalc(env){
  let us=(await env.DB.prepare("SELECT id FROM users").all()).results||[];
  for(let u of us){
    let rows=(await env.DB.prepare("SELECT bets.pick,matches.score FROM bets JOIN matches ON matches.id=bets.match_id WHERE bets.user_id=? AND matches.confirmed=1 AND matches.score IS NOT NULL").bind(u.id).all()).results||[];
    await env.DB.prepare("UPDATE users SET points=? WHERE id=?").bind(rows.reduce((s,r)=>s+(r.pick==rp(r.score)?1:0),0),u.id).run();
  }
}

async function app(env,me){
  await recalc(env);
  let set=await env.DB.prepare("SELECT * FROM settings WHERE id='main'").first();
  set.split=JSON.parse(set.split||"[50,30,20]");
  let sea=await env.DB.prepare("SELECT * FROM seasons WHERE active=1 LIMIT 1").first()||{id:"none",name:"Žádná aktivní soutěž"};
  let seasons=(await env.DB.prepare("SELECT * FROM seasons ORDER BY active DESC,status,name").all()).results||[];
  let matches=(await env.DB.prepare("SELECT *, CASE WHEN status='finished' THEN 'finished' WHEN datetime(start_time) <= datetime('now') THEN 'locked' ELSE status END AS effective_status FROM matches WHERE season_id=? ORDER BY start_time").bind(sea.id).all()).results||[];
  let bets=(await env.DB.prepare("SELECT * FROM bets WHERE user_id=?").bind(me.id).all()).results||[];
  let ranking=(await env.DB.prepare("SELECT id,name,role,approved,paid,avatar,points FROM users WHERE approved=1 AND paid=1 ORDER BY points DESC,name").all()).results||[];
  let pending=["admin","superadmin"].includes(me.role)?((await env.DB.prepare("SELECT id,name,avatar FROM users WHERE approved=0 OR paid=0 ORDER BY name").all()).results||[]):[];
  return{settings:set,season:sea,seasons,matches,bets,ranking,pending,pool:{players:ranking.length,game:ranking.length*set.game_fee,admin:ranking.length*set.admin_fee}};
}

async function bet(env,me,b){
  if(!me.approved||!me.paid)throw Error("Účet není aktivovaný.");
  let m=await env.DB.prepare("SELECT *, CASE WHEN status='finished' THEN 'finished' WHEN datetime(start_time) <= datetime('now') THEN 'locked' ELSE status END AS effective_status FROM matches WHERE id=?").bind(b.matchId).first();
  if(!m||m.effective_status!="open")throw Error("Zápas už nejde tipovat.");
  if(!["1","X","2"].includes(b.pick))throw Error("Neplatný tip.");
  await env.DB.prepare("INSERT INTO bets(user_id,match_id,pick,created_at) VALUES(?,?,?,datetime('now')) ON CONFLICT(user_id,match_id) DO UPDATE SET pick=excluded.pick,created_at=datetime('now')")
    .bind(me.id,b.matchId,b.pick).run();
  return{ok:true};
}

async function approve(env,me,b){adm(me);await env.DB.prepare("UPDATE users SET approved=1,paid=1 WHERE id=?").bind(b.userId).run();return{ok:true}}
async function settings(env,me,b){adm(me);await env.DB.prepare("UPDATE settings SET admin_fee=?,game_fee=?,split=?,bank_account=?,access_code=? WHERE id='main'").bind(+b.admin_fee||10,+b.game_fee||100,JSON.stringify(b.split||[50,30,20]),b.bank_account||"240616/617/0300",b.access_code||"TIP2026").run();return{ok:true}}
async function createSeason(env,me,b){adm(me);await env.DB.prepare("INSERT INTO seasons(id,name,description,sport,active,public,status) VALUES(?,?,?,?,0,0,'draft')").bind(id("season"),b.name||"Nová soutěž",b.description||"",b.sport||"hockey").run();return{ok:true}}
async function addMatch(env,me,b){adm(me);let s=await env.DB.prepare("SELECT * FROM seasons WHERE active=1").first();if(!s)throw Error("Není aktivní soutěž");if(!b.home||!b.away||!b.start_time)throw Error("Vyplň čas a týmy");await env.DB.prepare("INSERT INTO matches(id,season_id,phase,start_time,home,away,home_flag,away_flag,status,confirmed,info) VALUES(?,?,?,?,?,?,?,?, 'open',0,'Ručně přidaný zápas')").bind(id("m"),s.id,b.phase||"Zápas",b.start_time,b.home,b.away,"🏒","🏒").run();return{ok:true}}
async function status(env,me,b){adm(me);await env.DB.prepare("UPDATE matches SET status=? WHERE id=?").bind(b.status,b.matchId).run();return{ok:true}}
async function result(env,me,b){adm(me);if(!/^\d+\s*:\s*\d+$/.test(b.score||""))throw Error("Výsledek musí být např. 4:2");await env.DB.prepare("UPDATE matches SET score=?,status='finished',confirmed=1 WHERE id=?").bind(String(b.score).replace(/\s/g,""),b.matchId).run();await recalc(env);return{ok:true}}
async function bulkImport(env,me,b){adm(me);let s=await env.DB.prepare("SELECT * FROM seasons WHERE active=1").first();let lines=String(b.text||"").split(/\n+/).map(x=>x.trim()).filter(Boolean),count=0;for(let line of lines){let [dt,phase,home,away]=line.split(";").map(x=>(x||"").trim());if(!home||!away||!dt)continue;await env.DB.prepare("INSERT INTO matches(id,season_id,phase,start_time,home,away,home_flag,away_flag,status,confirmed,info) VALUES(?,?,?,?,?,?,?,?, 'open',0,'Importovaný zápas')").bind(id("m"),s.id,phase||"Zápas",dt.replace(" ","T"),home,away,"🏒","🏒").run();count++}return{ok:true,count}}
