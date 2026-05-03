import { setCookie } from "../cookie.js";

export function SessionForm({ draft, setDraft, error, onConfirmed }) {
  const e = window.React.createElement;

  return e("div", null, [
    e("h1", { key: "h" }, "Enter ory-session"),
    error
      ? e("pre", { key: "err", style: { whiteSpace: "pre-wrap" } }, error)
      : null,
    e("input", {
      key: "i",
      value: draft,
      placeholder: "Paste ory-session value here",
      onChange: (ev) => setDraft(ev.target.value),
      style: {
        width: "100%",
        boxSizing: "border-box",
        padding: "10px 12px",
        borderRadius: "10px",
        border: "1px solid rgba(127,127,127,0.35)",
        marginTop: "12px"
      }
    }),
    e(
      "button",
      {
        key: "b",
        onClick: () => {
          const v = draft.trim();
          if (!v) return;
          setCookie("ory_session", v);
          onConfirmed(v);
        },
        style: {
          marginTop: "12px",
          padding: "10px 12px",
          borderRadius: "10px",
          border: "1px solid rgba(127,127,127,0.35)",
          background: "rgba(127,127,127,0.12)",
          cursor: "pointer"
        }
      },
      "Confirm"
    )
  ]);
}

