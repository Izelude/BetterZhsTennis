import { setCookie } from "../cookie";

type SessionFormProps = {
    draft: string;
    setDraft: (value: string) => void;
    error?: string;
    onConfirmed: (value: string) => void;
};

export function SessionForm({ draft, setDraft, error, onConfirmed }: SessionFormProps) {
    return (
        <div>
            <h1>Enter ory-session</h1>
            {error ? <pre style={{ whiteSpace: "pre-wrap" }}>{error}</pre> : null}
            <input
                value={draft}
                placeholder="Paste ory-session value here"
                onChange={(event) => setDraft(event.target.value)}
                style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "1px solid rgba(127,127,127,0.35)",
                    marginTop: "12px"
                }}
            />
            <button
                onClick={() => {
                    const value = draft.trim();
                    if (!value) return;
                    setCookie("ory_session", value);
                    onConfirmed(value);
                }}
                style={{
                    marginTop: "12px",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "1px solid rgba(127,127,127,0.35)",
                    background: "rgba(127,127,127,0.12)",
                    cursor: "pointer"
                }}
            >
                Confirm
            </button>
        </div>
    );
}
