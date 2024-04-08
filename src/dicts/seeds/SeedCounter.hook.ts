import { ISeedsFilter } from '@intterra/graphql';
import { useAsyncComputed } from '@intterra/shared/ui/hooks/AsyncComputed';
import { useSeedFilters } from './SeedFilters.provider';
import { useDataSource } from '../../../hooks/DataSource.hook';
import { computed, ref, Ref, watch } from 'vue';

export function useSeedCounter<T = any> (
  prop: keyof ISeedsFilter,
  isFocused: Ref<boolean>
) {
  const { filters } = useSeedFilters();
  const { dataSource } = useDataSource();

  const seedsCountFn = async (filter: ISeedsFilter): Promise<number> => {
    const list = await dataSource.listSeeds(filter, { limit: 1, offset: 0 });
    if (!list) return 0;

    return list.total;
  };

  const model = ref<T[] | undefined>(undefined);

  const handleSelect = (value: any) => {
    model.value = value;
  };

  const isExecutionAllowed = computed<boolean>(
    () =>
      Boolean(isFocused.value && model.value?.length)
  );

  const {
    state: seedsCount,
    loading: seedsCountLoading,
    update: seedsCountUpdate
  } = useAsyncComputed({
    get: async () => seedsCountFn({
      ...filters.value,
      [prop]: model.value
    }),
    isExecutionAllowed
  });

  watch(isExecutionAllowed, value => {
    if (value) return;
    seedsCount.value = undefined;
  }, { immediate: true });

  watch(model, () => {
    if (!isExecutionAllowed.value) return;
    seedsCountUpdate();
  }, { immediate: true });

  watch(isFocused, value => {
    if (value) return;

    model.value = seedsCount.value = undefined;
  }, { immediate: true });

  return {
    // handler for step select
    handleSelect,

    seedsCount,
    seedsCountLoading,
    seedsCountUpdate
  };
}
