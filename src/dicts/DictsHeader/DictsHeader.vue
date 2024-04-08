<template>
  <div :class="$style.root">
    <PoseTransition>
      <BackIconContainer v-if="withBackButton"
                         :class="$style.icon_container"
                         @click="$router.go(-1)">
        <Icon :class="$style.icon"
              :name="IconName.ArrowLeft16"/>
      </BackIconContainer>
    </PoseTransition>

    <div :class="[$style.name, !withBackButton && $style.name_offset]">
      <div :key="names.title"
           v-text="names.title"
           :class="$style.title"/>

      <PoseTransition mode="out-in">
        <SubtitleContainer v-if="names.subtitle"
                           v-text="names.subtitle"
                           :class="$style.subtitle"
                           :poseKey="names.subtitle"/>
      </PoseTransition>
    </div>

    <transition name="fade">
      <DictsNavigationButtons v-if="isVisible"
                              :isNextDisabled="isNextDisabled"
                              :isPrevDisabled="isPrevDisabled"
                              @next="handleNext"
                              @prev="handlePrev"/>
    </transition>

    <BaseButton v-if="!viewOnly"
                :class="$style.search"
                :icon="IconName.Search16"
                :iconColor="$style.icon_color"
                form="fab"
                view="gray"
                @click="isSearchShown = true"/>

    <Icon v-if="isModal"
          :class="$style.close"
          :name="IconName.Close16"
          @click="$emit('close')"/>

    <DictsSearchPopup :currentDict="currentDict"
                      :showPopup="isSearchShown"
                      @close="isSearchShown = false"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import DictsSearchPopup from '../DictsSearchPopup.vue';
import posed, { PoseTransition } from '@intterra/shared/ui/components/PoseTransition';
import { BaseButton } from '@intterra/shared/ui/components/BaseButton';
import { DictsNavigationButtons } from '@intterra/common/components/DictsNavigationButtons';
import { Icon } from '@intterra/shared/ui/components/Icon';
import { Dictionary } from '@intterra/types';
import { useDictNavigationView } from '../composition';
import { injectDictsHeaderState } from './dictsHeader.provider';
import { RoutePagesNames } from '../../../router/constants';

const PAGE_NAMES_WITH_NAVIGATION = [RoutePagesNames.DICTS_DISEASE];

export default defineComponent({
  name: 'DictsHeader',
  components: {
    Icon,
    DictsSearchPopup,
    BaseButton,
    PoseTransition,
    DictsNavigationButtons,
    BackIconContainer: posed.div({
      enter: {
        opacity: 1,
        width: '6.4rem'
      },
      exit: {
        opacity: 0,
        width: '0rem'
      }
    }),
    SubtitleContainer: posed.div({
      enter: {
        opacity: 1,
        height: '2.5rem'
      },
      exit: {
        opacity: 0,
        height: '0rem'
      }
    })
  },
  emits: ['close'],
  props: {
    isModal: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const {
      handleNext,
      handlePrev,
      isNextDisabled,
      isPrevDisabled,
      isVisible
    } = useDictNavigationView(PAGE_NAMES_WITH_NAVIGATION);

    const { names, withBackButton } = injectDictsHeaderState();
    const isSearchShown = ref(false);
    const dictNamesByRouteNames = {
      [RoutePagesNames.DICTS_SEEDS]: Dictionary.SEEDS,
      [RoutePagesNames.DICTS_SEED]: Dictionary.SEEDS,
      [RoutePagesNames.DICTS_DISEASES]: Dictionary.DISEASES,
      [RoutePagesNames.DICTS_DISEASE]: Dictionary.DISEASES,
      [RoutePagesNames.DICTS_PROTECTIONS]: Dictionary.PROTECTIONS,
      [RoutePagesNames.DICTS_PROTECTION]: Dictionary.PROTECTIONS,
      [RoutePagesNames.DICTS_WEEDS]: Dictionary.WEEDS,
      [RoutePagesNames.DICTS_WEED]: Dictionary.WEEDS,
      [RoutePagesNames.DICTS_FERTILIZERS]: Dictionary.FERTILIZERS,
      [RoutePagesNames.DICTS_FERTILIZER]: Dictionary.FERTILIZERS,
      [RoutePagesNames.DICTS_PESTS]: Dictionary.PESTS,
      [RoutePagesNames.DICTS_PEST]: Dictionary.PESTS,
      [RoutePagesNames.DICTS_NUTRITION_DEFICIENCIES]: Dictionary.NUTRITION_DEFICIENCIES,
      [RoutePagesNames.DICTS_NUTRITION_DEFICIENCY]: Dictionary.NUTRITION_DEFICIENCIES,
      [RoutePagesNames.DICTS_CROPS]: Dictionary.CROPS,
      [RoutePagesNames.DICTS_CROP]: Dictionary.CROPS
    } as Record<RoutePagesNames, Dictionary>;

    const route = useRoute();
    const viewOnly = computed(() => route.query.viewOnly);
    const currentDict = computed(() => {
      const dictRouteParam = props.isModal
        ? route.query.dictPage
        : route.name;
      return dictNamesByRouteNames[dictRouteParam as RoutePagesNames];
    });

    return {
      handleNext,
      handlePrev,
      isVisible,
      isNextDisabled,
      isPrevDisabled,
      names,
      withBackButton,
      isSearchShown,
      viewOnly,
      currentDict
    };
  }
});
</script>

<style lang="scss" module>
  :export {
    icon_color: $default-text-color;
  }

  .root {
    min-height: 7.2rem;
    z-index: 5;
    display: grid;
    grid-template-columns: max-content 1fr max-content max-content;
    align-items: center;
    width: 100%;
    background: $default-bg-color;
    border-bottom: var(--border-size) solid $light-gray-ED-color;
  }

  .name {
    transition: all $default-transition;
    margin: 0;
    min-width: 0;

    &_offset {
      margin-left: 2.5rem;
    }
  }

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.4s;
    white-space: nowrap;
    @include text25Med31Line;
  }

  .subtitle {
    height: 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba($default-text-color, 0.7);
    @include text17Reg23Line;
  }

  .search {
    justify-self: end;
    margin: 0 2.4rem;
  }

  .icon {
    width: 3.2rem;
    height: 3.2rem;
    display: grid;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: $light-gray-ED-color;
    transition: all $default-transition;
  }

  .icon_container {
    width: 6.4rem;
    display: grid;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        .icon {
          color: $blue-color;
        }
      }
    }

    &:active {
      .icon {
        background: $light-gray-DC-color;
      }
    }
  }

  .close {
    display: grid;
    align-items: center;
    justify-items: center;
    grid-column-end: none;
    width: 8rem;
    text-align: center;
    font-size: 2rem;
    color: rgba($default-text-color, 0.6);
    transition: all $fast-transition;

    &:active {
      color: rgba($default-text-color, 0.4);
    }
  }
</style>
