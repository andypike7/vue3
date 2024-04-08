<template>
  <div class="loader" :class="rootClasses">
    <div v-if="isReady"
         ref="article"
         :class="$style.wrap">
      <ArticleSliderSection v-if="showPhotos"
                            :photos="photos"
                            :isModal="isModal"
                            :isAlreadyAdded="isAlreadyAdded"
                            :dictName="dictName"
                            @apply="applyDictItem"/>
      <slot/>

      <transition name="fade">
        <BaseButton v-if="dictItemId && !viewOnly"
                    :class="$style.apply_button"
                    :isDisabled="isAlreadyAdded"
                    :text="buttonText"
                    @click="applyDictItem"/>
      </transition>
    </div>
  </div>
</template>

<script>
import ArticleSliderSection from './ArticleSliderSection.vue';
import { RouteQueryKeys } from '../../router/constants';
import { computed, onMounted } from 'vue';
import { i18n } from '@intterra/i18n';
import { BaseButton } from '@intterra/shared/ui/components/BaseButton';
import { Analytics } from '@intterra/skyscout/services/analytics';
import { useCheckAlreadyAddedProblem } from '../../hooks/CheckReportProblems.hook';
import { CommonModals } from '../PopupContainer/PopupContainer.types';

export default {
  name: 'ArticleWrap',
  components: {
    ArticleSliderSection,
    BaseButton
  },
  props: {
    isReady: {
      type: Boolean,
      default: false
    },
    photos: {
      type: Array,
      default: () => []
    },
    fullHeight: {
      type: Boolean,
      default: false
    },
    /**
     * Название справочника
     */
    dictName: {
      type: String,
      default: null
    }
  },
  setup (props) {
    const { dictItemId, isAlreadyAdded, viewOnly } = useCheckAlreadyAddedProblem();

    const showPhotos = computed(() => !!(props.photos?.length));

    const buttonText = computed(
      () => isAlreadyAdded.value
        ? i18n.REPORT_PROBLEM_ALREADY_ADDED
        : i18n.ADD_TO_REPORT_BUTTON
    );

    onMounted(() => {
      Analytics.openDictionaryArticle(props.dictName);
    });

    return {
      showPhotos,
      buttonText,
      dictItemId,
      isAlreadyAdded,
      viewOnly
    };
  },
  methods: {
    applyDictItem () {
      if (this.isAlreadyAdded) return;
      // Флаг в пути о том что нужно применить итем
      this.$router.replace(this.getQuery({
        [RouteQueryKeys.SHOULD_APPLY_DICT_ITEM]: 'true'
      }));
      this.$router.go(-2);

      // TODO: добавить обработку добавления в отчёт
    }
  },
  computed: {
    isModal () {
      return this.query.modal === CommonModals.DICTIONARY;
    },
    rootClasses () {
      return [
        this.$style.root,
        {
          'is-loading': !this.isReady,
          [this.$style.full_height]: this.fullHeight
        }
      ];
    }
  },
  watch: {
    '$route.params' (current, prev) {
      if (JSON.stringify(current) !== JSON.stringify(prev))
        this.$refs.article.scrollTop = 0;
    },
    '$route.query.dictItemId' (current, prev) {
      if (current !== prev)
        this.$refs.article.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss" module>
  .full_height {
    height: 100% !important;
  }

  .root {
    position: absolute;
    z-index: 30;
    top: 0;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    background-color: $default-bg-color;
  }

  .wrap {
    width: 100%;
    max-height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
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
