export function getCookie(name) {
  const parts = document.cookie ? document.cookie.split("; ") : [];
  for (const p of parts) {
    const idx = p.indexOf("=");
    const k = idx === -1 ? p : p.slice(0, idx);
    if (k === name) return decodeURIComponent(p.slice(idx + 1));
  }
  return "";
}

export function setCookie(name, value) {
  // 7 days, localhost only
  const maxAge = 60 * 60 * 24 * 7;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function deleteCookie(name) {
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

