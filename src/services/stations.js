import { request } from "@/api";
import { useLoaderStore } from "@/store/loader";
import { useAuthStore } from "@/store/auth";

const { setLoading, unSetLoading } = useLoaderStore();
const { getAccountId } = useAuthStore();

export function requestStationsList({ page }) {
  setLoading();
  return request
    .get(`/${getAccountId()}/charge_points?page=${page}`)
    .then((response) => {
      unSetLoading();
      return response;
    });
}
