import { watch, ref } from "vue";

export function usePagination({ itemsLoader }) {
  const currentPage = ref(1);
  const lastPage = ref(0);

  const fetchData = () => {
    itemsLoader({ page: currentPage.value }).then((response) => {
      lastPage.value = response.pagination.last_page;
    });
  };
  fetchData();
  watch(currentPage, () => fetchData());
  return { currentPage, lastPage };
}
