import api from "./api.service";
import { Business } from "../types";

export function getBusinesses(
  page: number,
  name: string,
  category: string,
  minRating: string
) {
  return api.get<{ business: Business[]; totalBusinesses: number }>(
    "/business",
    {
      params: {
        page,
        name,
        category,
        minRating,
      },
    }
  );
}
// export function createBusiness(business: Business) {
//   return api.post<Business>("/business", business);
// }
