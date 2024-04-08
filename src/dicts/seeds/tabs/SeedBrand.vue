<template>
  <DictControlsStepper ref="controller"
                       :label="i18n.FILTER_LABEL_BRAND"
                       :placeholder="i18n.FILTER_NO_VALUE"
                       :value="label"
                       :title="i18n.FILTER_LABEL_BRAND"
                       shouldShowArrow
                       clearButtonOnValue
                       :steps="steps"
                       :applyCounter="seedsCount"
                       :applyCounterLoading="seedsCountLoading"
                       @focus="handleFocus"/>
</template>

<script lang="ts">
import { useDataSource } from '../../../../hooks/DataSource.hook';
import { defineComponent } from 'vue';
import { DictControlsStepper } from '@intterra/common/components/Dicts';
import { useFilterControlMultipleTab } from '../FilterControlMultipleTab.hook';

/**
 * Вкладка для выбора бренда
 *
 * @author morlz
 */
export default defineComponent({
  name: 'SeedBrand',

  components: {
    DictControlsStepper
  },

  setup (props, { emit }) {
    const { dataSource } = useDataSource();

    return useFilterControlMultipleTab(
      dataSource.getSeedFilterBrands,
      'brand',
      'brandId',
      emit
    );
  }
});
</script>
