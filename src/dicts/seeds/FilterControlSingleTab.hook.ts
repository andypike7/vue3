import { ISeedsFilter } from '@intterra/graphql';
import { VirtualScrollerDataSource } from '@intterra/shared/ui/components/VirtualScroller';
import { useFilterControlTabBase } from './FilterControlTabBase.hook';
import { SeedsFiltersStore, useSeedFilters } from './SeedFilters.provider';
import { computed } from 'vue';
import { DictContentOptionListOption, FilterSteps } from '@intterra/common/components/Dicts';

type AvailableStoreProp = 'crop' | 'usage' | 'technology'
type AvailableFiltersProp = 'cropId' | 'usageId' | 'technologyId'

type StoreValueType = Pick<SeedsFiltersStore, AvailableStoreProp>
type FilterValueType = Pick<ISeedsFilter, AvailableFiltersProp>

export function useFilterControlSingleTab<Item extends DictContentOptionListOption = DictContentOptionListOption> (
  getter: (filters: ISeedsFilter) => Promise<Item[]>,
  storeProp: keyof StoreValueType,
  filterProp: keyof FilterValueType,
  emit: (event: 'change', value: Maybe<Item>) => void
) {
  const { store } = useSeedFilters();

  const {
    dataSource,
    label,
    handleFocus,
    setActive,
    controller,
    status
  } = useFilterControlTabBase(
    getter,
    storeProp
  );

  const steps = computed((): FilterSteps<Item> => [{
    multiple: false,
    value: store.value[storeProp] as Item,
    change: value => emit('change', value),
    empty: () => emit('change', null),
    label: label.value,
    dataSource: dataSource.value as VirtualScrollerDataSource<Item>,
    status: status.value
  }]);

  return {
    controller,
    setActive,
    handleFocus,
    label,
    steps
  };
}
