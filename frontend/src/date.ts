export function toIsoDay(date: Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export function fromIsoDay(isoDay: string) {
    const [y, m, d] = isoDay.split("-").map((part) => Number(part));
    return new Date(y, m - 1, d);
}

export function addDays(isoDay: string, delta: number) {
    const dt = fromIsoDay(isoDay);
    dt.setDate(dt.getDate() + delta);
    return toIsoDay(dt);
}

export function formatDayLabel(isoDay: string) {
    const dt = fromIsoDay(isoDay);
    return dt.toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit"
    });
}
