<template>
  <div>
    <div v-for="item in items"
         :key="item.id"
         class="p-dict-item m--no-image"
         :class="$style.item"
         :data-event-click="item.id">
      <Icon v-if="item.icon"
            :class="$style.icon"
            :name="item.icon"/>
      <div v-else :class="$style.culture_default">
        <Icon
          :class="$style.icon"
          :name="IconName.CultureDefault16"/>
      </div>
      <div class="p-dict-item__title m--bold">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@intterra/shared/ui/components/Icon';

export default {
  name: 'VSCropCard',
  components: { Icon },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" module>
  .icon {
    width: 2.7rem;
    height: 2.7rem;
    font-size: 2.7rem;
    margin-bottom: 0.9rem;
  }

  .item {
    &:active {
      .culture_default {
        /* stylelint-disable-next-line declaration-property-unit-allowed-list */
        border: 0.2rem solid $accent-color;
      }
    }
  }

  .culture_default {
    width: 3.1rem;
    height: 3.1rem;
    border-radius: 50%;
    /* stylelint-disable-next-line declaration-property-unit-allowed-list */
    border: 0.2rem solid $light-gray-ED-color;
    transition: border $default-transition;
  }
</style>
