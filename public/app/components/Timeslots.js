function fmtTime(iso) {
  const dt = new Date(iso);
  return dt.toLocaleTimeString(undefined, {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  });
}

function slotClass(slot) {
  if (slot.availability > 0) return "slot free";
  return "slot unavailable";
}

export function Timeslots({ slots }) {
  const e = window.React.createElement;

  if (!slots?.length) {
    return e("div", { className: "slotsEmpty" }, "No slots");
  }

  return e(
    "div",
    { className: "slotsGrid" },
    slots.map((s, i) =>
      e(
        "div",
        {
          key: `${s.start}-${i}`,
          className: slotClass(s),
          title: `${fmtTime(s.start)}–${fmtTime(s.end)} | availability=${s.availability}${s.blocked_by_resource ? " | blocked" : ""
            }`
        },
        e("div", { className: "slotTime" }, `${fmtTime(s.start)}–${fmtTime(s.end)}`)
      )
    )
  );
}

