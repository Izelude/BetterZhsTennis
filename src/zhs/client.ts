import axios, { type AxiosInstance } from "axios";
import type {
  GraphQLRequest,
  GraphQLResponse,
  ListProductSlotsData,
  ListProductSlotsRequest,
  ListProductSlotsVariables
} from "./types.js";
import { resolveCourtProductId } from "./courts.js";

const DEFAULT_BASE_URL = "https://kurse.zhs-muenchen.de/api/query";

const LIST_PRODUCT_SLOTS_QUERY = `
query List_product_slots($productID: UUID!, $input: BookingSlotsInput!) {
  booking_slots(product_id: $productID, input: $input) {
    start
    end
    booking_period_start
    booking_period_end
    availability
    already_booked
    already_in_cart
    already_on_waiting_list
    blocked_by_resource
  }
}`.trim();

export type ZhsClientOptions = {
  baseUrl?: string;
  orySession: string;
};

export class ZhsClient {
  private readonly http: AxiosInstance;

  constructor(opts: ZhsClientOptions) {
    this.http = axios.create({
      baseURL: opts.baseUrl ?? DEFAULT_BASE_URL,
      headers: {
        "content-type": "application/json",
        cookie: `ory-session=${opts.orySession}`
      },
      timeout: 20_000
    });
  }

  async listProductSlots(req: ListProductSlotsRequest): Promise<ListProductSlotsData> {
    const variables: ListProductSlotsVariables = {
      productID: resolveCourtProductId(req.court),
      input: req.input
    };

    const payload: GraphQLRequest<ListProductSlotsVariables> = {
      query: LIST_PRODUCT_SLOTS_QUERY,
      variables
    };

    const res = await this.http.post<GraphQLResponse<ListProductSlotsData>>("", payload);
    if (res.data.errors?.length) {
      throw new Error(res.data.errors.map((e) => e.message).join("\n"));
    }
    if (!res.data.data) {
      throw new Error("No data returned from API");
    }
    return res.data.data;
  }
}

