import { request } from "@/api";
import { useLoaderStore } from "@/store/loader";
import { useRouterStore } from "@/store/router";
import { useLocationsStore } from "@/store/locations";

const { setLoading, unSetLoading } = useLoaderStore();
const { getAccountId } = useRouterStore();
const { storeLocations } = useLocationsStore();

export function requestLocationsList({ page }) {
  setLoading();
  return request
    .get(`/${getAccountId()}/locations?page=${page}`)
    .then((response) => {
      storeLocations(response.items);
      unSetLoading();
      return response;
    });
}
