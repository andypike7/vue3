import { DictContentOptionListOption, FilterSteps, useDictController } from '@intterra/common/components/Dicts';

import { IDiseasesFilter } from '@intterra/graphql';
import { useDataSourceWithStatusFromMethod } from '../../../../hooks/DataSourceWithStatusFromMethod';
import { computed, watch } from 'vue';
import { extractLabel } from '../../composition/utils';
import { AvailableFilterProp, AvailableStoreProp } from './Disease.types';
import { DiseasesFiltersStore, useDiseaseFilters } from './DiseaseFilters.provider';

type StoreValueType = Pick<DiseasesFiltersStore, AvailableStoreProp>;
type FilterValueType = Pick<IDiseasesFilter, AvailableFilterProp>;
export type DiseaseControlTab = ReturnType<typeof useDiseaseControlTab>;

export function useDiseaseControlTab<Item extends DictContentOptionListOption = DictContentOptionListOption> (
  getter: (filters: IDiseasesFilter) => Promise<Item[]>,
  storeProp: keyof StoreValueType,
  filterProp: keyof FilterValueType,
  emit: (event: 'change', value: Maybe<Item>) => void
) {
  const { isFocused, handleFocus, setActive, controller } = useDictController();
  const { filters, store } = useDiseaseFilters();

  const method = async () => {
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

  const value = computed(() => store.value[storeProp] as Maybe<Item>);
  const label = computed(() => extractLabel(value.value));
  const empty = () => emit('change', null);

  const steps = computed<FilterSteps<Item>>(() => [{
    multiple: false,
    value: value.value,
    change: value => emit('change', value),
    empty,
    label: label.value,
    dataSource: dataSource.value,
    status: status.value
  }]);

  return {
    controller,
    setActive,
    handleFocus,
    value: label,
    steps
  };
}
