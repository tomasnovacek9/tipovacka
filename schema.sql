CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY,value TEXT);
CREATE TABLE IF NOT EXISTS settings(id TEXT PRIMARY KEY,admin_fee INTEGER DEFAULT 10,game_fee INTEGER DEFAULT 100,split TEXT DEFAULT '[50,30,20]',api_league_id TEXT,api_season TEXT DEFAULT '2026');
CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,name TEXT,email TEXT UNIQUE,password_hash TEXT,role TEXT DEFAULT 'player',approved INTEGER DEFAULT 0,paid INTEGER DEFAULT 0,avatar TEXT,points INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user_id TEXT,created_at TEXT);
CREATE TABLE IF NOT EXISTS seasons(id TEXT PRIMARY KEY,name TEXT,description TEXT,sport TEXT,active INTEGER DEFAULT 0,public INTEGER DEFAULT 0,status TEXT DEFAULT 'draft');
CREATE TABLE IF NOT EXISTS matches(id TEXT PRIMARY KEY,season_id TEXT,external_id TEXT,phase TEXT,start_time TEXT,home TEXT,away TEXT,home_flag TEXT,away_flag TEXT,status TEXT DEFAULT 'locked',score TEXT,confirmed INTEGER DEFAULT 0,info TEXT);
CREATE UNIQUE INDEX IF NOT EXISTS idx_matches_external ON matches(external_id);
CREATE TABLE IF NOT EXISTS bets(user_id TEXT,match_id TEXT,pick TEXT,created_at TEXT,PRIMARY KEY(user_id,match_id));
CREATE TABLE IF NOT EXISTS proposals(id TEXT PRIMARY KEY,type TEXT,match_id TEXT,text TEXT,payload TEXT,state TEXT DEFAULT 'waiting',created_at TEXT);