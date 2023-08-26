import { request } from "@/api";
import { useLoaderStore } from "@/store/loader";
import { useRouterStore } from "@/store/router";
import { useStationsStore } from "@/store/stations";

const { setLoading, unSetLoading } = useLoaderStore();
const { getAccountId } = useRouterStore();
const { storeStations } = useStationsStore();

export function requestStationsList({ page }) {
  setLoading();
  return request
    .get(`/${getAccountId()}/charge_points?page=${page}`)
    .then((response) => {
      storeStations(response.items);
      unSetLoading();
      return response;
    });
}
