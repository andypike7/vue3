<template>
  <BaseCollapsible :class="$style.root"
                   :title="`${i18n.DAMAGE_SIGNS} (${damages.length})`">
    <div :class="$style.damages">
      <BaseSpoiler v-for="damage in damages"
                   :key="damage.id"
                   :isCloseByDefault="damage.isClose"
                   :isControlHidden="damage.isClose"
                   :title="damage.name">
        <div :class="$style.damage">
          <BaseField v-if="damage.images"
                     :label="i18n.ADDITIONAL_IMAGES">
            <Gallery :images="damage.images"
                     :name="'disease-page-damage-' + damage.id"/>
          </BaseField>
        </div>
      </BaseSpoiler>
    </div>
  </BaseCollapsible>
</template>

<script lang="ts">
import { BaseCollapsible } from '@intterra/common/components/BaseCollapsible';
import { BaseField } from '@intterra/common/components/BaseField';
import { BaseSpoiler } from '@intterra/common/components/BaseSpoiler';
import { DiseasePageDiagnosticDamage } from '@intterra/types';
import { Gallery } from '../../../../Gallery';
import { defineComponent, PropType } from 'vue';

/**
 * Отображает секцию диагностики для страницы болезни
 *
 * @author morlz
 */
export default defineComponent({
  name: 'DamagesField',

  components: {
    BaseCollapsible,
    BaseField,
    BaseSpoiler,
    Gallery
  },

  props: {
    damages: {
      type: Array as PropType<DiseasePageDiagnosticDamage[]>,
      required: true
    }
  }
});
</script>

<style lang="scss" module>
  .root {
    margin-top: 1rem;
  }

  .damages {
    display: grid;
    grid-gap: 1.6rem;
    padding: 1.6rem 0;
  }

  .damage {
    display: grid;
    padding: 1.6rem;
    grid-gap: 0.8rem;
  }
</style>
