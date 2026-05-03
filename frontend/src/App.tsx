import { useState } from "react";
import { deleteCookie, getCookie } from "./cookie";
import { SessionForm } from "./components/SessionForm";
import { AvailabilityPage } from "./pages/AvailabilityPage";

export default function App() {
    const initialSession = getCookie("ory_session");
    const [session, setSession] = useState(initialSession);
    const [draft, setDraft] = useState(initialSession);
    const [error, setError] = useState<string | undefined>(undefined);

    function resetSession() {
        deleteCookie("ory_session");
        setSession("");
        setDraft("");
        setError(undefined);
    }

    if (!session) {
        return (
            <SessionForm
                draft={draft}
                setDraft={setDraft}
                error={error}
                onConfirmed={(value) => {
                    setSession(value);
                    setError(undefined);
                }}
            />
        );
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                <button className="linkBtn" onClick={resetSession}>
                    Clear session
                </button>
            </div>
            <AvailabilityPage onAuthError={resetSession} />
        </div>
    );
}
