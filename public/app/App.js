import { getCookie, deleteCookie } from "./cookie.js";
import { SessionForm } from "./components/SessionForm.js";
import { AvailabilityPage } from "./pages/AvailabilityPage.js";

export function App() {
  const e = window.React.createElement;

  const [session, setSession] = window.React.useState(() => getCookie("ory_session"));
  const [draft, setDraft] = window.React.useState(() => getCookie("ory_session"));
  const [state, setState] = window.React.useState({ status: "idle" });

  if (!session) {
    return e(SessionForm, {
      draft,
      setDraft,
      error: state.error,
      onConfirmed: (v) => {
        setSession(v);
        setState({ status: "idle" });
      }
    });
  }

  return e("div", null, [
    e(
      "div",
      { key: "hdr", style: { display: "flex", justifyContent: "flex-end", marginBottom: 10 } },
      e(
        "button",
        {
          className: "linkBtn",
          onClick: () => {
            deleteCookie("ory_session");
            setSession("");
            setDraft("");
            setState({ status: "idle" });
          }
        },
        "Clear session"
      )
    ),
    e(AvailabilityPage, { key: "p" })
  ]);
}

