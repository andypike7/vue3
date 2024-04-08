<template>
  <CropSearchModal :crop="crop"
                   :dataSource="cropDataSource"
                   :status="status"
                   @search="setCropSearchText"
                   @change="crop = $event"/>
</template>

<script lang="ts">
import { useDebouncedValue } from '@intterra/shared/ui/hooks/DebouncedValue';
import { DictFilterCrop, FullResponse } from '@intterra/types';
import { CropSearchModal } from '../../common';
import { useDiseaseFilters } from '../composition';
import { useDataSource } from '../../../../hooks/DataSource.hook';
import { useDataSourceWithStatusFromMethod } from '../../../../hooks/DataSourceWithStatusFromMethod';
import { computed, defineComponent } from 'vue';

/**
 * Компонент для поиска по культуре
 *
 * @author morlz
 */
export default defineComponent({
  name: 'DiseaseCropSearchModal',
  components: {
    CropSearchModal
  },
  emits: ['change'],
  setup (props, { emit }) {
    const { store, filters } = useDiseaseFilters();
    const { dataSource } = useDataSource();

    const crop = computed({
      get: () => store.value.crop,
      set: value => emit('change', value)
    });

    const {
      state: cropSearchText,
      setState: setCropSearchText
    } = useDebouncedValue('');

    const method = async (): Promise<FullResponse<DictFilterCrop>> => {
      const items = await dataSource.getDiseaseFilterCrops(filters.value, cropSearchText.value) || [];

      return {
        items,
        total: items.length
      };
    };

    const { status, dataSource: cropDataSource } = useDataSourceWithStatusFromMethod(
      method,
      computed(() => [filters.value, cropSearchText.value])
    );

    return {
      setCropSearchText,
      cropDataSource,
      status,
      crop
    };
  }
});
</script>
