import { Spinner } from "./Spinner.js";
import { Timeslots } from "./Timeslots.js";

export function CourtCard({ court, state, onRetry }) {
  const e = window.React.createElement;

  return e("div", { className: "courtCard" }, [
    e("div", { key: "h", className: "courtHeader" }, [
      e("div", { key: "n", className: "courtName" }, court),
      state?.status === "error"
        ? e(
            "button",
            { key: "r", className: "linkBtn", onClick: () => onRetry?.() },
            "Retry"
          )
        : null
    ]),
    state?.status === "loading"
      ? e(Spinner, { key: "s", label: "Loading" })
      : state?.status === "error"
        ? e("pre", { key: "e", className: "courtError" }, state.error)
        : e(Timeslots, { key: "t", slots: state?.slots ?? [] })
  ]);
}

