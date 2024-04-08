<template>
  <BaseField :label="i18n.ECONOMIC_THRESHOLD_OF_DAMAGE_LABEL">
    <TableView :dataSource="elhDataSource"
               :emptyText="i18n.FILTER_EMPTY_TITLE"
               :style="{ height: `${tableHeight}rem` }"
               :tableModel="elhTableSchema"/>
  </BaseField>
</template>

<script lang="ts">
import { BaseField } from '@intterra/common/components/BaseField';
import { useDataSourceFromStatic, useDataSourceMapper } from '@intterra/shared/ui/hooks/DataSource';
import { useGraphQLEnums } from '@intterra/hooks';
import { DiseasePageDiagnosticElh } from '@intterra/types';
import TableView from '../../../../TableView/TableView.vue';
import { computed, defineComponent, PropType } from 'vue';
import { elhTableSchema } from '../ElhTableSchema';

const TABLE_HEADER_HEIGHT = 2.3;
const TABLE_ROW_HEIGHT = 4.6;

/**
 * Отображает секцию диагностики для страницы болезни
 *
 * @author morlz
 */
export default defineComponent({
  name: 'ElhsField',

  components: {
    BaseField,
    TableView
  },

  props: {
    elhs: {
      type: Array as PropType<DiseasePageDiagnosticElh[]>,
      required: true
    }
  },

  setup (props) {
    const { harmfulnesThresholdType, harmfulnesThresholdUnit } = useGraphQLEnums();
    const elhData = computed(() => props.elhs);
    const { dataSource } = useDataSourceFromStatic(elhData);
    const { dataSource: elhDataSource } = useDataSourceMapper(dataSource, async item => {
      const type = harmfulnesThresholdType.find(({ value }) => value === item.type)?.label;
      const unit = harmfulnesThresholdUnit.find(({ value }) => value === item.type)?.label;

      return {
        ...item,
        type,
        unit
      };
    });

    const tableHeight = computed(
      () => TABLE_HEADER_HEIGHT + TABLE_ROW_HEIGHT * elhData.value.length
    );

    return {
      tableHeight,
      elhTableSchema,
      elhDataSource
    };
  }
});
</script>
