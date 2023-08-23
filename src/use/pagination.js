import { watch, ref } from "vue";

export function usePagination({ itemsLoader }) {
  const items = ref([]);
  const currentPage = ref(1);
  const lastPage = ref(0);
  const size = ref(20);

  const fetchData = () => {
    itemsLoader({ size: size.value, page: currentPage.value }).then(
      (response) => {
        items.value = response.items;
        lastPage.value = response.pagination.last_page;
      }
    );
  };
  fetchData();
  watch([currentPage, size], () => fetchData());
  return { items, currentPage, lastPage };
}
