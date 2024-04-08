<template>
  <BaseCollapsible :title="i18n.DIAGNOSTIC_AND_DAMAGE_DESCRIPTION">
    <div :class="$style.root">
      <CropPartSelectFields/>

      <template v-if="diagnostic">
        <BaseField v-if="diagnostic.description"
                   :label="i18n.INFECTED_CROP_DAMAGE_DESCRIPTION"
                   :value="diagnostic.description"/>

        <BaseField v-if="diagnostic.harmfulness"
                   :label="i18n.HARMFULLNESS_LABEL"
                   :value="diagnostic.harmfulness"/>

        <ElhsField v-if="diagnostic.elhs && diagnostic.elhs.length"
                   :elhs="diagnostic.elhs"/>

        <DiagnosticMethodsField v-if="diagnostic.hasDiagnosticMethods"
                                :diagnosticMethods="diagnostic.diagnosticMethods"/>

        <DamagesField v-if="diagnostic.hasDamages"
                      :damages="diagnostic.damages"/>

        <ConfusedDiseasesField v-if="diagnostic.hasConfusedDiseases"
                               :confusedDiseases="diagnostic.confusedDisease"/>
      </template>
    </div>

    <DiseasePagePesticides :diseaseId="diseaseId"/>
  </BaseCollapsible>
</template>

<script lang="ts">
import { BaseCollapsible } from '@intterra/common/components/BaseCollapsible';
import { BaseField } from '@intterra/common/components/BaseField';
import { computed, defineComponent } from 'vue';
import {
  ConfusedDiseasesField,
  CropPartSelectFields,
  DamagesField,
  DiagnosticMethodsField,
  ElhsField
} from './diagnostic';
import { useDiseaseData } from './DiseaseData.provider';
import DiseasePagePesticides from './DiseasePagePesticides.vue';

/**
 * Отображает секцию диагностики для страницы болезни
 *
 * @author morlz
 */
export default defineComponent({
  name: 'DiseasePageDiagnostic',

  components: {
    CropPartSelectFields,
    BaseCollapsible,
    BaseField,
    DiseasePagePesticides,
    ElhsField,
    DiagnosticMethodsField,
    DamagesField,
    ConfusedDiseasesField
  },

  setup () {
    const { diseaseId, disease } = useDiseaseData();
    const diagnostic = computed(() => disease.value?.diagnostic);

    return {
      diseaseId,
      diagnostic
    };
  }
});
</script>

<style lang="scss" module>
  .root {
    display: grid;
    grid-gap: 1.6rem;
    padding: 2.4rem 0;
    grid-template-columns: 100%;
  }
</style>
