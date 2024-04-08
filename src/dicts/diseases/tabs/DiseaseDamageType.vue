<template>
  <DiseaseTab :name="DiseaseTabs.DAMAGE_TYPE"
              @change="$emit('change', $event)"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DiseaseTabs } from '../composition';
import DiseaseTab from './DiseaseTab.vue';

/**
 * Вкладка фильтра для выбора типа поражения
 * @author morlz
 */
export default defineComponent({
  name: 'DiseaseDamageType',
  components: { DiseaseTab },
  emits: ['change'],
  setup () {
    return { DiseaseTabs };
  }
});
</script>
