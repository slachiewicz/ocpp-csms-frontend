import { request } from "@/api";
import { useLoaderStore } from "@/store/loader";
import { useAuthStore } from "@/store/auth";

const { setLoading, unSetLoading } = useLoaderStore();

const { getCurrentAccountId } = useAuthStore();

export function requestLocationsList({ page, size }) {
  setLoading();
  return request
    .get(`/${getCurrentAccountId()}/locations?page=${page}&size=${size}`)
    .then((response) => {
      unSetLoading();
      return response;
    });
}
