import { json, currentUser } from '../../_shared.js';

export async function onRequest(context) {
  const user = await currentUser(context);
  return json({ ok: true, user });
}
