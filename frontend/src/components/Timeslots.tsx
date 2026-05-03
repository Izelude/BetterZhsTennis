import type { BookingSlot } from "../types";

type TimeslotsProps = {
    slots: BookingSlot[];
};

function fmtTime(iso: string) {
    const dt = new Date(iso);
    return dt.toLocaleTimeString("de-DE", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
    });
}

function slotClass(slot: BookingSlot) {
    return slot.availability > 0 ? "slot free" : "slot unavailable";
}

export function Timeslots({ slots }: TimeslotsProps) {
    if (!slots?.length) {
        return <div className="slotsEmpty">No slots</div>;
    }

    return (
        <div className="slotsGrid">
            {slots.map((slot, index) => (
                <div
                    key={`${slot.start}-${index}`}
                    className={slotClass(slot)}
                    title={`${fmtTime(slot.start)}–${fmtTime(slot.end)} | availability=${slot.availability}${slot.blocked_by_resource ? " | blocked" : ""
                        }`}
                >
                    <div className="slotTime">{`${fmtTime(slot.start)}–${fmtTime(slot.end)}`}</div>
                </div>
            ))}
        </div>
    );
}
