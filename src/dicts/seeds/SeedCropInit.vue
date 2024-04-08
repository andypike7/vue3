<template>
  <div :class="$style.root">
    <TextPanel :class="$style.helper">
      {{ i18n.FILTER_CROP_INIT_HELPER }}
    </TextPanel>

    <DictContentLayout ref="layout"
                       :scroll="scrollPosition"
                       @coverContainerHeight="coverHeight = $event">
      <template #controlsLeft>
        <DictContentTitle :title="i18n.SELECT_CROP_LABEL"/>
      </template>

      <template #cover>
        <CropSearchModal @change="$emit('change', $event)"/>
      </template>

      <transition name="fade">
        <DictContentOptionChunk v-if="status === LoadingStatus.LOADING"
                                :class="[$style.overlay, $style.cluster]"
                                :style="{ marginTop: `${coverHeight}px` }"
                                :items="Array(30).fill(null)"/>

        <VirtualScroller v-else-if="status === LoadingStatus.OK"
                         ref="scroller"
                         v-bind="virtualScrollerBindings"
                         :class="$style.overlay"
                         @click="handleItemClick"
                         @scroll="scrollPosition = $event.target.scrollTop">
          <div :style="{ height: `${coverHeight}px` }"/>
        </VirtualScroller>

        <div v-else
             :class="$style.overlay">
          Status: {{ status }}
        </div>
      </transition>
    </DictContentLayout>
  </div>
</template>

<script lang="ts">
import { LoadingStatus } from '@intterra/shared/types/generic';
import { useColumnsCounter } from '@intterra/common/hooks';
import { useSeedCropInitStyle } from './SeedCropInit.style';
import { useCropDataSource } from './CropDataSource.provider';
import { computed, defineComponent, ref } from 'vue';
import { useSeedFilters } from './SeedFilters.provider';
import {
  DictContentLayout,
  DictContentOptionChunk,
  DictContentOptionListOption,
  DictContentTitle,
  useCoverHeight,
  useScrollPosition
} from '@intterra/common/components/Dicts';
import { VirtualScroller, VirtualScrollerVM } from '@intterra/shared/ui/components/VirtualScroller';
import { TextPanel } from '@intterra/shared/ui/components/TextPanel';
import CropSearchModal from './tabs/SeedCropSearchModal.vue';

/**
 * Компонент для отображения списка культур до перехода на страницу фильтров
 *
 * @author morlz
 */
export default defineComponent({
  name: 'SeedCropInit',
  components: {
    DictContentOptionChunk,
    DictContentLayout,
    VirtualScroller,
    DictContentTitle,
    TextPanel,
    CropSearchModal
  },
  emits: ['change'],
  setup (props, { emit }) {
    const style = useSeedCropInitStyle();
    const { filters } = useSeedFilters();
    const { coverHeight } = useCoverHeight();
    const { scrollPosition } = useScrollPosition();
    const { cropDataSource, status } = useCropDataSource();
    const scroller = ref<VirtualScrollerVM>();
    const container = computed(() => scroller.value?.$el as HTMLElement | undefined);
    const { columnsCount } = useColumnsCounter(container, 200, 24, 32);

    const handleItemClick = (item: DictContentOptionListOption) =>
      emit('change', item);

    const virtualScrollerBindings = computed(() => {
      const { cropId } = filters.value;

      return {
        dataSource: cropDataSource.value,
        component: DictContentOptionChunk,
        measureItem: { label: '' },
        componentProps: {
          selected: cropId
            ? [cropId]
            : [],
          multiple: false
        },
        itemsGap: 24,
        containerPadding: 32,
        clusterClass: style.cluster,
        clusterStyle: `grid-template-columns: repeat(${columnsCount.value}, minmax(20rem, 1fr))`
      };
    });

    return {
      coverHeight,
      scrollPosition,
      virtualScrollerBindings,
      handleItemClick,
      scroller,
      status,
      LoadingStatus
    };
  }
});
</script>

<style lang="scss" module>
  .root {
    height: 100%;
    display: grid;
    grid-template-rows: 8.6rem calc(100% - 8.6rem);
    position: relative;
  }

  .cluster {
    display: grid;
    align-content: start;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    align-items: center;
    grid-gap: 2.4rem;
    padding: 1.2rem 3.2rem;
  }

  .helper {
    margin: 2.4rem 3.2rem 0 3.2rem;
  }

  .overlay {
    transition: all $fast-transition;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
