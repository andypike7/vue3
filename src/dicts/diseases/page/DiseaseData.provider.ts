import { useAsyncComputed } from '@intterra/shared/ui/hooks/AsyncComputed';
import { DiseasePage } from '@intterra/types';
import { provideDiseaseCrop } from './CropSelect.provider';
import { useDataSource } from '../../../../hooks/DataSource.hook';
import { computed, inject, InjectionKey, provide, Ref } from 'vue';
import { useDictsHeader } from '../../DictsHeader';
import { EMPTY_QUERY_ID } from '@intterra/shared/constants';

const diseaseKey: InjectionKey<Ref<Maybe<DiseasePage>>> = Symbol('disease');
const diseaseIdKey: InjectionKey<Ref<string>> = Symbol('disease-id');

export function provideDiseaseData (diseaseId: Ref<string>) {
  const {
    cropId,
    cropPartId,
    isDiseaseExecutionAllowed: isExecutionAllowed
  } = provideDiseaseCrop(diseaseId);
  const { getDiseasePage } = useDataSource().dataSource;

  const diseasePageDependencies = computed(() => [
    diseaseId.value,
    cropId.value,
    cropPartId.value
  ]);

  const { state: disease } = useAsyncComputed({
    get: async () => getDiseasePage(
      diseaseId.value,
      // проверка в isExecutionAllowed
      cropId.value!,
      cropPartId.value === EMPTY_QUERY_ID
        ? null
        : cropPartId.value
    ),
    isExecutionAllowed,
    useLastValue: true,
    default: null,
    updateOn: diseasePageDependencies
  });

  useDictsHeader(
    computed(() => disease.value?.name),
    computed(() => disease.value?.nameLat)
  );

  provide(diseaseKey, disease);
  provide(diseaseIdKey, diseaseId);

  return {
    disease,
    diseaseId
  };
}

export function useDiseaseData () {
  const disease = inject(diseaseKey);
  const diseaseId = inject(diseaseIdKey);

  if (!disease || !diseaseId)
    throw new Error('Используй provideDiseaseMain()');

  return {
    disease,
    diseaseId
  };
}
