import { json } from '../../_shared.js';

export async function onRequestGet(context) {
  if (!context.env.DB) return json({ ok: false, error: 'Chybí D1 binding DB.' }, 500);
  const { results } = await context.env.DB.prepare(
    `SELECT id, home_team, away_team, starts_at, home_score, away_score, status
     FROM matches ORDER BY starts_at ASC`
  ).all();
  return json({ ok: true, matches: results || [] });
}
