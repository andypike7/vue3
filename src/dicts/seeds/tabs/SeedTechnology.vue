<template>
  <DictControlsStepper ref="controller"
                       :label="i18n.FILTER_LABEL_TECHNOLOGY"
                       :placeholder="i18n.FILTER_NO_VALUE"
                       :value="label"
                       :title="i18n.FILTER_LABEL_TECHNOLOGY"
                       shouldShowArrow
                       shouldShowDelimiter
                       clearButtonOnValue
                       :steps="steps"
                       @focus="handleFocus"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DictControlsStepper } from '@intterra/common/components/Dicts';
import { useDataSource } from '../../../../hooks/DataSource.hook';
import { useFilterControlSingleTab } from '../FilterControlSingleTab.hook';

/**
 * Вкладка для технологии возделывания
 *
 * @author morlz
 */
export default defineComponent({
  name: 'SeedTechnology',

  components: {
    DictControlsStepper
  },

  setup (props, { emit }) {
    const { dataSource } = useDataSource();

    return useFilterControlSingleTab(
      dataSource.getSeedFilterTechnologies,
      'technology',
      'technologyId',
      emit
    );
  }
});
</script>
