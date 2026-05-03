import { addDays, formatDayLabel } from "../date.js";

export function DatePicker({ day, setDay }) {
  const e = window.React.createElement;

  return e("div", { className: "datePicker" }, [
    e(
      "button",
      { key: "prev", className: "iconBtn", onClick: () => setDay(addDays(day, -1)), title: "Previous day" },
      "←"
    ),
    e("div", { key: "label", className: "dateLabel" }, formatDayLabel(day)),
    e(
      "button",
      { key: "next", className: "iconBtn", onClick: () => setDay(addDays(day, 1)), title: "Next day" },
      "→"
    ),
    e("div", { key: "sp", style: { flex: 1 } }),
    e("input", {
      key: "inp",
      className: "dateInput",
      type: "date",
      value: day,
      onChange: (ev) => setDay(ev.target.value)
    })
  ]);
}

