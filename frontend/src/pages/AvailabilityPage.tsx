import { useEffect, useMemo, useState } from "react";
import { COURTS } from "../courts";
import { toIsoDay } from "../date";
import { fetchJson } from "../api";
import { DatePicker } from "../components/DatePicker";
import { CourtCard } from "../components/CourtCard";
import type { AvailabilityApiResponse, BookingSlot, CourtStateMap } from "../types";

const PAGE_SIZE = 10;

function todayIso() {
    return toIsoDay(new Date());
}

type AvailabilityPageProps = {
    onAuthError: () => void;
};

export function AvailabilityPage({ onAuthError }: AvailabilityPageProps) {
    const [day, setDay] = useState(todayIso());
    const [page, setPage] = useState(0);
    const [courtState, setCourtState] = useState<CourtStateMap>({});

    const pageCount = Math.ceil(COURTS.length / PAGE_SIZE);
    const visibleCourts = useMemo(
        () => COURTS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
        [page]
    );

    function setCourt(court: string, next: Partial<CourtStateMap[string]>) {
        setCourtState((prev) => ({ ...prev, [court]: { ...prev[court], ...next } }));
    }

    async function loadCourt(court: string) {
        setCourt(court, { status: "loading" });
        try {
            const json = await fetchJson<AvailabilityApiResponse>("/api/slots/day", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ day, courts: [court] })
            });

            const slots = json.courts?.[court]?.booking_slots ?? [];
            setCourt(court, { status: "done", slots });
        } catch (err) {
            const errorMessage = String((err as Error)?.message ?? err);
            if (errorMessage.includes("401") || errorMessage.includes("Authentication required")) {
                onAuthError();
                return;
            }
            setCourt(court, { status: "error", error: errorMessage });
        }
    }

    useEffect(() => {
        for (const court of visibleCourts) {
            const state = courtState[court];
            if (!state || state.day !== day) {
                setCourt(court, { status: "loading", day });
                loadCourt(court);
            }
        }
    }, [day, visibleCourts, courtState]);

    return (
        <div className="page">
            <div className="topBar">
                <div className="title">Court availability</div>
                <DatePicker day={day} setDay={setDay} />
            </div>

            <div className="pager">
                <button className="iconBtn" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
                    ←
                </button>
                <div className="pagerText">Page {page + 1} / {pageCount}</div>
                <button
                    className="iconBtn"
                    onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                    disabled={page >= pageCount - 1}
                >
                    →
                </button>
            </div>

            <div className="courtGrid">
                {visibleCourts.map((court) => (
                    <CourtCard
                        key={court}
                        court={court}
                        state={courtState[court]}
                        onRetry={() => loadCourt(court)}
                    />
                ))}
            </div>
        </div>
    );
}
