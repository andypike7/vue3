import { ISeedsFilter } from '@intterra/graphql';
import { VirtualScrollerDataSource } from '@intterra/shared/ui/components/VirtualScroller';
import { useFilterControlTabBase } from './FilterControlTabBase.hook';
import { useSeedCounter } from './SeedCounter.hook';
import { SeedsFiltersStore, useSeedFilters } from './SeedFilters.provider';
import { computed } from 'vue';
import { DictContentOptionListOption, FilterSteps } from '@intterra/common/components/Dicts';

type AvailableStoreProp =
  'brand'

type AvailableFiltersProp =
  'brandId'

type StoreValueType = Pick<SeedsFiltersStore, AvailableStoreProp>
type FilterValueType = Pick<ISeedsFilter, AvailableFiltersProp>

export function useFilterControlMultipleTab<Item extends DictContentOptionListOption = DictContentOptionListOption> (
  getter: (filters: ISeedsFilter) => Promise<Item[]>,
  storeProp: keyof StoreValueType,
  filterProp: keyof FilterValueType,
  emit: (event: 'change', value: Maybe<Item[]>) => void
) {
  const { store } = useSeedFilters();

  const {
    dataSource,
    label,
    handleFocus,
    isFocused,
    setActive,
    controller,
    status
  } = useFilterControlTabBase(
    getter,
    storeProp
  );

  const {
    handleSelect,
    seedsCount,
    seedsCountLoading
  } = useSeedCounter(
    filterProp,
    isFocused
  );

  const steps = computed((): FilterSteps<Item> => [{
    multiple: true,
    value: (store.value[storeProp] || []) as Item[],
    change: value => emit('change', value),
    empty: () => emit('change', null),
    label: label.value,
    dataSource: dataSource.value as VirtualScrollerDataSource<Item>,
    select: values => handleSelect(values?.map(el => el.id)),
    status: status.value
  }]);

  return {
    status,
    controller,
    setActive,
    handleFocus,
    label,
    steps,
    seedsCount,
    seedsCountLoading
  };
}
