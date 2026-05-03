export function toIsoDay(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromIsoDay(isoDay) {
  // Interpreted in local timezone (good enough since backend uses Europe/Berlin day boundaries)
  const [y, m, d] = isoDay.split("-").map((x) => Number(x));
  return new Date(y, m - 1, d);
}

export function addDays(isoDay, delta) {
  const dt = fromIsoDay(isoDay);
  dt.setDate(dt.getDate() + delta);
  return toIsoDay(dt);
}

export function formatDayLabel(isoDay) {
  const dt = fromIsoDay(isoDay);
  return dt.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "2-digit" });
}

