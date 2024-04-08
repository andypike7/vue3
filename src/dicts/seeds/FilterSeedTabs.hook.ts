import { computed, ComputedRef, watch } from 'vue';
import { ISeedsFilter } from '@intterra/graphql';
import { useAsyncComputed } from '@intterra/shared/ui/hooks/AsyncComputed';
import { useDataSource } from '../../../hooks/DataSource.hook';

export function useFilterSeedTabs (filters: ComputedRef<ISeedsFilter>) {
  const { dataSource } = useDataSource();

  const isShowCropInit = computed(() => !filters.value.cropId);
  const isExecutionAllowed = computed(() => !isShowCropInit.value);

  const { state: tabs, update } = useAsyncComputed({
    get: async () => {
      if (!filters.value.cropId)
        return null;
      return dataSource.getSeedFiltersPresence(filters.value.cropId);
    },
    isExecutionAllowed,
    noInstantUpdate: true,
    default: null
  });

  watch(() => filters.value.cropId, () => {
    if (isShowCropInit.value) return;
    update();
  }, { immediate: true });

  return {
    isShowCropInit,
    tabs
  };
}
