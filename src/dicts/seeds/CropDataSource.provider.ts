import { useDataSourceFromStatic } from '@intterra/shared/ui/hooks/DataSource';
import { useDebouncedValue } from '@intterra/shared/ui/hooks/DebouncedValue';
import { VirtualScrollerDataSource } from '@intterra/shared/ui/components/VirtualScroller';
import { createInjector } from '@intterra/shared/ui/util/composition';
import { includes } from '@intterra/common/utils/StringUtils';
import { DictFilterCrop } from '@intterra/types';
import { LoadingStatus } from '@intterra/shared/types/generic';
import { useDataSource } from '../../../hooks/DataSource.hook';
import { useDataSourceWithStatusFromMethod } from '../../../hooks/DataSourceWithStatusFromMethod';
import { computed, InjectionKey, provide, Ref, ref } from 'vue';

interface CropDataSourceInjection {
  readonly status: Ref<LoadingStatus>
  readonly cropDataSource: Ref<VirtualScrollerDataSource<DictFilterCrop>>
  readonly cropNameFilter: Ref<string>
  readonly setCropSearchText: (value: string) => void
}

const key: InjectionKey<CropDataSourceInjection> = Symbol('crop-data-source');

export const useCropDataSource = createInjector(key);

export function provideCropDataSource (): CropDataSourceInjection {
  const { dataSource } = useDataSource();
  const {
    state: cropNameFilter,
    setState: setCropSearchText
  } = useDebouncedValue('', 0);

  const method = async () => {
    const items = await dataSource.getSeedFilterCrops();

    return {
      items,
      total: items.length
    };
  };

  const { status, firstBatch } = useDataSourceWithStatusFromMethod(
    method,
    ref()
  );

  const staticResource = computed(
    () => (firstBatch.value || [])
      .filter(
        el => !cropNameFilter.value
          || (
            el.label
            && includes(el.label, cropNameFilter.value)
          )
      )
  );

  const { dataSource: cropDataSource } = useDataSourceFromStatic(staticResource);

  const state = {
    status,
    cropDataSource,
    cropNameFilter,
    setCropSearchText
  };

  provide(key, state);

  return state;
}
