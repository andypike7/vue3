import { useAsyncComputed } from '@intterra/shared/ui/hooks/AsyncComputed';
import { IDiseasesFilter } from '@intterra/graphql';
import { DictFilterCrop, DictFilterItem } from '@intterra/types';
import { useDataSource } from '../../../../hooks/DataSource.hook';
import { useQueryFormatter, useRouter } from '../../../../hooks/router';
import { storePropByName } from './Disease.types';
import { computed, inject, InjectionKey, provide, Ref, ref } from 'vue';
import { get } from 'lodash';

const filtersKey: InjectionKey<Ref<IDiseasesFilter>> = Symbol('diseaseFilters');
const storeKey: InjectionKey<Ref<DiseasesFiltersStore>> = Symbol('diseaseFiltersStore');

export interface DiseasesFiltersStore {
  // Культура
  // Одиночный выбор
  crop: Maybe<DictFilterCrop>

  cropDamageCharacter: Maybe<DictFilterItem>
  cropDamageType: Maybe<DictFilterItem>
  cropDamagePropagation: Maybe<DictFilterItem>
  cropPart: Maybe<DictFilterItem>
}

interface DiseaseFilters {
  store: Ref<DiseasesFiltersStore>
  filters: Ref<IDiseasesFilter>
}

export function provideDiseaseFilters (): DiseaseFilters {
  const store = ref(createDiseasesFiltersStore());
  const filters = computed(() => getDiseaseFiltersByStore(store.value));

  provide(filtersKey, filters);
  provide(storeKey, store);

  return {
    filters,
    store
  };
}

export function useDiseaseFilters (): DiseaseFilters {
  const filters = inject(filtersKey);
  const store = inject(storeKey);

  if (!store || !filters)
    throw new Error('Отсутствует provideDiseaseFilters в предке');

  return {
    filters,
    store
  };
}

function createDiseasesFiltersStore (): DiseasesFiltersStore {
  return {
    crop: null,
    cropPart: null,
    cropDamageCharacter: null,
    cropDamageType: null,
    cropDamagePropagation: null
  };
}

export function getDiseaseFiltersByStore (store: DiseasesFiltersStore): IDiseasesFilter {
  const resolveFilterProp = (name: string): keyof IDiseasesFilter =>
    `${name}Id` as keyof IDiseasesFilter;

  return Object.values(storePropByName).reduce(
    (acc, storeProp) => {
      const value = store[storeProp];

      const formattedValue: any = Array.isArray(value)
        ? value.map(el => get(el, 'id'))
        : get(value, 'id', null);

      acc[resolveFilterProp(storeProp)] = formattedValue;

      return acc;
    },
    {} as IDiseasesFilter
  );
}

export function setFilterCropFromQuery (cropId: string, diseaseFiltersData: DiseaseFilters) {
  const { dataSource } = useDataSource();
  const router = useRouter();
  const getQuery = useQueryFormatter();

  const { filters, store } = diseaseFiltersData;
  filters.value.cropId = cropId;

  useAsyncComputed({
    get: async () => {
      const crops = await dataSource.getDiseaseFilterCrops(filters.value);
      store.value.crop = crops.find(({ id }) => id === cropId) || null;
    },
    default: null
  });

  router.replace(
    getQuery({
      currentCropId: null
    })
  );
}
