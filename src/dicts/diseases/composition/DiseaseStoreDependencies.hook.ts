import { Ref, watch } from 'vue';
import { DiseasesFiltersStore } from './DiseaseFilters.provider';

export function useDiseaseStoreDependencies (store: Ref<DiseasesFiltersStore>) {
  watch(() => store.value.crop, (_, old) => {
    if (old === undefined) return;
    store.value.cropPart = null;
  }, { immediate: true });

  watch(() => store.value.cropPart, (_, old) => {
    if (old === undefined) return;

    store.value.cropDamageCharacter
      = store.value.cropDamagePropagation
      = store.value.cropDamageType
      = null;
  }, { immediate: true });
}
