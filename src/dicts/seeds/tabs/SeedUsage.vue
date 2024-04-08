<template>
  <DictControlsStepper ref="controller"
                       :label="i18n.FILTER_LABEL_USAGE"
                       :placeholder="i18n.FILTER_NO_VALUE"
                       :value="label"
                       :title="i18n.FILTER_LABEL_USAGE"
                       shouldShowArrow
                       shouldShowDelimiter
                       clearButtonOnValue
                       :steps="steps"
                       @focus="handleFocus"/>
</template>

<script lang="ts">
import { useDataSource } from '../../../../hooks/DataSource.hook';
import { defineComponent } from 'vue';
import { DictControlsStepper } from '@intterra/common/components/Dicts';
import { useFilterControlSingleTab } from '../FilterControlSingleTab.hook';

/**
 * Фкладка для выбора направления использования
 *
 * @author morlz
 */
export default defineComponent({
  name: 'SeedUsage',

  components: {
    DictControlsStepper
  },

  setup (props, { emit }) {
    const { dataSource } = useDataSource();

    return useFilterControlSingleTab(
      dataSource.getSeedFilterUsages,
      'usage',
      'usageId',
      emit
    );
  }
});
</script>
