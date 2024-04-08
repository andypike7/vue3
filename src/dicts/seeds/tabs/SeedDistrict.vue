<template>
  <DictControlsStepper ref="controller"
                       :label="i18n.FILTER_LABEL_DISTRICT"
                       :placeholder="i18n.FILTER_NO_VALUE"
                       :value="label"
                       :title="i18n.FILTER_LABEL_DISTRICT"
                       shouldShowArrow
                       shouldShowDelimiter
                       clearButtonOnValue
                       :steps="steps"
                       :applyCounter="seedsCount"
                       :applyCounterLoading="seedsCountLoading"
                       @focus="handleFocus"
                       @stepIndex="currentStepIndex = $event"/>
</template>

<script lang="ts">
import { DictFilterItem } from '@intterra/types';
import { useDataSourceWithStatusFromMethod } from '../../../../hooks/DataSourceWithStatusFromMethod';
import { extractLabel } from '../../composition/utils';
import { useDataSource } from '../../../../hooks/DataSource.hook';
import { computed, defineComponent, ref, watch } from 'vue';
import { useSeedCounter } from '../SeedCounter.hook';
import { useSeedFilters } from '../SeedFilters.provider';
import { DictControlsStepper, FilterSteps, useDictController } from '@intterra/common/components/Dicts';

/**
 * Компонент вкладка для выбора региона и области
 *
 * @author morlz
 */
export default defineComponent({
  name: 'SeedDistrict',

  components: {
    DictControlsStepper
  },
  emits: ['district', 'federalDistrict'],
  setup (props, { emit }) {
    const { dataSource } = useDataSource();
    const { isFocused, handleFocus } = useDictController();
    const { filters, store } = useSeedFilters();

    const currentStepIndex = ref(0);

    const isFederalDistrictsExecutionAllowed = computed<boolean>(
      () =>
        currentStepIndex.value === 0
    );

    const isDistrictsExecutionAllowed = computed<boolean>(
      () =>
        currentStepIndex.value === 1
        && !!filters.value.federalDistrictId
    );

    const federalDistrictsMethod = async () => {
      const items = await dataSource.getSeedFilterFederalDistricts(filters.value);

      return {
        items,
        total: items.length
      };
    };

    const {
      dataSource: federalDistrictsDataSource,
      fetchData: fetchFederalDistricts,
      status: federalStatus
    } = useDataSourceWithStatusFromMethod(
      federalDistrictsMethod,
      filters,
      {
        noInstantFetch: true,
        isExecutionAllowed: isFederalDistrictsExecutionAllowed
      }
    );

    const districtsMethod = async () => {
      const items = await dataSource.getSeedFilterDistricts(filters.value);

      return {
        items,
        total: items.length
      };
    };

    const {
      dataSource: districtsDataSource,
      fetchData: fetchDistricts,
      status: districtsStatus
    } = useDataSourceWithStatusFromMethod(
      districtsMethod,
      filters,
      {
        noInstantFetch: true,
        isExecutionAllowed: isDistrictsExecutionAllowed
      }
    );

    watch(currentStepIndex, index => {
      if (index)
        fetchDistricts();
      else {
        fetchFederalDistricts();
        if (store.value.district && store.value.district.length) return;
        emit('federalDistrict', undefined);
      }
    }, { immediate: true });

    const selectedFederalDistrictLabel = computed(
      () => extractLabel(store.value.federalDistrict)
    );

    const label = computed(
      () => extractLabel(store.value.district)
    );

    const {
      handleSelect,
      seedsCount,
      seedsCountLoading
    } = useSeedCounter(
      'districtId',
      isFocused
    );

    const steps = computed((): FilterSteps<DictFilterItem> => [
      {
        multiple: false,
        value: store.value.federalDistrict,
        change: value => emit('federalDistrict', value),
        empty: () => emit('federalDistrict', null),
        label: selectedFederalDistrictLabel.value,
        dataSource: federalDistrictsDataSource.value,
        status: federalStatus.value
      },
      {
        multiple: true,
        value: store.value.district || [],
        change: value => emit('district', value),
        empty: () => {
          emit('district', null);
          emit('federalDistrict', null);
        },
        dataSource: districtsDataSource.value,
        select: values => handleSelect(values?.map(el => el.id)),
        status: districtsStatus.value
      }
    ]);

    return {
      currentStepIndex,
      handleFocus,
      label,
      steps,
      seedsCount,
      seedsCountLoading
    };
  }
});
</script>
