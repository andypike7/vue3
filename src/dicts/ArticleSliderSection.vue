<template>
  <div class="s-article-slider">
    <div ref="list" class="s-article-slider-list">
      <div v-for="photo in preparedPhotos"
           :key="photo.imageId"
           class="s-article-slider-item">
        <div :style="`background-image: ${photo.bgImage}`"
             :class="$style.image"
             @click="openImageViewer(photo.imageId)">
          <Icon v-if="photo.icon"
                :name="photo.icon"
                :class="$style.icon"/>
        </div>
        <div v-if="photo.label" class="s-article-slider-item__text">
          {{ photo.label }}
        </div>
      </div>
    </div>
    <ImageViewerPopup v-if="showImageViewer"
                      :imageId="imageId"
                      :images="preparedPhotos"
                      :isApplyShown="isApplyShown"
                      @apply="$emit('apply')"
                      @close="closeImageViewer"/>
  </div>
</template>

<script>
import ImageViewerPopup from '../images/ImageViewerPopup.vue';
import { getBackgroundUrl } from '@intterra/shared/util/generic';
import { IconByDictionary } from '@intterra/common/utils/DictionaryUtils';
import { Icon } from '@intterra/shared/ui/components/Icon';

export default {
  name: 'ArticleSliderSection',
  components: { ImageViewerPopup, Icon },
  emits: ['apply'],
  props: {
    photos: {
      type: Array,
      required: true
    },
    isModal: {
      type: Boolean,
      default: false
    },
    dictName: {
      type: String,
      default: null
    },
    isAlreadyAdded: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    imageId: '',
    showImageViewer: false
  }),
  methods: {
    openImageViewer (imageId) {
      this.imageId = imageId;
      this.showImageViewer = true;
    },
    closeImageViewer () {
      this.showImageViewer = false;
    }
  },
  computed: {
    preparedPhotos () {
      return this.photos.map(({ comment, imageId, imageSrc, label }) => ({
        comment,
        imageSrc,
        imageId,
        label,
        bgImage: getBackgroundUrl(imageSrc),
        icon: ((!imageId || !imageSrc) && this.dictName) && IconByDictionary[this.dictName]
      }));
    },
    isApplyShown () {
      return this.isModal && !this.isAlreadyAdded;
    }
  }
};
</script>

<style lang="scss" module>
  .icon {
    @include cardIcon()
  }

  .image{
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 20rem;
    border: var(--border-size) solid $light-gray-ED-color;
    background: $default-bg-color center no-repeat;
    background-size: cover;
    border-radius: 0.3rem;
  }
</style>
