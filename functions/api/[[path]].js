const TEAMS={"Mexiko": "🇲🇽", "Jihoafrická republika": "🇿🇦", "Česko": "🇨🇿", "Česká republika": "🇨🇿", "Czech Republic": "🇨🇿", "Korejská republika": "🇰🇷", "Jižní Korea": "🇰🇷", "South Korea": "🇰🇷", "Kanada": "🇨🇦", "Canada": "🇨🇦", "Bosna a Hercegovina": "🇧🇦", "Bosnia and Herzegovina": "🇧🇦", "Katar": "🇶🇦", "Qatar": "🇶🇦", "Švýcarsko": "🇨🇭", "Switzerland": "🇨🇭", "Brazílie": "🇧🇷", "Brazil": "🇧🇷", "Maroko": "🇲🇦", "Morocco": "🇲🇦", "Haiti": "🇭🇹", "Skotsko": "🏴", "Scotland": "🏴", "USA": "🇺🇸", "Spojené státy": "🇺🇸", "United States": "🇺🇸", "Paraguay": "🇵🇾", "Austrálie": "🇦🇺", "Australia": "🇦🇺", "Turecko": "🇹🇷", "Turkey": "🇹🇷", "Německo": "🇩🇪", "Germany": "🇩🇪", "Curaçao": "🇨🇼", "Curacao": "🇨🇼", "Pobřeží slonoviny": "🇨🇮", "Ivory Coast": "🇨🇮", "Ekvádor": "🇪🇨", "Ecuador": "🇪🇨", "Nizozemsko": "🇳🇱", "Netherlands": "🇳🇱", "Japonsko": "🇯🇵", "Japan": "🇯🇵", "Švédsko": "🇸🇪", "Sweden": "🇸🇪", "Tunisko": "🇹🇳", "Tunisia": "🇹🇳", "Belgie": "🇧🇪", "Belgium": "🇧🇪", "Egypt": "🇪🇬", "Írán": "🇮🇷", "Iran": "🇮🇷", "Nový Zéland": "🇳🇿", "New Zealand": "🇳🇿", "Španělsko": "🇪🇸", "Spain": "🇪🇸", "Kapverdy": "🇨🇻", "Cape Verde": "🇨🇻", "Saúdská Arábie": "🇸🇦", "Saudi Arabia": "🇸🇦", "Uruguay": "🇺🇾", "Francie": "🇫🇷", "France": "🇫🇷", "Senegal": "🇸🇳", "Irák": "🇮🇶", "Iraq": "🇮🇶", "Norsko": "🇳🇴", "Norway": "🇳🇴", "Argentina": "🇦🇷", "Alžírsko": "🇩🇿", "Algeria": "🇩🇿", "Rakousko": "🇦🇹", "Austria": "🇦🇹", "Jordánsko": "🇯🇴", "Jordan": "🇯🇴", "Portugalsko": "🇵🇹", "Portugal": "🇵🇹", "DR Kongo": "🇨🇩", "DR Congo": "🇨🇩", "Uzbekistán": "🇺🇿", "Uzbekistan": "🇺🇿", "Kolumbie": "🇨🇴", "Colombia": "🇨🇴", "Anglie": "🏴", "England": "🏴", "Chorvatsko": "🇭🇷", "Croatia": "🇭🇷", "Ghana": "🇬🇭", "Panama": "🇵🇦", "TBD": "🏳️", "1A":"🏳️", "1B":"🏳️", "1C":"🏳️", "1D":"🏳️", "1E":"🏳️", "1F":"🏳️", "1G":"🏳️", "1H":"🏳️", "1I":"🏳️", "1J":"🏳️", "1K":"🏳️", "1L":"🏳️", "2A":"🏳️", "2B":"🏳️", "2C":"🏳️", "2D":"🏳️", "2E":"🏳️", "2F":"🏳️", "2G":"🏳️", "2H":"🏳️", "2I":"🏳️", "2J":"🏳️", "2K":"🏳️", "2L":"🏳️"};
const SEEDS=makeSeeds();
const DEFAULT_RULES="<h2>Pravidla a návod k tipovačce</h2><p>Vítej v tipovačce k soutěži <b>FIFA World Cup 2026</b>. Aplikace slouží k tipování přesných výsledků zápasů, průběžnému vyhodnocování bodů a porovnání s ostatními tipéry.</p><h2>⚽ Jak tipovat</h2><ul><li>U každého zápasu zadáš přesný výsledek, například <b>2 : 1</b>.</li><li>Tip můžeš upravovat až do začátku utkání.</li><li>Jakmile zápas začne, tipování se automaticky uzamkne.</li><li>Pokud zapomeneš tipnout, za daný zápas získáš 0 bodů.</li></ul><h2>🎯 Bodování</h2><ul><li><b>3 body</b> získáš za přesný výsledek.</li><li><b>1 bod</b> získáš za trefenou výhru, remízu nebo prohru.</li><li><b>0 bodů</b> získáš za špatný tip nebo nevyplněný tip.</li></ul><h2>👥 Tipy ostatních hráčů</h2><ul><li>Před uzavřením tipování vidíš pouze svůj tip.</li><li>Po uzamčení zápasu se zobrazí tipy ostatních hráčů.</li><li>Po vyhodnocení zápasu uvidíš všechny tipy i výsledek.</li></ul><h2>📊 Pořadí</h2><ol><li>Nejdříve rozhoduje celkový počet bodů.</li><li>Při shodě rozhoduje počet přesných tipů za 3 body.</li><li>Poté rozhoduje počet trefených výher/remíz/proher za 1 bod.</li></ol><p><b>Vyh.</b> = vyhodnocené tipy / všechny tipy hráče. <b>1b</b> = trefená výhra, remíza nebo prohra. <b>3b</b> = přesný výsledek. <b>Body</b> = celkové body.</p><h2>👤 Účet a přezdívka</h2><ul><li>Ostatní hráči vidí pouze tvoji přezdívku.</li><li>Jméno, příjmení a e-mail vidí pouze administrátor.</li><li>Každý hráč může mít pouze jeden účet.</li></ul><h2>💳 Platba a aktivace účtu</h2><ul><li>Po registraci účet čeká na aktivaci.</li><li>Pokyny k platbě najdeš po přihlášení v sekci Profil.</li><li>Do zprávy pro příjemce uveď svůj údaj do platby, například <b>TIP-KANONYR89</b>.</li><li>Po spárování platby administrátor účet aktivuje.</li></ul><h2>🔄 Vyhodnocení zápasů</h2><ul><li>Výsledky zadává administrátor.</li><li>Po zadání výsledku se body přepočítají automaticky.</li><li>Pořadí, profil i dashboard se aktualizují automaticky.</li></ul><h2>📱 Přidání aplikace na plochu</h2><h3>iPhone / iPad</h3><ol><li>Otevři aplikaci v Safari.</li><li>Klepni na ikonu Sdílet.</li><li>Vyber <b>Přidat na plochu</b>.</li></ol><h3>Android</h3><ol><li>Otevři aplikaci v Chrome.</li><li>Otevři menu prohlížeče.</li><li>Vyber <b>Přidat na plochu</b>.</li></ol><h2>ℹ️ Důležité informace</h2><ul><li>Nepředávej své přihlašovací údaje jiným osobám.</li><li>Při technických problémech kontaktuj administrátora soutěže.</li><li>Organizátor může pravidla doplnit nebo upřesnit.</li></ul>";
export async function onRequest({request,env}){const path=new URL(request.url).pathname.replace(/^\/api/,"")||"/";try{await tables(env);await base(env);if(path=="/")return j({ok:true,api:true,version:'v64',message:'TIPOVAČKA API běží'});if(path=="/auth/login"&&request.method=="POST")return j(await login(env,await request.json()));if(path=="/auth/register"&&request.method=="POST")return j(await reg(env,await request.json()));if(path=="/health")return j({ok:true,version:'v64',api:true,db:!!env.DB});const me=await auth(env,request);if(!me)return j({error:"Nepřihlášeno"},401);if(path=="/me")return j({user:pub(me)});if(path=="/app")return j(await app(env,me));if(path=="/bets"&&request.method=="POST")return j(await bet(env,me,await request.json()));if(path=="/admin/approve"&&request.method=="POST")return j(await approve(env,me,await request.json()));if(path=="/admin/deactivate"&&request.method=="POST")return j(await deactivate(env,me,await request.json()));if(path=="/admin/delete-user"&&request.method=="POST")return j(await deleteUser(env,me,await request.json()));if(path=="/admin/role"&&request.method=="POST")return j(await setRole(env,me,await request.json()));if(path=="/admin/reset-password"&&request.method=="POST")return j(await resetPassword(env,me,await request.json()));if(path=="/admin/settings"&&request.method=="POST")return j(await settings(env,me,await request.json()));if(path=="/admin/add-match"&&request.method=="POST")return j(await addMatch(env,me,await request.json()));if(path=="/admin/edit-match"&&request.method=="POST")return j(await editMatch(env,me,await request.json()));if(path=="/admin/status"&&request.method=="POST")return j(await status(env,me,await request.json()));if(path=="/admin/result"&&request.method=="POST")return j(await result(env,me,await request.json()));if(path=="/admin/import"&&request.method=="POST")return j(await bulkImport(env,me,await request.json()));if(path=="/admin/reset-schedule"&&request.method=="POST")return j(await resetSchedule(env,me));if(path=="/admin/recalc"&&request.method=="POST")return j(await recalc(env).then(()=>({ok:true})));return j({error:"Nenalezeno"},404)}catch(e){return j({error:e.message||String(e)},400)}}
function j(o,s=200){return new Response(JSON.stringify(o),{status:s,headers:{"content-type":"application/json;charset=utf-8","cache-control":"no-store"}})}
function id(p="id"){return p+Math.random().toString(36).slice(2)+Date.now().toString(36)}function norm(s){return String(s||"").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ")}function ini(f,l){return (String(f)[0]||"")+(String(l)[0]||"")}function pay(n){return "TIP-"+String(n||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9]/g,"").toUpperCase().slice(0,18)}function flag(t){t=String(t||""); if(TEAMS[t]) return TEAMS[t]; if(/^(1|2|3)[A-L]/.test(t)||/Vítěz|Poražený|M\d+|postup|Dopln/i.test(t)) return "▫️"; return "🏳️"}async function hash(s){let b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode("tip2026:"+s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}function adm(me){if(!["admin","superadmin"].includes(me.role))throw Error("Bez oprávnění")}
async function tables(env){const q=[`CREATE TABLE IF NOT EXISTS v21_settings(id TEXT PRIMARY KEY,admin_fee INTEGER DEFAULT 0,game_fee INTEGER DEFAULT 0,bank_account TEXT DEFAULT '',access_code TEXT DEFAULT 'TIP2026',rules_html TEXT,competition_name TEXT DEFAULT 'FIFA World Cup 2026',competition_subtitle TEXT DEFAULT 'MS ve fotbale 2026',competition_logo_url TEXT DEFAULT '/worldcup2026-logo.png')`,`CREATE TABLE IF NOT EXISTS v21_users(id TEXT PRIMARY KEY,first TEXT NOT NULL,last TEXT NOT NULL,nick TEXT NOT NULL,email TEXT,phone TEXT,payment_note TEXT,name_norm TEXT NOT NULL UNIQUE,password_hash TEXT NOT NULL,role TEXT DEFAULT 'player',approved INTEGER DEFAULT 0,paid INTEGER DEFAULT 0,points INTEGER DEFAULT 0,tips_count INTEGER DEFAULT 0,evaluated_count INTEGER DEFAULT 0,hit_1 INTEGER DEFAULT 0,hit_3 INTEGER DEFAULT 0)`,`CREATE TABLE IF NOT EXISTS v21_sessions(token TEXT PRIMARY KEY,user_id TEXT NOT NULL,created_at TEXT NOT NULL)`,`CREATE TABLE IF NOT EXISTS v21_seasons(id TEXT PRIMARY KEY,name TEXT,active INTEGER DEFAULT 0)`,`CREATE TABLE IF NOT EXISTS v21_matches(id TEXT PRIMARY KEY,season_id TEXT,phase TEXT,start_time TEXT,home TEXT,away TEXT,home_flag TEXT,away_flag TEXT,status TEXT DEFAULT 'open',score TEXT,confirmed INTEGER DEFAULT 0,info TEXT)`,`CREATE UNIQUE INDEX IF NOT EXISTS v21_match_unique ON v21_matches(season_id,start_time,home,away)`,`CREATE TABLE IF NOT EXISTS v21_bets(user_id TEXT,match_id TEXT,pick TEXT,home_goals INTEGER,away_goals INTEGER,created_at TEXT,PRIMARY KEY(user_id,match_id))`];for(const x of q)await env.DB.prepare(x).run();for(const x of ["ALTER TABLE v21_settings ADD COLUMN competition_name TEXT DEFAULT 'FIFA World Cup 2026'","ALTER TABLE v21_settings ADD COLUMN competition_subtitle TEXT DEFAULT 'MS ve fotbale 2026'","ALTER TABLE v21_settings ADD COLUMN competition_logo_url TEXT DEFAULT '/worldcup2026-logo.png'"]){try{await env.DB.prepare(x).run()}catch(e){}}}
async function base(env){await env.DB.prepare("INSERT OR IGNORE INTO v21_settings(id,access_code,rules_html,competition_name,competition_subtitle,competition_logo_url) VALUES('main','TIP2026',?,'FIFA World Cup 2026','MS ve fotbale 2026','/worldcup2026-logo.png')").bind(DEFAULT_RULES).run();await env.DB.prepare("UPDATE v21_settings SET rules_html=? WHERE id='main' AND (rules_html IS NULL OR trim(rules_html)='' OR length(rules_html)<800)").bind(DEFAULT_RULES).run();await env.DB.prepare("INSERT OR IGNORE INTO v21_seasons(id,name,active) VALUES('football-2026','MS ve fotbale 2026',1)").run();await env.DB.prepare("INSERT OR REPLACE INTO v21_users(id,first,last,nick,email,phone,payment_note,name_norm,password_hash,role,approved,paid) VALUES('u-admin','Admin','','Admin','','','ADMIN','admin',?,'superadmin',1,1)").bind(await hash("admiN9")).run();await ensureOfficialSchedule(env,{clean:false,update:false})}
function makeSeeds(){let out=[];let add=(id,phase,dt,h,a,info="")=>out.push([id,phase,dt,h,a,info]);
add("m1","Skupina A","2026-06-11T21:00","Mexiko","Jihoafrická republika","Zahajovací zápas");
add("m2","Skupina A","2026-06-12T04:00","Jižní Korea","Česko","Skupina A");
add("m3","Skupina A","2026-06-18T18:00","Česko","Jihoafrická republika","Skupina A");
add("m4","Skupina A","2026-06-19T03:00","Mexiko","Jižní Korea","Skupina A");
add("m5","Skupina A","2026-06-25T03:00","Jihoafrická republika","Jižní Korea","Skupina A");
add("m6","Skupina A","2026-06-25T03:00","Česko","Mexiko","Skupina A");
add("m7","Skupina B","2026-06-12T21:00","Kanada","Bosna a Hercegovina","Skupina B");
add("m8","Skupina B","2026-06-13T21:00","Katar","Švýcarsko","Skupina B");
add("m9","Skupina B","2026-06-18T21:00","Švýcarsko","Bosna a Hercegovina","Skupina B");
add("m10","Skupina B","2026-06-19T00:00","Kanada","Katar","Skupina B");
add("m11","Skupina B","2026-06-24T21:00","Švýcarsko","Kanada","Skupina B");
add("m12","Skupina B","2026-06-24T21:00","Bosna a Hercegovina","Katar","Skupina B");
add("m13","Skupina C","2026-06-14T00:00","Brazílie","Maroko","Skupina C");
add("m14","Skupina C","2026-06-14T03:00","Haiti","Skotsko","Skupina C");
add("m15","Skupina C","2026-06-20T00:00","Skotsko","Maroko","Skupina C");
add("m16","Skupina C","2026-06-20T03:00","Brazílie","Haiti","Skupina C");
add("m17","Skupina C","2026-06-25T00:00","Skotsko","Brazílie","Skupina C");
add("m18","Skupina C","2026-06-25T00:00","Maroko","Haiti","Skupina C");
add("m19","Skupina D","2026-06-13T03:00","USA","Paraguay","Skupina D");
add("m20","Skupina D","2026-06-14T06:00","Austrálie","Turecko","Skupina D");
add("m21","Skupina D","2026-06-19T21:00","USA","Austrálie","Skupina D");
add("m22","Skupina D","2026-06-20T06:00","Turecko","Paraguay","Skupina D");
add("m23","Skupina D","2026-06-26T04:00","Turecko","USA","Skupina D");
add("m24","Skupina D","2026-06-26T04:00","Paraguay","Austrálie","Skupina D");
add("m25","Skupina E","2026-06-14T19:00","Německo","Curaçao","Skupina E");
add("m26","Skupina E","2026-06-15T01:00","Pobřeží slonoviny","Ekvádor","Skupina E");
add("m27","Skupina E","2026-06-20T22:00","Německo","Pobřeží slonoviny","Skupina E");
add("m28","Skupina E","2026-06-21T02:00","Ekvádor","Curaçao","Skupina E");
add("m29","Skupina E","2026-06-25T21:00","Curaçao","Pobřeží slonoviny","Skupina E");
add("m30","Skupina E","2026-06-25T22:00","Ekvádor","Německo","Skupina E");
add("m31","Skupina F","2026-06-14T22:00","Nizozemsko","Japonsko","Skupina F");
add("m32","Skupina F","2026-06-15T04:00","Švédsko","Tunisko","Skupina F");
add("m33","Skupina F","2026-06-20T19:00","Nizozemsko","Švédsko","Skupina F");
add("m34","Skupina F","2026-06-21T06:00","Tunisko","Japonsko","Skupina F");
add("m35","Skupina F","2026-06-26T01:00","Tunisko","Nizozemsko","Skupina F");
add("m36","Skupina F","2026-06-26T01:00","Japonsko","Švédsko","Skupina F");
add("m37","Skupina G","2026-06-15T21:00","Belgie","Egypt","Skupina G");
add("m38","Skupina G","2026-06-16T03:00","Írán","Nový Zéland","Skupina G");
add("m39","Skupina G","2026-06-21T21:00","Belgie","Írán","Skupina G");
add("m40","Skupina G","2026-06-22T03:00","Nový Zéland","Egypt","Skupina G");
add("m41","Skupina G","2026-06-27T05:00","Nový Zéland","Belgie","Skupina G");
add("m42","Skupina G","2026-06-27T05:00","Egypt","Írán","Skupina G");
add("m43","Skupina H","2026-06-15T18:00","Španělsko","Kapverdy","Skupina H");
add("m44","Skupina H","2026-06-16T00:00","Saúdská Arábie","Uruguay","Skupina H");
add("m45","Skupina H","2026-06-21T18:00","Španělsko","Saúdská Arábie","Skupina H");
add("m46","Skupina H","2026-06-22T00:00","Uruguay","Kapverdy","Skupina H");
add("m47","Skupina H","2026-06-27T02:00","Saúdská Arábie","Kapverdy","Skupina H");
add("m48","Skupina H","2026-06-27T02:00","Uruguay","Španělsko","Skupina H");
add("m49","Skupina I","2026-06-16T21:00","Francie","Senegal","Skupina I");
add("m50","Skupina I","2026-06-17T00:00","Irák","Norsko","Skupina I");
add("m51","Skupina I","2026-06-22T23:00","Francie","Irák","Skupina I");
add("m52","Skupina I","2026-06-23T02:00","Senegal","Norsko","Skupina I");
add("m53","Skupina I","2026-06-26T21:00","Senegal","Irák","Skupina I");
add("m54","Skupina I","2026-06-26T21:00","Norsko","Francie","Skupina I");
add("m55","Skupina J","2026-06-17T03:00","Argentina","Alžírsko","Skupina J");
add("m56","Skupina J","2026-06-17T06:00","Rakousko","Jordánsko","Skupina J");
add("m57","Skupina J","2026-06-22T19:00","Argentina","Rakousko","Skupina J");
add("m58","Skupina J","2026-06-23T05:00","Alžírsko","Jordánsko","Skupina J");
add("m59","Skupina J","2026-06-28T04:00","Alžírsko","Rakousko","Skupina J");
add("m60","Skupina J","2026-06-28T04:00","Argentina","Jordánsko","Skupina J");
add("m61","Skupina K","2026-06-17T19:00","Portugalsko","DR Kongo","Skupina K");
add("m62","Skupina K","2026-06-18T04:00","Uzbekistán","Kolumbie","Skupina K");
add("m63","Skupina K","2026-06-23T19:00","Portugalsko","Uzbekistán","Skupina K");
add("m64","Skupina K","2026-06-24T04:00","DR Kongo","Kolumbie","Skupina K");
add("m65","Skupina K","2026-06-28T01:30","Kolumbie","Portugalsko","Skupina K");
add("m66","Skupina K","2026-06-28T01:30","DR Kongo","Uzbekistán","Skupina K");
add("m67","Skupina L","2026-06-17T22:00","Anglie","Chorvatsko","Skupina L");
add("m68","Skupina L","2026-06-18T01:00","Ghana","Panama","Skupina L");
add("m69","Skupina L","2026-06-23T22:00","Anglie","Ghana","Skupina L");
add("m70","Skupina L","2026-06-24T01:00","Chorvatsko","Panama","Skupina L");
add("m71","Skupina L","2026-06-27T23:00","Anglie","Panama","Skupina L");
add("m72","Skupina L","2026-06-27T23:00","Chorvatsko","Ghana","Skupina L");
add("m73","32 postupujících","2026-06-28T18:00","1A","3C/D/E/F","32 postupujících");
add("m74","32 postupujících","2026-06-28T21:00","2B","2F","32 postupujících");
add("m75","32 postupujících","2026-06-29T00:00","1C","3A/B/F","32 postupujících");
add("m76","32 postupujících","2026-06-29T03:00","1E","3A/B/C/D","32 postupujících");
add("m77","32 postupujících","2026-06-29T18:00","1I","3C/D/F/G","32 postupujících");
add("m78","32 postupujících","2026-06-29T21:00","2A","2C","32 postupujících");
add("m79","32 postupujících","2026-06-30T00:00","1D","3B/E/F/I","32 postupujících");
add("m80","32 postupujících","2026-06-30T03:00","1G","3A/E/H/I","32 postupujících");
add("m81","32 postupujících","2026-06-30T18:00","1B","3A/C/D/E","32 postupujících");
add("m82","32 postupujících","2026-06-30T21:00","2E","2I","32 postupujících");
add("m83","32 postupujících","2026-07-01T00:00","1F","2C","32 postupujících");
add("m84","32 postupujících","2026-07-01T03:00","1J","2H","32 postupujících");
add("m85","32 postupujících","2026-07-01T18:00","1K","3D/E/I/J","32 postupujících");
add("m86","32 postupujících","2026-07-01T21:00","2D","2G","32 postupujících");
add("m87","32 postupujících","2026-07-02T00:00","1H","2J","32 postupujících");
add("m88","32 postupujících","2026-07-02T03:00","1L","3E/G/H/I","32 postupujících");
add("m89","Osmifinále","2026-07-04T18:00","Vítěz M73","Vítěz M74","Doplní se podle postupujících");
add("m90","Osmifinále","2026-07-04T21:00","Vítěz M75","Vítěz M76","Doplní se podle postupujících");
add("m91","Osmifinále","2026-07-05T18:00","Vítěz M77","Vítěz M78","Doplní se podle postupujících");
add("m92","Osmifinále","2026-07-05T21:00","Vítěz M79","Vítěz M80","Doplní se podle postupujících");
add("m93","Osmifinále","2026-07-06T18:00","Vítěz M81","Vítěz M82","Doplní se podle postupujících");
add("m94","Osmifinále","2026-07-06T21:00","Vítěz M83","Vítěz M84","Doplní se podle postupujících");
add("m95","Osmifinále","2026-07-07T18:00","Vítěz M85","Vítěz M86","Doplní se podle postupujících");
add("m96","Osmifinále","2026-07-07T21:00","Vítěz M87","Vítěz M88","Doplní se podle postupujících");
add("m97","Čtvrtfinále","2026-07-09T21:00","Vítěz M89","Vítěz M90","Doplní se podle postupujících");
add("m98","Čtvrtfinále","2026-07-10T21:00","Vítěz M91","Vítěz M92","Doplní se podle postupujících");
add("m99","Čtvrtfinále","2026-07-11T18:00","Vítěz M93","Vítěz M94","Doplní se podle postupujících");
add("m100","Čtvrtfinále","2026-07-11T21:00","Vítěz M95","Vítěz M96","Doplní se podle postupujících");
add("m101","Semifinále","2026-07-14T21:00","Vítěz M97","Vítěz M98","Doplní se podle postupujících");
add("m102","Semifinále","2026-07-15T21:00","Vítěz M99","Vítěz M100","Doplní se podle postupujících");
add("m103","O 3. místo","2026-07-18T21:00","Poražený M101","Poražený M102","Doplní se podle postupujících");
add("m104","Finále","2026-07-19T21:00","Vítěz M101","Vítěz M102","Doplní se podle postupujících");
return out}
async function findLoginUser(env,raw){
  raw=String(raw||'').trim();
  let n=norm(raw);
  let nNoSpace=n.replace(/\s+/g,'');
  let email=raw.toLowerCase();
  if(['admin','admin admin','administrator'].includes(n)){
    await env.DB.prepare("INSERT OR REPLACE INTO v21_users(id,first,last,nick,email,phone,payment_note,name_norm,password_hash,role,approved,paid) VALUES('u-admin','Admin','','Admin','','','ADMIN','admin',?,'superadmin',1,1)").bind(await hash('admiN9')).run();
  }
  let direct=await env.DB.prepare("SELECT * FROM v21_users WHERE name_norm=? OR lower(email)=? OR lower(nick)=? LIMIT 1").bind(n,email,email).first();
  if(direct)return direct;
  if(['admin','admin admin','administrator'].includes(n)){
    let admin=await env.DB.prepare("SELECT * FROM v21_users WHERE id='u-admin'").first();
    if(admin)return admin;
  }
  // Starší verze mohly uložit name_norm s diakritikou nebo uživatel může zadat přezdívku/e-mail.
  let rows=(await env.DB.prepare("SELECT * FROM v21_users").all()).results||[];
  return rows.find(u=>{
    let full=norm((u.first||'')+' '+(u.last||''));
    let stored=norm(u.name_norm||'');
    let nick=norm(u.nick||'');
    let mail=norm(u.email||'');
    return full===n || stored===n || nick===n || mail===n || full.replace(/\s+/g,'')===nNoSpace || stored.replace(/\s+/g,'')===nNoSpace;
  })||null;
}
async function login(env,b){
  let first=String(b.first||'').trim();
  let last=String(b.last||'').trim();
  let raw=String(b.name||b.login||b.username||b.email||'').trim();
  if(!raw) raw=(first+' '+last).trim();
  let pass=String(b.password||b.pass||'');
  if(!raw||!pass)throw Error('Vyplň jméno a heslo.');

  // Nouzově robustní přihlášení správce. Tím obejdeme staré/poškozené záznamy admina v D1.
  // Funguje pro: Jméno Admin, příjmení prázdné, heslo admiN9.
  const rawNorm=norm(raw);
  if((rawNorm==='admin'||rawNorm==='administrator'||rawNorm==='admin admin') && pass==='admiN9'){
    const hp=await hash('admiN9');
    await env.DB.prepare("INSERT OR REPLACE INTO v21_users(id,first,last,nick,email,phone,payment_note,name_norm,password_hash,role,approved,paid) VALUES('u-admin','Admin','','Admin','','','ADMIN','admin',?,'superadmin',1,1)").bind(hp).run();
    let tok=id('tok');
    await env.DB.prepare("INSERT INTO v21_sessions VALUES(?,?,datetime('now'))").bind(tok,'u-admin').run();
    return{token:tok,user:'admin'}
  }

  let u=await findLoginUser(env,raw);
  if(!u)throw Error("Účet nebyl nalezen. Zkontroluj jméno a příjmení.");
  let hp=await hash(pass);
  let hpTrim=await hash(pass.trim());
  let ok=(u.password_hash===hp || u.password_hash===hpTrim);
  // Bezpečná migrace pro úplně staré testovací záznamy, pokud by heslo bylo omylem uložené jako prostý text.
  if(!ok && u.password_hash===pass){ok=true; await env.DB.prepare("UPDATE v21_users SET password_hash=? WHERE id=?").bind(hp,u.id).run()}
  if(!ok)throw Error("Špatné heslo. Pokud si ho nepamatuješ, správce ti ho může v Adminu nastavit znovu.");
  let tok=id('tok');
  await env.DB.prepare("INSERT INTO v21_sessions VALUES(?,?,datetime('now'))").bind(tok,u.id).run();
  return{token:tok}
}
async function reg(env,b){let first=String(b.first||"").trim(),last=String(b.last||"").trim(),nick=String(b.nick||"").trim(),email=String(b.email||"").trim(),phone=String(b.phone||"").trim(),pass=b.password||"",code=String(b.code||"").trim();if(!first||!last||!nick||pass.length<4)throw Error("Vyplň jméno, příjmení, přezdívku a heslo alespoň 4 znaky");let set=await env.DB.prepare("SELECT * FROM v21_settings WHERE id='main'").first();if(code!==set.access_code)throw Error("Špatný vstupní kód");let n=norm(first+" "+last);if(await env.DB.prepare("SELECT id FROM v21_users WHERE name_norm=?").bind(n).first())throw Error("Toto jméno už existuje");let uid=id("u"),tok=id("tok"),pn=pay(nick);await env.DB.prepare("INSERT INTO v21_users(id,first,last,nick,email,phone,payment_note,name_norm,password_hash,role,approved,paid) VALUES(?,?,?,?,?,?,?,?,?,'player',0,0)").bind(uid,first,last,nick,email,phone,pn,n,await hash(pass)).run();await env.DB.prepare("INSERT INTO v21_sessions VALUES(?,?,datetime('now'))").bind(tok,uid).run();return{token:tok}}
async function auth(env,req){let tok=(req.headers.get("authorization")||"").replace(/^Bearer\s+/i,"");if(!tok)return null;return await env.DB.prepare("SELECT v21_users.* FROM v21_sessions JOIN v21_users ON v21_users.id=v21_sessions.user_id WHERE token=?").bind(tok).first()}function pub(u){return{...u,full_name:(u.first+" "+u.last).trim(),public_name:u.nick,initials:ini(u.first,u.last).toUpperCase(),password_hash:undefined,name_norm:undefined}}
function pick(h,a){h=Number(h);a=Number(a);return h>a?"1":h<a?"2":"X"}function scoreBet(b,s){if(!s)return{p:0,h1:0,h3:0,ev:0};let [h,a]=s.split(":").map(Number),r=pick(h,a);if(Number(b.home_goals)==h&&Number(b.away_goals)==a)return{p:3,h1:0,h3:1,ev:1};if(b.pick==r)return{p:1,h1:1,h3:0,ev:1};return{p:0,h1:0,h3:0,ev:1}}
async function recalc(env){let us=(await env.DB.prepare("SELECT id FROM v21_users WHERE role='player'").all()).results||[];for(const u of us){let rows=(await env.DB.prepare("SELECT v21_bets.*,v21_matches.score FROM v21_bets JOIN v21_matches ON v21_matches.id=v21_bets.match_id WHERE v21_bets.user_id=? AND v21_matches.confirmed=1 AND v21_matches.score IS NOT NULL").bind(u.id).all()).results||[];let pts=0,h1=0,h3=0,ev=0;for(const r of rows){let x=scoreBet(r,r.score);pts+=x.p;h1+=x.h1;h3+=x.h3;ev+=x.ev}let tips=(await env.DB.prepare("SELECT COUNT(*) c FROM v21_bets WHERE user_id=?").bind(u.id).first()).c||0;await env.DB.prepare("UPDATE v21_users SET points=?,tips_count=?,evaluated_count=?,hit_1=?,hit_3=? WHERE id=?").bind(pts,tips,ev,h1,h3,u.id).run()}}
async function app(env,me){await recalc(env);me=await env.DB.prepare("SELECT * FROM v21_users WHERE id=?").bind(me.id).first();let set=await env.DB.prepare("SELECT * FROM v21_settings WHERE id='main'").first();let sea=await env.DB.prepare("SELECT * FROM v21_seasons WHERE active=1 LIMIT 1").first();let matches=(await env.DB.prepare("SELECT *, CASE WHEN status='finished' THEN 'finished' WHEN status='locked' THEN 'locked' WHEN datetime(start_time) <= datetime('now') THEN 'locked' ELSE status END AS effective_status FROM v21_matches WHERE season_id=? ORDER BY CASE WHEN phase LIKE 'Skupina%' THEN 0 ELSE 1 END, start_time").bind(sea.id).all()).results||[];let bets=(await env.DB.prepare("SELECT * FROM v21_bets WHERE user_id=?").bind(me.id).all()).results||[];let ranking=(await env.DB.prepare("SELECT * FROM v21_users WHERE role='player' AND approved=1 AND paid=1 ORDER BY points DESC,hit_3 DESC,hit_1 DESC,nick").all()).results||[];let users=["admin","superadmin"].includes(me.role)?((await env.DB.prepare("SELECT * FROM v21_users ORDER BY role DESC,first,last").all()).results||[]):[];let publicBets=(await env.DB.prepare("SELECT v21_bets.match_id,v21_bets.home_goals,v21_bets.away_goals,v21_bets.pick,v21_users.nick,v21_users.nick AS public_name FROM v21_bets JOIN v21_users ON v21_users.id=v21_bets.user_id JOIN v21_matches ON v21_matches.id=v21_bets.match_id WHERE v21_matches.status='finished' OR v21_matches.status='locked' OR datetime(v21_matches.start_time) <= datetime('now') ORDER BY v21_users.nick").all()).results||[];let active=ranking.filter(u=>u.approved&&u.paid).length;return{settings:set,season:sea,matches,bets,publicBets,ranking:ranking.map(pub),users:users.map(pub),meStats:pub(me),teamOptions:[...new Set([...Object.keys(TEAMS),...matches.flatMap(m=>[m.home,m.away])])].sort(),teamFlags:TEAMS,pool:{players:active,game:active*(set.game_fee||0),admin:active*(set.admin_fee||0)}}}
async function bet(env,me,b){if(me.role!=="player")throw Error("Admin netipuje");if(!me.approved||!me.paid)throw Error("Účet není aktivovaný");let m=await env.DB.prepare("SELECT *, CASE WHEN status='finished' THEN 'finished' WHEN status='locked' THEN 'locked' WHEN datetime(start_time) <= datetime('now') THEN 'locked' ELSE status END AS effective_status FROM v21_matches WHERE id=?").bind(b.matchId).first();if(!m||m.effective_status!=="open")throw Error("Zápas už nejde tipovat");let hg=Number(b.homeGoals),ag=Number(b.awayGoals);if(!Number.isFinite(hg)||!Number.isFinite(ag)||hg<0||ag<0)throw Error("Neplatný výsledek");await env.DB.prepare("INSERT INTO v21_bets(user_id,match_id,pick,home_goals,away_goals,created_at) VALUES(?,?,?,?,?,datetime('now')) ON CONFLICT(user_id,match_id) DO UPDATE SET pick=excluded.pick,home_goals=excluded.home_goals,away_goals=excluded.away_goals,created_at=datetime('now')").bind(me.id,b.matchId,pick(hg,ag),hg,ag).run();return{ok:true}}
async function approve(env,me,b){adm(me);await env.DB.prepare("UPDATE v21_users SET approved=1,paid=1 WHERE id=? AND id!='u-admin'").bind(b.userId).run();return{ok:true}}async function deactivate(env,me,b){adm(me);await env.DB.prepare("UPDATE v21_users SET approved=0,paid=0 WHERE id=? AND id!='u-admin'").bind(b.userId).run();return{ok:true}}async function deleteUser(env,me,b){adm(me);if(b.userId==='u-admin')throw Error('Hlavního admina nelze smazat');await env.DB.prepare("DELETE FROM v21_bets WHERE user_id=?").bind(b.userId).run();await env.DB.prepare("DELETE FROM v21_sessions WHERE user_id=?").bind(b.userId).run();await env.DB.prepare("DELETE FROM v21_users WHERE id=?").bind(b.userId).run();return{ok:true}}async function setRole(env,me,b){adm(me);if(b.userId==='u-admin')throw Error('Hlavnímu adminovi neměň roli');await env.DB.prepare("UPDATE v21_users SET role=? WHERE id=?").bind(b.role==='admin'?'admin':'player',b.userId).run();return{ok:true}}
async function resetPassword(env,me,b){adm(me);if(!b.userId)throw Error('Chybí uživatel');if(!b.password||String(b.password).length<4)throw Error('Heslo musí mít alespoň 4 znaky');await env.DB.prepare("UPDATE v21_users SET password_hash=? WHERE id=?").bind(await hash(b.password),b.userId).run();await env.DB.prepare("DELETE FROM v21_sessions WHERE user_id=?").bind(b.userId).run();return{ok:true}}
async function settings(env,me,b){adm(me);await env.DB.prepare("UPDATE v21_settings SET admin_fee=?,game_fee=?,bank_account=?,access_code=?,rules_html=?,competition_name=?,competition_subtitle=?,competition_logo_url=? WHERE id='main'").bind(+b.admin_fee||0,+b.game_fee||0,b.bank_account||'',b.access_code||'TIP2026',b.rules_html||DEFAULT_RULES,b.competition_name||'FIFA World Cup 2026',b.competition_subtitle||'MS ve fotbale 2026',b.competition_logo_url||'/worldcup2026-logo.png').run();return{ok:true}}
async function addMatch(env,me,b){adm(me);let s=await env.DB.prepare("SELECT * FROM v21_seasons WHERE active=1").first();let home=String(b.home||'').trim(),away=String(b.away||'').trim(),start=String(b.start_time||'').trim();if(!home||!away||!start)throw Error("Vyplň čas a týmy");if(home===away)throw Error("Vyber dva různé týmy");start=start.replace(' ','T');let existing=await env.DB.prepare("SELECT id FROM v21_matches WHERE season_id=? AND start_time=? AND home=? AND away=?").bind(s.id,start,home,away).first();if(existing)return{ok:true,exists:true,id:existing.id};await env.DB.prepare("INSERT INTO v21_matches(id,season_id,phase,start_time,home,away,home_flag,away_flag,status,confirmed,info) VALUES(?,?,?,?,?,?,?,?, 'open',0,'Ručně přidaný zápas')").bind(id('m'),s.id,b.phase||'Zápas',start,home,away,flag(home),flag(away)).run();return{ok:true,exists:false}}async function editMatch(env,me,b){adm(me);await env.DB.prepare("UPDATE v21_matches SET home=?,away=?,home_flag=?,away_flag=?,start_time=?,phase=? WHERE id=?").bind(b.home,b.away,flag(b.home),flag(b.away),b.start_time,b.phase,b.matchId).run();return{ok:true}}async function status(env,me,b){adm(me);await env.DB.prepare("UPDATE v21_matches SET status=? WHERE id=?").bind(b.status,b.matchId).run();return{ok:true}}async function result(env,me,b){adm(me);if(!/^\d+\s*:\s*\d+$/.test(b.score||''))throw Error('Výsledek musí být např. 2:1');await env.DB.prepare("UPDATE v21_matches SET score=?,status='finished',confirmed=1 WHERE id=?").bind(String(b.score).replace(/\s/g,''),b.matchId).run();await recalc(env);return{ok:true}}async function bulkImport(env,me,b){adm(me);let s=await env.DB.prepare("SELECT * FROM v21_seasons WHERE active=1").first();let lines=String(b.text||'').split(/\n+/).map(x=>x.trim()).filter(Boolean),count=0;for(const line of lines){let [dt,phase,home,away]=line.split(';').map(x=>(x||'').trim());if(!home||!away||!dt)continue;await env.DB.prepare("INSERT OR IGNORE INTO v21_matches(id,season_id,phase,start_time,home,away,home_flag,away_flag,status,confirmed,info) VALUES(?,?,?,?,?,?,?,?, 'open',0,'Importovaný zápas')").bind(id('m'),s.id,phase||'Zápas',dt.replace(' ','T'),home,away,flag(home),flag(away)).run();count++}return{ok:true,count}}

async function ensureOfficialSchedule(env,{clean=false,update=false}={}){let s=await env.DB.prepare("SELECT * FROM v21_seasons WHERE active=1").first();let added=0,updated=0,kept=0,removed=0;for(const r of SEEDS){let before=await env.DB.prepare("SELECT id FROM v21_matches WHERE id=?").bind(r[0]).first();if(!before){await env.DB.prepare("INSERT INTO v21_matches(id,season_id,phase,start_time,home,away,home_flag,away_flag,status,confirmed,info) VALUES(?,?,?,?,?,?,?,?, 'open',0,?)").bind(r[0],s.id,r[1],r[2],r[3],r[4],flag(r[3]),flag(r[4]),r[5]||"").run();added++}else if(update){await env.DB.prepare("UPDATE v21_matches SET season_id=?,phase=?,start_time=?,home=?,away=?,home_flag=?,away_flag=?,info=? WHERE id=?").bind(s.id,r[1],r[2],r[3],r[4],flag(r[3]),flag(r[4]),r[5]||"",r[0]).run();updated++}else{kept++}}
if(clean){let official=SEEDS.map(x=>x[0]);let all=(await env.DB.prepare("SELECT id FROM v21_matches WHERE season_id=?").bind(s.id).all()).results||[];for(const m of all){if(official.includes(m.id)){kept++;continue}await env.DB.prepare("DELETE FROM v21_bets WHERE match_id=?").bind(m.id).run();await env.DB.prepare("DELETE FROM v21_matches WHERE id=?").bind(m.id).run();removed++}}return{ok:true,added,updated,removed,kept,total:SEEDS.length}}
async function resetSchedule(env,me){adm(me);return await ensureOfficialSchedule(env,{clean:false,update:false})}
