import { request } from "@/api";
import { useLoaderStore } from "@/store/loader";
import { useAuthStore } from "@/store/auth";

const { setLoading, unSetLoading } = useLoaderStore();
const { getAccountId } = useAuthStore();

export function requestLocationsList({ page }) {
  setLoading();
  return request
    .get(`/${getAccountId()}/locations?page=${page}`)
    .then((response) => {
      unSetLoading();
      return response;
    });
}
