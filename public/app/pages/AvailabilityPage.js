import { COURTS } from "../courts.js";
import { toIsoDay } from "../date.js";
import { fetchJson } from "../api.js";
import { DatePicker } from "../components/DatePicker.js";
import { CourtCard } from "../components/CourtCard.js";

const PAGE_SIZE = 10;

function todayIso() {
  return toIsoDay(new Date());
}

export function AvailabilityPage() {
  const e = window.React.createElement;

  const [day, setDay] = window.React.useState(() => todayIso());
  const [page, setPage] = window.React.useState(0);
  const [courtState, setCourtState] = window.React.useState(() => ({}));

  const pageCount = Math.ceil(COURTS.length / PAGE_SIZE);
  const visibleCourts = COURTS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function setCourt(court, next) {
    setCourtState((prev) => ({ ...prev, [court]: next }));
  }

  async function loadCourt(court) {
    setCourt(court, { status: "loading" });
    try {
      const json = await fetchJson("/api/slots/day", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ day, courts: [court] })
      });
      const data = json?.courts?.[court];
      const slots = data?.booking_slots ?? [];
      setCourt(court, { status: "done", slots });
    } catch (err) {
      setCourt(court, { status: "error", error: String(err?.message ?? err) });
    }
  }

  // Load visible courts on day/page change. Keep states for non-visible courts.
  window.React.useEffect(() => {
    for (const court of visibleCourts) {
      const st = courtState[court];
      if (!st || st.day !== day) {
        // mark day on state to avoid showing stale results when day changes
        setCourt(court, { status: "loading", day });
        loadCourt(court);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, page]);

  return e("div", { className: "page" }, [
    e("div", { key: "top", className: "topBar" }, [
      e("div", { key: "title", className: "title" }, "Court availability"),
      e(DatePicker, { key: "dp", day, setDay })
    ]),

    e("div", { key: "pager", className: "pager" }, [
      e(
        "button",
        { key: "p", className: "iconBtn", onClick: () => setPage((p) => Math.max(0, p - 1)), disabled: page === 0 },
        "←"
      ),
      e("div", { key: "txt", className: "pagerText" }, `Page ${page + 1} / ${pageCount}`),
      e(
        "button",
        {
          key: "n",
          className: "iconBtn",
          onClick: () => setPage((p) => Math.min(pageCount - 1, p + 1)),
          disabled: page >= pageCount - 1
        },
        "→"
      )
    ]),

    e(
      "div",
      { key: "grid", className: "courtGrid" },
      visibleCourts.map((court) =>
        e(CourtCard, {
          key: court,
          court,
          state: courtState[court],
          onRetry: () => loadCourt(court)
        })
      )
    )
  ]);
}

