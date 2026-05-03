import type { CourtProductId, CourtRef } from "./courts.js";

export type UUID = string;

export type BookingSlotsInput = {
  start: string; // ISO string
  end: string; // ISO string
};

export type ListProductSlotsVariables = {
  productID: CourtProductId;
  input: BookingSlotsInput;
};

export type ListProductSlotsRequest = {
  court: CourtRef;
  input: BookingSlotsInput;
};

export type GraphQLRequest<TVariables> = {
  query: string;
  variables: TVariables;
};

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

export type GraphQLResponse<TData> = {
  data?: TData;
  errors?: Array<{
    message: string;
    path?: string[];
    extensions?: {
      status_code?: number;
      service?: string;
    };
  }>;
};

export type ListProductSlotsData = {
  booking_slots: BookingSlot[];
};

