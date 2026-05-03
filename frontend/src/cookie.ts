export function getCookie(name: string) {
    const parts = document.cookie ? document.cookie.split("; ") : [];
    for (const part of parts) {
        const index = part.indexOf("=");
        const key = index === -1 ? part : part.slice(0, index);
        if (key === name) return decodeURIComponent(part.slice(index + 1));
    }
    return "";
}

export function setCookie(name: string, value: string) {
    const maxAge = 60 * 60 * 24 * 7;
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function deleteCookie(name: string) {
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}
