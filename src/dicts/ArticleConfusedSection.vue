<template>
  <div v-if="preparedItems.length" class="p-article-confused">
    <div class="p-article-confused__title">
      {{ i18n.CONFUSED_PARTS_TITLE }}
    </div>
    <div class="p-article-confused-items">
      <div v-for="item in preparedItems"
           :key="item.id"
           class="p-article-confused-item"
           @click="$router.push(item.link)">
        <div :class="$style.image"
             :style="{ 'background-image': getBackgroundUrl(item.imageSrc) }">
          <Icon v-if="!item.imageId || !item.imageSrc"
                :name="IconByDictionary[`${type}s`]"
                :class="$style.icon"/>
        </div>
        <div class="p-article-confused-item__name">
          {{ item.name }}
        </div>
        <div v-html="item.descr" class="p-article-confused-item__text"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getBackgroundUrl } from '@intterra/shared/util/generic';
import { IconByDictionary } from '@intterra/common/utils/DictionaryUtils';
import { Icon } from '@intterra/shared/ui/components/Icon';
import { CommonModals } from '../PopupContainer/PopupContainer.types';
import { ConfusedItem, Dictionary } from '@intterra/types';
import { useRouter } from 'vue-router';
import { useQueryFormatter } from '../../hooks';
import { getDictRouteParamNameByType } from '../../utils/DictionaryUtils';

export default defineComponent({
  name: 'ArticleConfusedSection',
  components: { Icon },
  props: {
    items: {
      type: Array as () => ConfusedItem[],
      required: true
    },
    type: {
      type: String as () => Dictionary,
      required: true,
      validator: (type: Dictionary) => Object.values(Dictionary).includes(type)
    }
  },
  setup (props) {
    const router = useRouter();
    const getQuery = useQueryFormatter();
    const isModal = computed(() => router.currentRoute.value.query.modal === CommonModals.DICTIONARY);

    function getPreparedLink (item: ConfusedItem) {
      if (isModal.value)
        return getQuery({ dictItemId: item.id });

      const paramName = getDictRouteParamNameByType(props.type);
      return {
        params: { [paramName]: item.id }
      };
    }

    const preparedItems = computed(() => {
      if (!props.items.length)
        return [];
      return props.items.map(item => ({
        ...item,
        link: getPreparedLink(item)
      }));
    });

    return {
      IconByDictionary,
      getBackgroundUrl,
      preparedItems
    };
  }
});
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
