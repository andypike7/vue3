<template>
  <DiseaseTab :name="DiseaseTabs.DAMAGE_CHARACTER"
              @change="$emit('change', $event)"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DiseaseTabs } from '../composition';
import DiseaseTab from './DiseaseTab.vue';

/**
 * Вкладка фильтра для выбора характера поражения
 * @author morlz
 */
export default defineComponent({
  name: 'DiseaseDamageCharacter',
  components: { DiseaseTab },
  emits: ['change'],
  setup () {
    return { DiseaseTabs };
  }
});
</script>
