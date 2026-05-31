export async function onRequest() {
  return new Response(JSON.stringify({
    ok: true,
    api: true,
    message: "Backend /api funguje. Pro detail použij /api/health.",
    version: "v57"
  }), {
    headers: {
      "content-type": "application/json;charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
