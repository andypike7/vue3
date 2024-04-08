<template>
  <div>
    <div v-for="item in items"
         :key="item.id"
         :data-event-click="item.id"
         class="p-dict-item">
      <div :style="{ 'background-image': getBackgroundUrl(item.imageSrc) }"
           class="p-dict-item__image">
        <Icon v-if="!item.imageId || !item.imageSrc"
              :class="$style.icon"
              :name="IconByDictionary[`${type}s`]"/>
      </div>
      <div class="p-dict-item__title">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { getBackgroundUrl } from '@intterra/shared/util/generic';
import { Icon } from '@intterra/shared/ui/components/Icon';
import { IconByDictionary } from '@intterra/common/utils/DictionaryUtils';

export default {
  name: 'VSImageCard',
  components: { Icon },
  props: {
    items: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    isOfflineModeOn: {
      type: Boolean,
      required: true
    }
  },
  beforeCreate () {
    Object.assign(this, { IconByDictionary });
  },
  methods: {
    getBackgroundUrl
  }
};
</script>

<style lang="scss" module>
  .icon {
    @include cardIcon()
  }
</style>
