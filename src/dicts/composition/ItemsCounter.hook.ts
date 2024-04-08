import { useAsyncComputed } from '@intterra/shared/ui/hooks/AsyncComputed';
import { Counted } from '@intterra/types';
import { PaginationOptions } from '@intterra/shared/types/generic';
import { computed, ref, Ref, watch } from 'vue';

export function useItemsCounter <T> (
  loadItemsCount: (
    filter: T,
    pagination: PaginationOptions
  ) => Maybe<Counted>,
  filters: Ref<T>,
  prop: keyof T,
  isFocused: Ref<boolean>
) {
  const countFn = async (filter: T): Promise<number> => {
    const list = await loadItemsCount(filter, { limit: 1, offset: 0 });
    if (!list) return 0;

    return list.total;
  };

  const model = ref<T[]>();

  const handleSelect = (value: any) => {
    model.value = value;
  };

  const isExecutionAllowed = computed(
    () => !!(isFocused.value && model.value?.length)
  );

  const {
    state: count,
    loading,
    update
  } = useAsyncComputed({
    get: async () => countFn({
      ...filters.value,
      [prop]: model.value
    }),
    isExecutionAllowed
  });

  watch(isExecutionAllowed, value => {
    if (value) return;
    count.value = undefined;
  }, { immediate: true });

  watch(model, () => {
    if (!isExecutionAllowed.value) return;
    update();
  }, { immediate: true });

  watch(isFocused, value => {
    if (value) return;

    model.value = count.value = undefined;
  }, { immediate: true });

  return {
    // handler for step select
    handleSelect,

    count,
    loading,
    update
  };
}
