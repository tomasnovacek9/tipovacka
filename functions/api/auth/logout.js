import { json, getCookie, sha256, clearSessionCookie } from '../../_shared.js';

export async function onRequestPost(context) {
  const token = getCookie(context.request, 'session');
  if (token && context.env.DB) {
    const tokenHash = await sha256(token);
    await context.env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(tokenHash).run();
  }
  return json({ ok: true }, 200, { 'set-cookie': clearSessionCookie() });
}
