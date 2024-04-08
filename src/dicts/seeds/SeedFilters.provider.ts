import { ISeedsFilter } from '@intterra/graphql';
import { DictFilterCrop, DictFilterItem, SeedFilterUsage } from '@intterra/types';
import { computed, inject, InjectionKey, provide, ref, Ref } from 'vue';
import { get } from 'lodash';

const filtersKey: InjectionKey<Ref<ISeedsFilter>> = Symbol('seedFilters');
const storeKey: InjectionKey<Ref<SeedsFiltersStore>> = Symbol('seedFiltersStore');

export interface SeedsFiltersStore {
  // Культура
  // Одиночный выбор
  crop: DictFilterCrop

  // Направление использования
  // Одиночный выбор
  usage: Maybe<SeedFilterUsage>

  // бренд (or)
  // Множественный выбор: все семена для всех брендов
  brand: Maybe<DictFilterItem[]>

  // Регион
  federalDistrict: Maybe<DictFilterItem>

  // Область
  // Область: Множественный выбор
  // Условие "и" (and)
  // Семена которые есть в всех выбраных областях региона
  district: Maybe<DictFilterItem[]>

  // Технология возделывания
  technology: Maybe<DictFilterItem>

  // // -------- ( Срок созревания ) ----------
  //
  // // ФАО, диапазон [от, до]
  // fao?: MinMaxPair
  //
  // // Вегетационный период, диапазон [от, до] (дней)
  // growingSeason?: MinMaxPair
  //
  // // Группы спелости @ref Ripeness.id
  // ripeness?: Ripeness[]
  //
  // // -------- (/ Срок созревания ) ----------
  //
  // // Требуемый агрофон
  // agrophone?: Agrophone
  //
  // // Устойчиваость к Полеганию
  // // Условие "или" (or)
  // // @ref SeedResistanceType.id
  // lodgingResistanceType?: ISeedResistanceType[]
  //
  // // Устойчиваость к Засухе
  // // Условие "или" (or)
  // // @ref SeedResistanceType.id
  // drought?: ISeedResistanceType[]
  //
  // // Устойчиваость к Осыпанию
  // // Условие "или" (or)
  // // @ref SeedResistanceType.id
  // sheddingResistanceType?: ISeedResistanceType[]
  //
  // // Зимостойкость
  // // Условие "или" (or)
  // // @ref SeedResistanceType.id
  // winterResistanceType?: ISeedResistanceType[]
  //
  // // Устойчивость к болезням
  // // @ref SeedResistanceType.id
  // disease?: SteadinessStore
  //
  // // Устойчивость к болезням значения
  // diseaseValues?: SteadinessStoreValue<SeedResistanceTypeDropdownOption>
  //
  // // Устойчивость к вредителям
  // // @ref SeedResistanceType.id
  // pest?: SteadinessStore
  //
  // // Устойчивость к вредителям значения
  // pestValues?: SteadinessStoreValue<SeedResistanceTypeDropdownOption>
  //
  // /**
  //  * Минимальный год включения в реестр
  //  */
  // minRegistrationYear?: number
}

const seedFilterPropNames: (keyof SeedsFiltersStore)[] = [
  'crop',
  'brand',
  'federalDistrict',
  'district',
  'technology',
  'usage'
];

export function provideSeedFilters () {
  const store = ref<SeedsFiltersStore>({
    crop: {
      id: ''
    } as DictFilterCrop,
    usage: null,
    brand: null,
    federalDistrict: null,
    district: null,
    technology: null
  });

  const resolveFilterProp = (name: string): keyof ISeedsFilter =>
    `${name}Id` as keyof ISeedsFilter;

  const filters = computed<ISeedsFilter>(
    () =>
      seedFilterPropNames.reduce(
        (acc, storeProp) => {
          const value = store.value[storeProp];

          // TODO: Дописать типы как в оригинале
          const formatedValue: any = Array.isArray(value)
            ? value.map(el => el.id)
            : get(value, 'id');

          acc[resolveFilterProp(storeProp)] = formatedValue;

          return acc;
        },
        {} as ISeedsFilter
      )
  );

  provide(filtersKey, filters);
  provide(storeKey, store);

  return {
    store,
    filters
  };
}

export function useSeedFilters () {
  const filters = inject(filtersKey);
  const store = inject(storeKey);

  if (!store || !filters)
    throw new Error('Отсутствует provideSeedFilters(filters, store) в родителе');

  return {
    filters,
    store
  };
}
