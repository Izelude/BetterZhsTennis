import { Spinner } from "./Spinner";
import { Timeslots } from "./Timeslots";
import type { CourtState } from "../types";

type CourtCardProps = {
    court: string;
    state?: CourtState;
    onRetry: () => void;
};

export function CourtCard({ court, state, onRetry }: CourtCardProps) {
    return (
        <div className="courtCard">
            <div className="courtHeader">
                <div className="courtName">{court}</div>
                {state?.status === "error" ? (
                    <button className="linkBtn" onClick={onRetry}>
                        Retry
                    </button>
                ) : null}
            </div>

            {state?.status === "loading" ? (
                <Spinner label="Loading" />
            ) : state?.status === "error" ? (
                <pre className="courtError">{state.error}</pre>
            ) : (
                <Timeslots slots={state?.slots ?? []} />
            )}
        </div>
    );
}
