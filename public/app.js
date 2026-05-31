const $ = (id) => document.getElementById(id);

async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: 'include',
    headers: { 'content-type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    const text = await res.text();
    throw new Error(`API vrátilo ${ct || 'neznámý typ'} místo JSON. Začátek odpovědi: ${text.slice(0, 80)}`);
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

async function refresh() {
  const debug = {};
  try {
    const test = await api('/api/test');
    debug.test = test;
    $('apiStatus').textContent = 'API je správně routované do Pages Functions.';
  } catch (e) {
    $('apiStatus').textContent = 'API problém: ' + e.message;
    $('debug').textContent = JSON.stringify({ error: e.message }, null, 2);
    return;
  }

  try {
    const me = await api('/api/auth/me');
    debug.me = me;
    if (me.user) {
      $('loginCard').classList.add('hidden');
      $('appCard').classList.remove('hidden');
      $('userBox').textContent = `Přihlášen: ${me.user.name || me.user.login}`;
    } else {
      $('loginCard').classList.remove('hidden');
      $('appCard').classList.add('hidden');
      $('userBox').textContent = 'Nepřihlášen';
    }
  } catch (e) {
    debug.meError = e.message;
  }
  $('debug').textContent = JSON.stringify(debug, null, 2);
}

$('loginForm').addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const fd = new FormData(ev.currentTarget);
  $('loginMsg').textContent = 'Přihlašuji…';
  $('loginMsg').className = 'msg';
  try {
    await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ login: fd.get('login'), password: fd.get('password') })
    });
    $('loginMsg').textContent = 'Přihlášení proběhlo.';
    $('loginMsg').className = 'msg ok';
    await refresh();
  } catch (e) {
    $('loginMsg').textContent = e.message;
    $('loginMsg').className = 'msg error';
  }
});

$('logoutBtn').addEventListener('click', async () => {
  await api('/api/auth/logout', { method: 'POST', body: '{}' });
  await refresh();
});

refresh();
