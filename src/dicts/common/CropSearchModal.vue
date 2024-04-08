<template>
  <div>
    <BaseInput :placeholder="i18n.SEARCH_BY_CROP_PLACEHOLDER"
               isReadOnly
               :class="$style.input"
               :iconRight="IconName.Search16"
               @click="isModalShow = true"/>

    <SearchModal :headerText="i18n.CROP_SEARCH_TITLE"
                 :placeholders="[i18n.WRITE_CROP_NAME]"
                 :status="status"
                 v-bind="searchModalBindings"
                 @close="isModalShow = false"
                 @select="handleSelect"
                 @input="$emit('search', $event)"/>
  </div>
</template>

<script lang="ts">
import { BaseInput } from '@intterra/shared/ui/components/BaseInput';
import { SearchModal } from '@intterra/shared/ui/components/SearchModal';
import { VirtualScrollerDataSource } from '@intterra/shared/ui/components/VirtualScroller';
import { DictFilterCrop } from '@intterra/types';
import { LoadingStatus } from '@intterra/shared/types/generic';
import { useDataSourceMapper } from '@intterra/shared/ui/hooks/DataSource';
import { computed, defineComponent, PropType, ref, watch } from 'vue';

/**
 * Компонент для поиска по культуре
 *
 * @author morlz
 */
export default defineComponent({
  name: 'CropSearchModal',
  components: {
    SearchModal,
    BaseInput
  },
  emits: ['change', 'close', 'search'],
  props: {
    crop: {
      type: Object,
      default: null
    },
    status: {
      type: String as PropType<LoadingStatus>,
      required: true
    },
    dataSource: {
      type: Object as PropType<VirtualScrollerDataSource<DictFilterCrop>>,
      required: true
    }
  },
  setup (props, { emit }) {
    const isModalShow = ref(false);

    const { dataSource } = useDataSourceMapper(
      computed(() => props.dataSource),
      async crop => ({
        ...crop,
        leftIcon: crop.icon
      })
    );

    const searchModalBindings = computed(() => ({
      isShow: isModalShow.value,
      dataSource: dataSource.value,
      previousSelectedItems: props.crop ? [props.crop] : []
    }));

    watch(isModalShow, () => emit('search', ''), { immediate: true });

    const handleSelect = (crop: DictFilterCrop) => {
      emit('change', crop);
      isModalShow.value = false;
      emit('close');
    };

    return {
      handleSelect,
      searchModalBindings,
      isModalShow
    };
  }
});
</script>

<style lang="scss" module>
  .input {
    width: 27.5rem;
    margin-left: 3.2rem;
  }
</style>
