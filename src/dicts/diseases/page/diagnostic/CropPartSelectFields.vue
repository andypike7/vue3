<template>
  <div :class="$style.root">
    <BaseSelect :selected="selectedCrops"
                :class="$style.select"
                :dataSource="cropsDataSource"
                :headerText="i18n.CROPS_SINGLE_LABEL"
                :label="i18n.CROPS_SINGLE_LABEL"
                @input="cropSearchText = $event"
                @select="selectedCrops = $event"/>

    <BaseSelect v-if="isShowPartSelect"
                :selected="selectedCropParts"
                :class="$style.select"
                :dataSource="cropPartsDataSource"
                :headerText="i18n.INFECTED_CROP_PART"
                :label="i18n.INFECTED_CROP_PART"
                @input="cropPartSearchText = $event"
                @select="selectedCropParts = $event"/>
  </div>
</template>

<script lang="ts">
import { BaseSelect } from '@intterra/shared/ui/components/BaseSelect';
import { defineComponent } from 'vue';
import { useDiseaseCropSelect } from '../CropSelect.provider';

/**
 * Отображение полей для выбора культуры и органа страницы болезни
 *
 * @author morlz
 */
export default defineComponent({
  name: 'CropPartSelectFields',

  components: {
    BaseSelect
  },

  setup () {
    const {
      cropPartsDataSource,
      cropPartSearchText,
      cropsDataSource,
      cropSearchText,
      isShowPartSelect,
      selectedCropParts,
      selectedCrops
    } = useDiseaseCropSelect();

    return {
      cropPartsDataSource,
      cropPartSearchText,
      cropsDataSource,
      cropSearchText,
      isShowPartSelect,
      selectedCropParts,
      selectedCrops
    };
  }
});
</script>

<style lang="scss" module>
  .root {
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
  }

  .select {
    width: 24rem;
  }
</style>
