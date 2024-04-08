import { ISeedsFilter } from '@intterra/graphql';
import { extractLabel } from '../composition/utils';
import { SeedsFiltersStore, useSeedFilters } from './SeedFilters.provider';
import { computed, watch } from 'vue';
import { useDataSourceWithStatusFromMethod } from '../../../hooks/DataSourceWithStatusFromMethod';
import { DictContentOptionListOption, useDictController } from '@intterra/common/components/Dicts';

import { FullResponse } from '@intterra/types';

type AvailableStoreProp = 'crop' | 'usage' | 'technology' | 'brand'

type StoreValueType = Pick<SeedsFiltersStore, AvailableStoreProp>

export function useFilterControlTabBase<Item extends DictContentOptionListOption = DictContentOptionListOption> (
  getter: (filters: ISeedsFilter) => Promise<Item[]>,
  storeProp: keyof StoreValueType
) {
  const { isFocused, handleFocus, setActive, controller } = useDictController();
  const { filters, store } = useSeedFilters();

  const method = async (): Promise<FullResponse<Item>> => {
    const items = await getter(filters.value);

    return {
      items,
      total: items.length
    };
  };

  const { dataSource, fetchData, status } = useDataSourceWithStatusFromMethod(
    method,
    filters,
    {
      noInstantFetch: true,
      isExecutionAllowed: isFocused
    }
  );

  watch(isFocused, value => {
    if (!value) return;
    fetchData();
  }, { immediate: true });

  const label = computed(() => extractLabel(store.value[storeProp]));

  return {
    status,
    controller,
    setActive,
    isFocused,
    handleFocus,
    dataSource,
    label
  };
}
