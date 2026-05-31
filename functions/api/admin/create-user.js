import { json, readJson, hashPassword, currentUser } from '../../_shared.js';

export async function onRequestPost(context) {
  if (!context.env.DB) return json({ ok: false, error: 'Chybí D1 binding DB.' }, 500);

  const existing = await context.env.DB.prepare('SELECT COUNT(*) AS c FROM users').first();
  const me = await currentUser(context);
  const setupToken = context.env.SETUP_TOKEN;
  const body = await readJson(context.request);

  if (existing.c > 0) {
    if (!me || me.role !== 'admin') return json({ ok: false, error: 'Pouze admin může vytvořit dalšího uživatele.' }, 403);
  } else if (setupToken && body.setupToken !== setupToken) {
    return json({ ok: false, error: 'První vytvoření admina vyžaduje správný SETUP_TOKEN.' }, 403);
  }

  const login = String(body.login || '').trim();
  const email = String(body.email || '').trim();
  const name = String(body.name || login).trim();
  const password = String(body.password || '');
  const role = body.role === 'admin' ? 'admin' : 'player';
  if (!login || !password) return json({ ok: false, error: 'Chybí login nebo heslo.' }, 400);

  const passwordHash = await hashPassword(password);
  const result = await context.env.DB.prepare(
    `INSERT INTO users (login, email, name, role, password_hash, active, created_at)
     VALUES (?, ?, ?, ?, ?, 1, datetime('now'))`
  ).bind(login, email, name, role, passwordHash).run();

  return json({ ok: true, id: result.meta.last_row_id, login, email, name, role });
}
