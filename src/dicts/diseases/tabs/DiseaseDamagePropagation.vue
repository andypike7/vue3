<template>
  <DiseaseTab :name="DiseaseTabs.DAMAGE_PROPAGATION"
              @change="$emit('change', $event)"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DiseaseTabs } from '../composition';
import DiseaseTab from './DiseaseTab.vue';

/**
 * Вкладка фильтра для характера распространения
 * @author morlz
 */
export default defineComponent({
  name: 'DiseaseDamagePropagation',
  components: { DiseaseTab },
  emits: ['change'],
  setup () {
    return { DiseaseTabs };
  }
});
</script>
