<template>
  <DiseaseTab :name="DiseaseTabs.CROP_PART"
              @change="$emit('change', $event)"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DiseaseTabs } from '../composition';
import DiseaseTab from './DiseaseTab.vue';

/**
 * Вкладка фильтра для выбора органа культуры
 * @author morlz
 */
export default defineComponent({
  name: 'DiseaseCropPart',
  components: { DiseaseTab },
  emits: ['change'],
  setup () {
    return { DiseaseTabs };
  }
});
</script>
