
<template>
  <BaseCollapsible :title="`${i18n.CONFUSED_DISEASE} (${confusedDiseases.length})`">
    <div :class="$style.root">
      <div :class="$style.container">
        <DamageCard v-for="confusedDisease in confusedDiseases"
                    :key="confusedDisease.id"
                    v-bind="confusedDisease"/>
      </div>
    </div>
  </BaseCollapsible>
</template>

<script lang="ts">
import { BaseCollapsible } from '@intterra/common/components/BaseCollapsible';
import { DamageCard } from '@intterra/common/components/DamageCard';
import { DiseasePageDiagnosticConfusedDisease } from '@intterra/types';
import { defineComponent, PropType } from 'vue';

/**
 * Отображает секцию диагностики для страницы болезни
 *
 * @author morlz
 */
export default defineComponent({
  name: 'ConfusedDiseasesField',

  components: {
    BaseCollapsible,
    DamageCard
  },

  props: {
    confusedDiseases: {
      type: Array as PropType<DiseasePageDiagnosticConfusedDisease[]>,
      required: true
    }
  }
});
</script>

<style lang="scss" module>
  .root {
    overflow-x: auto;
    width: 100%;
    margin: 1.6rem 0;
  }

  .container {
    display: grid;
    grid-gap: 1.6rem;
    justify-content: start;
    grid-auto-flow: column;
  }
</style>
