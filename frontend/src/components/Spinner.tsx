type SpinnerProps = {
    label?: string;
};

export function Spinner({ label }: SpinnerProps) {
    return (
        <div className="spinnerWrap">
            <div className="spinner" />
            {label ? <div className="spinnerLabel">{label}</div> : null}
        </div>
    );
}
