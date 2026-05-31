import { json, readJson, verifyPassword, sha256, setSessionCookie } from '../../_shared.js';

export async function onRequestPost(context) {
  if (!context.env.DB) return json({ ok: false, error: 'Chybí D1 binding DB v Cloudflare Pages.' }, 500);
  const { login, password } = await readJson(context.request);
  if (!login || !password) return json({ ok: false, error: 'Vyplň login i heslo.' }, 400);

  const user = await context.env.DB.prepare(
    `SELECT id, login, email, name, role, password_hash, active FROM users
     WHERE lower(login) = lower(?) OR lower(email) = lower(?) LIMIT 1`
  ).bind(String(login).trim(), String(login).trim()).first();

  if (!user || !user.active) return json({ ok: false, error: 'Neplatné přihlašovací údaje.' }, 401);
  const valid = await verifyPassword(String(password), user.password_hash);
  if (!valid) return json({ ok: false, error: 'Neplatné přihlašovací údaje.' }, 401);

  const token = crypto.randomUUID() + '.' + crypto.randomUUID();
  const tokenHash = await sha256(token);
  await context.env.DB.prepare(
    `INSERT INTO sessions (token_hash, user_id, expires_at, created_at)
     VALUES (?, ?, datetime('now', '+14 days'), datetime('now'))`
  ).bind(tokenHash, user.id).run();

  return json({ ok: true, user: { id: user.id, login: user.login, email: user.email, name: user.name, role: user.role } }, 200, {
    'set-cookie': setSessionCookie(token)
  });
}

export async function onRequestGet() {
  return json({ ok: false, error: 'Použij POST.' }, 405);
}
