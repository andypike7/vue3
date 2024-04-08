<template>
  <DictControlsStepper ref="controller"
                       v-bind="{ title, label, value, placeholder, steps, isDisabled }"
                       shouldShowArrow
                       shouldShowDelimiter
                       :clearButtonOnValue="clearButtonOnValue"
                       @focus="handleFocus">
    <template #cover>
      <slot/>
    </template>
  </DictControlsStepper>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { i18n } from '@intterra/i18n';
import {
  DiseaseControlTab,
  DiseaseTabs,
  filterPropByName,
  getItemsLoaderByTabName,
  getTitleAndLabelByName,
  isDisabledByName,
  storePropByName,
  useDiseaseControlTab,
  useDiseaseTabActive
} from '../composition';
import { DictControlsStepper } from '@intterra/common/components/Dicts';

export default defineComponent({
  name: 'DiseaseTab',
  components: { DictControlsStepper },
  emits: ['change'],
  props: {
    name: {
      type: String as PropType<DiseaseTabs>,
      required: true
    },
    overridesFactory: {
      type: Function as PropType<(tab: DiseaseControlTab) => object>,
      default: null
    }
  },
  setup (props, { emit }) {
    const { isDisabled } = useDiseaseTabActive(isDisabledByName[props.name]);
    const tab = useDiseaseControlTab(
      getItemsLoaderByTabName(props.name),
      storePropByName[props.name],
      filterPropByName[props.name],
      emit
    );
    const titleAndLabel = getTitleAndLabelByName(props.name);

    return {
      handleFocus: tab.handleFocus,
      steps: tab.steps,
      value: tab.value,
      isDisabled,
      placeholder: i18n.FILTER_NO_VALUE,
      title: titleAndLabel,
      label: titleAndLabel,
      clearButtonOnValue: true,
      ...props.overridesFactory?.(tab)
    };
  }
});
</script>
