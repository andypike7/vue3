<template>
  <BaseField :label="i18n.DIAGNOSTIC_METHODS_LABEL">
    <div :class="$style.root">
      <BaseSpoiler v-for="method in diagnosticMethods"
                   :key="method.id"
                   :isCloseByDefault="method.isClosed"
                   :isControlHidden="method.isClosed"
                   :title="method.name">
        <div v-if="!method.isClosed"
             :class="$style.method">
          <BaseField v-if="method.description"
                     :label="i18n.DIAGNOSTIC_DESCRIPTION"
                     :value="method.description"/>

          <BaseField v-if="method.images && method.images.length"
                     :label="i18n.ADDITIONAL_IMAGES">
            <Gallery :images="method.images"
                     :name="'disease-page-diagnostic-' + method.id"/>
          </BaseField>
        </div>
      </BaseSpoiler>
    </div>
  </BaseField>
</template>

<script lang="ts">
import { BaseField } from '@intterra/common/components/BaseField';
import { BaseSpoiler } from '@intterra/common/components/BaseSpoiler';
import { DiseasePageDiagnosticMethod } from '@intterra/types';
import { Gallery } from '../../../../Gallery';
import { defineComponent, PropType } from 'vue';

/**
 * Отображает секцию диагностики для страницы болезни
 *
 * @author morlz
 */
export default defineComponent({
  name: 'DiagnosticMethodsField',

  components: {
    BaseField,
    BaseSpoiler,
    Gallery
  },

  props: {
    diagnosticMethods: {
      type: Array as PropType<DiseasePageDiagnosticMethod[]>,
      required: true
    }
  }
});
</script>

<style lang="scss" module>
  .root {
    display: grid;
    grid-gap: 1.6rem;
  }

  .method {
    display: grid;
    padding: 1.6rem;
    grid-gap: 0.8rem;
  }
</style>
