<template>
  <DictsItemsList v-bind="listBindings"
                  @empty="$emit('empty')"
                  @click="handleClick"/>
</template>

<script lang="ts">
import { DictsDiseaseCluster } from '@intterra/common/components/DictsDiseaseCluster';
import { DictsItemsList } from '@intterra/common/components/DictsItemsList';
import { PaginationOptions } from '@intterra/shared/types/generic';
import { useDataSource } from '../../../hooks/DataSource.hook';
import { useDataSourceWithStatusFromMethod } from '../../../hooks/DataSourceWithStatusFromMethod';
import { useQueryFormatter } from '../../../hooks/router';
import router from '../../../router';
import { RoutePagesNames, RouteQueryKeys } from '../../../router/constants';
import { computed, defineComponent } from 'vue';
import { useDiseaseFilters } from './composition';

export default defineComponent({
  name: 'DiseaseCardList',
  components: {
    DictsItemsList
  },
  emits: ['empty'],
  props: {
    isModal: {
      type: Boolean,
      default: false
    }
  },

  setup (props) {
    const { dataSource } = useDataSource();
    const { filters } = useDiseaseFilters();
    const {
      dataSource: diseaseDataSource,
      status,
      error
    } = useDataSourceWithStatusFromMethod(
      async ({ limit, offset }: PaginationOptions) =>
        dataSource.listDiseases(filters.value, {
          limit,
          offset
        }),
      filters
    );

    const listBindings = computed(() => ({
      itemsCluster: DictsDiseaseCluster,
      dataSource: diseaseDataSource.value,
      status: status.value,
      error: error.value
    }));

    const formatQuery = useQueryFormatter();

    const openDiseaseInModal = (diseaseId: string) => {
      router.push(formatQuery({
        [RouteQueryKeys.DICT_ITEM_ID]: diseaseId,
        [RouteQueryKeys.DICT_CROP_ID]: filters.value.cropId || null,
        [RouteQueryKeys.DICT_CROP_PART_ID]: filters.value.cropPartId || null
      }));
    };

    const openDiseasePage = (diseaseId: string) => {
      router.push({
        name: RoutePagesNames.DICTS_DISEASE,
        params: { diseaseId },
        ...formatQuery({
          [RouteQueryKeys.DICT_CROP_ID]: filters.value.cropId || null,
          [RouteQueryKeys.DICT_CROP_PART_ID]: filters.value.cropPartId || null
        })
      });
    };

    const handleClick = (diseaseId: string) => {
      if (props.isModal)
        openDiseaseInModal(diseaseId);
      else
        openDiseasePage(diseaseId);
    };

    return {
      filters,
      listBindings,
      handleClick
    };
  }
});
</script>
