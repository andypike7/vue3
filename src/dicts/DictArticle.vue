<template>
  <div :class="$style.root">
    <div v-if="!isLoading"
         :class="$style.content">
      <template v-if="images && images.length">
        <div :class="$style.gallery_container">
          <Gallery :name="dictName"
                   :images="images"
                   :class="$style.gallery"/>
        </div>

        <div :class="$style.delimiter"/>
      </template>

      <slot/>

      <transition name="fade">
        <BaseButton v-if="dictItemId"
                    :class="$style.apply_button"
                    :isDisabled="isAlreadyAdded"
                    :text="buttonText"
                    @click="applyDictItem"/>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { BaseButton } from '@intterra/shared/ui/components/BaseButton';
import { i18n } from '@intterra/i18n';
import { GalleryImage } from '@intterra/types';
import { Gallery } from '../Gallery';
import { useCheckAlreadyAddedProblem } from '../../hooks/CheckReportProblems.hook';
import { useQueryFormatter, useRouter } from '../../hooks/router';
import { RouteQueryKeys } from '../../router/constants';
import { computed, defineComponent, onMounted } from 'vue';
import { Analytics } from '@intterra/skyscout/services/analytics';

export default defineComponent({
  name: 'DictArticle',

  components: {
    Gallery,
    BaseButton
  },

  props: {
    dictName: {
      type: String,
      required: true
    },

    isLoading: {
      type: Boolean,
      default: false
    },

    articleName: {
      type: String,
      default: ''
    },

    images: {
      type: Array as () => GalleryImage[],
      default: null
    }
  },

  setup (props) {
    const router = useRouter();
    const getQuery = useQueryFormatter();
    const { dictItemId, isAlreadyAdded } = useCheckAlreadyAddedProblem();

    const applyDictItem = () => {
      if (isAlreadyAdded.value) return;
      router.replace(getQuery({
        [RouteQueryKeys.SHOULD_APPLY_DICT_ITEM]: 'true'
      }));
      router.go(-2);
    };

    const buttonText = computed(
      () => isAlreadyAdded.value
        ? i18n.REPORT_PROBLEM_ALREADY_ADDED
        : i18n.ADD_TO_REPORT_BUTTON
    );

    onMounted(() => {
      Analytics.openDictionaryArticle(props.dictName);
    });

    return {
      applyDictItem,
      dictItemId,
      isAlreadyAdded,
      buttonText
    };
  }
});
</script>

<style lang="scss" module>
  .root {
    position: absolute;
    z-index: 30;
    top: 0;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    background-color: $default-bg-color;
  }

  .content {
    width: 100%;
    max-height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .gallery {
    grid-auto-flow: column;
    grid-template-columns: none;
  }

  .gallery_container {
    padding: 2.4rem 3.2rem;
    overflow-y: auto;
  }

  .delimiter {
    margin: 0 3.2rem;
    width: 100%;
    border-bottom: var(--border-size) solid $light-gray-ED-color;
  }

  .apply_button {
    @include buttonGreenMobile(auto, 5);
    min-width: 19rem;
    padding: 0 3rem;
    font-weight: 500;
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 50;
  }
</style>
