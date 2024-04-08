import { BaseDropdownOptionValue } from '@intterra/shared/ui/components/BaseDropdown';
import { useListSelectWithId } from '@intterra/common/hooks';
import { useDataSourceFromStatic } from '@intterra/shared/ui/hooks/DataSource';
import { VirtualScrollerDataSource } from '@intterra/shared/ui/components/VirtualScroller';
import { createInjector } from '@intterra/shared/ui/util/composition';
import { useDataSource } from '../../../../hooks/DataSource.hook';
import { useCurrentRoute, useQueryFormatter } from '../../../../hooks/router';
import { RouteQueryKeys } from '../../../../router/constants';
import { computed, InjectionKey, provide, ref, Ref, watch } from 'vue';
import { useRouter } from 'vue-router';

interface CropSelect {
  isShowPartSelect: Ref<boolean>
  cropsDataSource: Ref<VirtualScrollerDataSource<BaseDropdownOptionValue>>
  cropPartsDataSource: Ref<VirtualScrollerDataSource<BaseDropdownOptionValue>>
  selectedCropParts: Ref<BaseDropdownOptionValue[]>
  selectedCrops: Ref<BaseDropdownOptionValue[]>
  cropSearchText: Ref<string>
  cropPartSearchText: Ref<string>
}

const cropSelectKey: InjectionKey<CropSelect> = Symbol('disease-crop-select');

export const useDiseaseCropSelect = createInjector(cropSelectKey);

export function provideDiseaseCrop (
  diseaseId: Ref<string>
) {
  const { dataSource } = useDataSource();
  const router = useRouter();
  const route = useCurrentRoute();
  const formatQuery = useQueryFormatter();

  const cropSearchText = ref('');
  const cropPartSearchText = ref('');

  // TODO: это колдовство я бы запретил и внутри Хогвартса, не надо так делать
  const getWritableQueryRef = (key: RouteQueryKeys) => computed<Maybe<string>>({
    get: () => route.value.query[key] as string || null,
    set: value => router.replace({
      name: route.value.name ?? undefined,
      params: route.value.params,
      ...formatQuery({ [key]: value })
    })
  });

  const cropId = getWritableQueryRef(RouteQueryKeys.DICT_CROP_ID);
  const cropPartId = getWritableQueryRef(RouteQueryKeys.DICT_CROP_PART_ID);

  const {
    state: cropsListState,
    selected: selectedCrops,
    isLoading: cropsLoading
  } = useListSelectWithId({
    id: cropId,
    get: async () => dataSource.getDiseaseCropsDropdown(diseaseId.value, cropSearchText.value),
    updateOn: computed(() => [diseaseId.value, cropSearchText.value]),
    isExecutionAllowed: computed(() => !!diseaseId.value)
  });

  const {
    state: cropPartsListState,
    selected: selectedCropParts,
    isLoading: cropPartsLoading
  } = useListSelectWithId({
    id: cropPartId,
    get: async () => dataSource.getDiseaseCropPartsDropdown(
      diseaseId.value,
      cropId.value!,
      cropPartSearchText.value
    ),
    updateOn: computed(() => [
      diseaseId.value,
      cropId.value,
      cropPartSearchText.value,
      cropsLoading.value
    ]),
    isExecutionAllowed: computed(
      () => [diseaseId.value, cropId.value, !cropsLoading.value].every(Boolean)
    )
  });

  const isDiseaseExecutionAllowed = computed(
    () => [
      diseaseId.value,
      cropId.value,
      cropPartId.value,
      !cropsLoading.value,
      !cropPartsLoading.value,
      Array.isArray(cropsListState.value),
      Array.isArray(cropPartsListState.value)
    ].every(Boolean)
  );

  watch(cropId, () => (cropPartsListState.value = null));

  const cropsList = computed(() => cropsListState.value || []);
  const cropPartsList = computed(() => cropPartsListState.value || []);

  const { dataSource: cropsDataSource } = useDataSourceFromStatic(cropsList);
  const { dataSource: cropPartsDataSource } = useDataSourceFromStatic(cropPartsList);

  const isShowPartSelect = computed(() => !!selectedCrops.value.length);

  provide(cropSelectKey, {
    isShowPartSelect,
    cropsDataSource,
    cropPartsDataSource,
    selectedCropParts,
    selectedCrops,
    cropSearchText,
    cropPartSearchText
  });

  return {
    cropId,
    cropPartId,
    isDiseaseExecutionAllowed
  };
}
