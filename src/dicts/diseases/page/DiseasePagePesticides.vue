<template>
  <BaseCollapsible v-if="pesticides"
                   :title="`${i18n.PESTICIDES_FOR_FIGTH} (${pesticides.count})`">
    <TextPanel :iconName="IconName.WarningCircle24"
               :color="$style.red_color"
               :class="$style.warning">
      {{ i18n.PESTICIDE_WARNING }}
    </TextPanel>

    <div :class="$style.list">
      <DictsPesticideCard v-for="pesticide in pesticides.slice"
                          :key="pesticide.id"
                          v-bind="pesticide"/>
    </div>

    <BaseButton view="link"
                :text="`${i18n.VIEW_ALL_LIST} (${pesticides.count})`"/>
  </BaseCollapsible>
</template>

<script lang="ts">
import { BaseButton } from '@intterra/shared/ui/components/BaseButton';
import { BaseCollapsible } from '@intterra/common/components/BaseCollapsible';
import { DictsPesticideCard } from '@intterra/common/components/DictsPesticideCard';
import { TextPanel } from '@intterra/shared/ui/components/TextPanel';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DiseasePagePesticides',

  components: {
    DictsPesticideCard,
    BaseButton,
    TextPanel,
    BaseCollapsible
  },

  props: {
    diseaseId: {
      type: String,
      required: true
    }
  },

  setup () {
    return {
      // Пока нет справочника сзр - тут пусто
      pesticides: false
    };
  }
});
</script>

<style lang="scss" module>
  :export {
    red_color: $red-color;
  }

  .warning {
    margin-top: 1rem;
  }

  .list {
    padding: 1.6rem 0;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 2.4rem;
    overflow-x: auto;
    justify-content: start;
  }
</style>
