import { addDays, formatDayLabel } from "../date";

type DatePickerProps = {
    day: string;
    setDay: (day: string) => void;
};

export function DatePicker({ day, setDay }: DatePickerProps) {
    return (
        <div className="datePicker">
            <button className="iconBtn" onClick={() => setDay(addDays(day, -1))}>
                ←
            </button>
            <div className="dateLabel">{formatDayLabel(day)}</div>
            <button className="iconBtn" onClick={() => setDay(addDays(day, 1))}>
                →
            </button>
            <div style={{ flex: 1 }} />
            <input
                className="dateInput"
                type="date"
                value={day}
                onChange={(event) => setDay(event.target.value)}
            />
        </div>
    );
}
