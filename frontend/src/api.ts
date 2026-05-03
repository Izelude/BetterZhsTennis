export async function fetchJson<T = unknown>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);
    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error((json as any)?.error || `HTTP ${response.status}`);
    }
    return json as T;
}
