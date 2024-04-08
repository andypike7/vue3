<template>
  <CropSearchModal :crop="crop"
                   :dataSource="cropDataSource"
                   :status="status"
                   @search="setCropSearchText"
                   @change="crop = $event"/>
</template>

<script lang="ts">
import { CropSearchModal } from '../../common';
import { useCropDataSource } from '../CropDataSource.provider';
import { useSeedFilters } from '../SeedFilters.provider';
import { computed, defineComponent } from 'vue';

/**
 * Компонент для поиска по культуре
 *
 * @author morlz
 */
export default defineComponent({
  name: 'SeedCropSearchModal',
  components: {
    CropSearchModal
  },
  emits: ['change'],
  setup (props, { emit }) {
    const { store } = useSeedFilters();
    const crop = computed({
      get: () => store.value.crop,
      set: value => emit('change', value)
    });
    const { cropDataSource, setCropSearchText, status } = useCropDataSource();

    return {
      setCropSearchText,
      cropDataSource,
      status,
      crop
    };
  }
});
</script>
