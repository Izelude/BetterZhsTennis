export function Spinner({ label }) {
  const e = window.React.createElement;
  return e("div", { className: "spinnerWrap" }, [
    e("div", { key: "s", className: "spinner" }),
    label ? e("div", { key: "l", className: "spinnerLabel" }, label) : null
  ]);
}

