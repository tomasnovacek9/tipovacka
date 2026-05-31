import { json } from '../_shared.js';

export async function onRequest(context) {
  return json({
    ok: true,
    source: 'cloudflare-pages-function',
    hasDB: Boolean(context.env.DB),
    time: new Date().toISOString()
  });
}
