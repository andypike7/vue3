import { DiseasesFiltersEnabled, IDiseasesFilter } from '@intterra/graphql';
import { computed, inject, InjectionKey, provide, Ref } from 'vue';

const tabsKey: InjectionKey<Ref<Maybe<DiseasesFiltersEnabled>>> = Symbol('disease-tabs');

export function provideDiseaseTabs (filters: Ref<IDiseasesFilter>) {
  const tabs = computed(() => ({
    cropDamageCharacter: !!filters.value.cropId && !!filters.value.cropPartId,
    cropDamagePropagation: !!filters.value.cropId && !!filters.value.cropPartId,
    cropDamageType: !!filters.value.cropId && !!filters.value.cropPartId,
    cropPart: !!filters.value.cropId
  }));

  provide(tabsKey, tabs);

  return {
    tabs
  };
}

export function useDiseaseTabActive (name: Maybe<keyof DiseasesFiltersEnabled>) {
  if (!name) {
    return {
      isDisabled: computed(() => false)
    };
  }

  const tabs = inject(tabsKey);
  if (!tabs)
    throw new Error('Используй provideDiseaseTabs()!');

  const isDisabled = computed(() => !tabs.value?.[name]);

  return {
    isDisabled
  };
}
