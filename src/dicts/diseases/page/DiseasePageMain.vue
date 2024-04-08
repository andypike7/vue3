<template>
  <BaseCollapsible :isOpen="isOpen"
                   :title="i18n.MAIN_INFO_ABOUT_DISEASE"
                   @change="isOpen = $event">
    <div v-if="content"
         :class="$style.root">
      <BaseField v-if="content.description"
                 :label="i18n.SHORT_DISEASE_DESCRIPTION"
                 :value="content.description"
                 :class="$style.full_width"/>

      <BaseField v-if="content.lifecycle"
                 :label="i18n.LIFECYCLE_DESCRIPTION"
                 :value="content.lifecycle"
                 :class="$style.full_width"/>

      <BaseField v-if="content.favorInfectionCondition"
                 :label="i18n.FAVOR_INFECTION_CONDITION"
                 :value="content.favorInfectionCondition"/>

      <BaseField v-if="content.adverseInfectionCondition"
                 :label="i18n.ADVERSE_INFECTION_CONDITION"
                 :value="content.adverseInfectionCondition"/>

      <BaseField v-if="content.infectedProcessPhenophases"
                 :label="i18n.DISEASE_PHENOPHASES_LABEL"
                 :value="content.infectedProcessPhenophases"/>

      <BaseField v-if="content.diagnosticPhenophases"
                 :label="i18n.DISEASE_DIAGNOSTIC_PHENOPHASES"
                 :value="content.diagnosticPhenophases"/>

      <BaseField v-if="content.infectionPlaces"
                 :label="i18n.INFECTION_PLACES"
                 :value="content.infectionPlaces"/>

      <BaseField v-if="content.infectionIntermediateHost"
                 :label="i18n.INFECTION_INERMEDIATE_HOST"
                 :value="content.infectionIntermediateHost"/>

      <BaseField v-if="content.spreadRegions"
                 :label="i18n.SPERAD_REGIONS"
                 :value="content.spreadRegions"
                 :class="$style.full_width"/>
    </div>
  </BaseCollapsible>
</template>

<script lang="ts">
import { BaseCollapsible } from '@intterra/common/components/BaseCollapsible';
import { BaseField } from '@intterra/common/components/BaseField';
import { useDiseaseData } from './DiseaseData.provider';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DiseasePageMain',

  components: {
    BaseCollapsible,
    BaseField
  },

  setup () {
    const isOpen = ref(false);
    const { disease } = useDiseaseData();
    const content = computed(() => disease.value?.content);

    return {
      isOpen,
      content
    };
  }
});
</script>

<style lang="scss" module>
  .root {
    display: grid;
    grid-gap: 1.6rem 2.4rem;
    grid-template-columns: 1fr 1fr;
    padding: 1rem 0;
    align-items: start;
  }

  .full_width {
    grid-column: 1 / 3;
  }
</style>
