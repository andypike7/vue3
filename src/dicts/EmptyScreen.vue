<template>
  <div :class="$style.root">
    <Icon :class="$style.icon"
          :name="IconName.ExclamationCircle48"/>

    <div v-text="i18n.FILTER_EMPTY_TITLE"
         :class="$style.title"/>

    <div v-text="i18n.FILTER_EMPTY_DESCRIPTION"
         :class="$style.description"/>

    <BaseButton :text="i18n.CLEAR_FILTERS_BUTTON"
                view="secondary"
                @click="$emit('empty')"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BaseButton } from '@intterra/shared/ui/components/BaseButton';
import { Icon } from '@intterra/shared/ui/components/Icon';

export default defineComponent({
  name: 'EmptyScreen',
  components: {
    BaseButton,
    Icon
  },
  emits: ['empty']
});
</script>

<style lang="scss" module>
  .root {
    display: grid;
    align-items: center;
    justify-items: center;
    align-content: center;
    grid-gap: 0.8rem;
  }

  .title {
    color: $black-color;
    @include text17Reg19Line();
  }

  .description {
    color: $gray-A7-color;
    @include text13Reg19Line();
    max-width: 33rem;
    text-align: center;
    margin-bottom: 0.8rem;
  }

  .icon {
    border-radius: 50%;
    font-size: 4.8rem;
    color: $blue-color;
    margin-bottom: 0.8rem;
  }
</style>
