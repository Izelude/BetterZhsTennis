export async function fetchJson(url, init) {
  const r = await fetch(url, init);
  const json = await r.json().catch(() => ({}));
  if (!r.ok) {
    throw new Error(json?.error || `HTTP ${r.status}`);
  }
  return json;
}

