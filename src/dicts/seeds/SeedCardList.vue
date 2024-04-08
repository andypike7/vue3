<template>
  <DictsItemsList v-bind="listBindings"
                  :itemWidth="192"
                  @empty="$emit('empty')"
                  @click="handleClick"/>
</template>

<script lang="ts">
import { PaginationOptions } from '@intterra/shared/types/generic';
import { useDataSource } from '../../../hooks/DataSource.hook';
import { useDataSourceWithStatusFromMethod } from '../../../hooks/DataSourceWithStatusFromMethod';
import router from '../../../router';
import { computed, defineComponent } from 'vue';
import { DictsItemsList } from '@intterra/common/components/DictsItemsList';
import { DictsSeedCluster } from '@intterra/common/components/DictsSeedCluster';
import { useSeedFilters } from './SeedFilters.provider';
import { RoutePagesNames } from '../../../router/constants';

export default defineComponent({
  name: 'SeedCardList',
  components: {
    DictsItemsList
  },
  emits: ['empty'],
  setup () {
    const { dataSource } = useDataSource();
    const { filters } = useSeedFilters();
    const {
      dataSource: seedDataSource,
      status,
      error
    } = useDataSourceWithStatusFromMethod(
      async ({ limit, offset }: PaginationOptions) =>
        dataSource.listSeeds(filters.value, {
          limit,
          offset
        }),
      filters
    );

    const listBindings = computed(() => ({
      itemsCluster: DictsSeedCluster,
      dataSource: seedDataSource.value,
      status: status.value,
      error: error.value
    }));

    const handleClick = (seedId: string) =>
      router.push({ name: RoutePagesNames.DICTS_SEED, params: { seedId } });

    return {
      listBindings,
      handleClick,
      filters
    };
  }
});
</script>
