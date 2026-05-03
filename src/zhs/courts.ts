export const COURTS = [
  { name: "Tennisplatz 2", productId: "92db7384-2dec-4888-a92a-4c2b6faac5f7" },
  { name: "Tennisplatz 3", productId: "b7ffd13a-d299-4692-974b-ca208f8787e0" },
  { name: "Tennisplatz 4", productId: "771351a2-6a9f-48b0-9224-16d08235e90c" },
  { name: "Tennisplatz 5", productId: "bb2afc8a-28ab-4e18-8e06-ef4a66603ab6" },
  { name: "Tennisplatz 6", productId: "27ab99ca-b093-4b38-8e9e-67697a85f2e5" },
  { name: "Tennisplatz 7", productId: "b1ea9087-2139-4395-b51b-67932a54d8d7" },
  { name: "Tennisplatz 8", productId: "20b05958-8717-4d61-970b-73ef40389685" },
  { name: "Tennisplatz 9", productId: "16a888b7-cf34-41a5-b40f-aeaf75ed4256" },
  { name: "Tennisplatz 10", productId: "7a90be66-523e-4815-81e2-a97067661a24" },
  { name: "Tennisplatz 11", productId: "005b2995-f98d-4f90-adf5-d9ce70ab5b70" },
  { name: "Tennisplatz 12", productId: "a703a4ad-ad3b-4d45-9b56-e6d7aa1cf90a" },
  { name: "Tennisplatz 13", productId: "63541e6f-de33-4468-a483-20070d9fe1f5" },
  { name: "Tennisplatz 14", productId: "9229afa9-4a95-4068-b027-b093c19ce4de" },
  { name: "Tennisplatz 15", productId: "a4891d68-3310-4f30-bd12-c9028adc4b7f" },
  { name: "Tennisplatz 16", productId: "52cc2610-a6a0-4191-b63f-bb903369b1cf" },
  { name: "Tennisplatz 17", productId: "a3684efe-e7e1-4293-9563-9191753ab0d7" },
  {
    name: "Tennisplatz 20 (Kunststoff)",
    productId: "7b47ace1-be8d-41d5-ad59-b2237ec044b4"
  },
  {
    name: "Tennisplatz 21 (Kunststoff)",
    productId: "ff7e50b2-e9ec-4ef0-8f93-29498bfd6716"
  },
  {
    name: "Tennisplatz 22 (Kunststoff)",
    productId: "bb09db93-eff3-4b95-aa0f-80e25472994e"
  }
] as const;

export type Court = (typeof COURTS)[number];
export type CourtName = Court["name"];
export type CourtProductId = Court["productId"];

export const COURT_BY_NAME: Record<CourtName, Court> = Object.fromEntries(
  COURTS.map((c) => [c.name, c])
) as Record<CourtName, Court>;

export const COURT_BY_PRODUCT_ID: Record<CourtProductId, Court> = Object.fromEntries(
  COURTS.map((c) => [c.productId, c])
) as Record<CourtProductId, Court>;

export type CourtRef = CourtName | CourtProductId;

export function resolveCourtProductId(ref: CourtRef): CourtProductId {
  if (ref in COURT_BY_NAME) return COURT_BY_NAME[ref as CourtName].productId;
  return ref as CourtProductId;
}

