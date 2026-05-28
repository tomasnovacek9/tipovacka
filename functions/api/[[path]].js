export async function onRequestGet(context) {

  const API_KEY = context.env.APISPORTS_KEY;

  // MS v hokeji 2024
  const LEAGUE_ID = "111";
  const SEASON = "2024";

  const url =
    `https://v1.hockey.api-sports.io/games?league=${LEAGUE_ID}&season=${SEASON}`;

  try {

    const response = await fetch(url, {
      headers: {
        "x-apisports-key": API_KEY
      }
    });

    const data = await response.json();

    return new Response(JSON.stringify({
      ok: true,
      season: SEASON,
      league: LEAGUE_ID,
      games: data.response || [],
      results: data.results || 0
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {

    return new Response(JSON.stringify({
      ok: false,
      error: err.message
    }), {
      headers: {
        "Content-Type": "application/json"
      },
      status: 500
    });

  }

}
