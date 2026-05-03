export type BookingSlot = {
    start: string;
    end: string;
    booking_period_start: string;
    booking_period_end: string;
    availability: number;
    already_booked: number;
    already_in_cart: number;
    already_on_waiting_list: number;
    blocked_by_resource: boolean;
};

export type CourtState = {
    status: "idle" | "loading" | "done" | "error";
    day?: string;
    slots?: BookingSlot[];
    error?: string;
};

export type CourtStateMap = Record<string, CourtState>;

export type BookingSlotsPayload = {
    day: string;
    courts: string[];
};

export type AvailabilityApiResponse = {
    day: string;
    timezone: string;
    input: {
        start: string;
        end: string;
    };
    courts: Record<string, { booking_slots: BookingSlot[] }>;
};
