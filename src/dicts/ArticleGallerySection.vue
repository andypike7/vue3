<template>
  <div class="p-article-infobox-line">
    <div v-if="label" class="p-article-infobox__label">
      {{ i18n[label] }}
    </div>
    <div class="p-article-infobox-gallery">
      <div class="p-article-infobox-gallery__image"
           :style="{ 'background-image': getBackgroundUrl(currentImageSrc) }"/>
      <div v-if="items.length > 1" class="p-article-infobox-gallery-dots">
        <div v-for="item in items"
             :key="item.imageId"
             class="p-article-infobox-gallery-dot"
             :class="{ 'm--active': item.imageId === currentImageId }"
             @click="changeImage(item.imageId)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { getBackgroundUrl } from '@intterra/shared/util/generic';

export default {
  name: 'ArticleGallerySection',
  props: {
    items: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: null
    }
  },
  created () {
    this.changeImage(this.items[0]?.imageId);
  },
  data () {
    return {
      currentImageId: null
    };
  },
  methods: {
    changeImage (itemId = null) {
      this.currentImageId = itemId;
    },
    getBackgroundUrl
  },
  computed: {
    currentImageSrc () {
      return this.items.find(image => image.imageId === this.currentImageId)?.imageSrc;
    }
  },
  watch: {
    items () {
      this.changeImage(this.items[0]?.imageId);
    }
  }
};
</script>
