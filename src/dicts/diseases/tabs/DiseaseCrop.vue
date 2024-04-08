<template>
  <DiseaseTab :name="DiseaseTabs.CROP"
              :overridesFactory="overridesFactory"
              @change="$emit('change', $event)">
    <DiseaseCropSearchModal @change="$emit('change', $event)"/>
  </DiseaseTab>
</template>

<script lang="ts">
import { i18n } from '@intterra/i18n';
import { computed, defineComponent } from 'vue';
import { DiseaseTabs, DiseaseControlTab } from '../composition';
import DiseaseTab from './DiseaseTab.vue';
import DiseaseCropSearchModal from './DiseaseCropSearchModal.vue';

/**
 * Вкладка фильтра для выбора культуры
 * @author morlz
 */
export default defineComponent({
  name: 'DiseaseCrop',
  components: { DiseaseTab, DiseaseCropSearchModal },
  emits: ['change'],
  setup () {
    return {
      DiseaseTabs,
      overridesFactory (tab: DiseaseControlTab) {
        const clearButtonOnValue = computed(() => !!tab.value.value);
        const value = computed(() => tab.value.value || i18n.ALL_CROPS_LABEL);
        return {
          clearButtonOnValue,
          value
        };
      }
    };
  }
});
</script>
