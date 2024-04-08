<template>
  <DictControlsStepper ref="controller"
                       :label="i18n.FILTER_LABEL_CROP"
                       :placeholder="i18n.FILTER_NO_VALUE"
                       :value="label"
                       :title="i18n.FILTER_LABEL_CROP"
                       shouldShowArrow
                       shouldShowDelimiter
                       :steps="steps"
                       @focus="handleFocus">
    <template #cover>
      <SeedCropSearchModal @change="$emit('change', $event)"
                           @close="handleClose"/>
    </template>
  </DictControlsStepper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDataSource } from '../../../../hooks/DataSource.hook';
import { useFilterControlSingleTab } from '../FilterControlSingleTab.hook';

import { DictControlsStepper } from '@intterra/common/components/Dicts';
import SeedCropSearchModal from './SeedCropSearchModal.vue';

/**
 * Фкладка фильтра для выбора культуры
 * @author morlz
 */
export default defineComponent({
  name: 'SeedCrop',
  components: {
    DictControlsStepper,
    SeedCropSearchModal
  },
  emits: ['change'],
  setup (props, { emit }) {
    const { dataSource } = useDataSource();

    const tab = useFilterControlSingleTab(
      async () => dataSource.getSeedFilterCrops(),
      'crop',
      'cropId',
      emit
    );

    delete tab.steps.value[0].empty;

    const handleClose = () =>
      // Повторная установка уничтожает значение
      tab.controller.value?.setActive?.();

    return {
      ...tab,
      handleClose
    };
  }
});
</script>
