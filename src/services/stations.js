import { request } from "@/api";
import { useLoaderStore } from "@/store/loader";
import { useRouterStore } from "@/store/router";
import { useStationsStore } from "@/store/stations";

const { setLoading, unSetLoading } = useLoaderStore();
const { getAccountId } = useRouterStore();

function requestStationsList({ page }) {
  const { storeStations } = useStationsStore();

  setLoading();
  return request
    .get(`/${getAccountId()}/charge_points?page=${page}`)
    .then((response) => {
      storeStations(response.items);
      unSetLoading();
      return response;
    });
}

function requestStatusesCounts() {
  setLoading();
  return request
    .get(`${getAccountId()}/charge_points/counters`)
    .then((response) => {
      unSetLoading();
      return response;
    });
}

export { requestStatusesCounts, requestStationsList };
