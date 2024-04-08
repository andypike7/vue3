<template>
  <div>
    <template v-for="(item, index) in items">
      <FilterSeedVSItem v-if="item"
                        :id="item.id"
                        :key="item.id"
                        :name="item.name"
                        :usage="item.usage"
                        :technology="item.technology"
                        :brand="item.brand"/>

      <FilterSeedVSItem v-else
                        :key="index"
                        isPlaceholder/>
    </template>
  </div>
</template>

<script lang="ts">
import { SeedCard } from '@intterra/types';
import { defineComponent } from 'vue';
import FilterSeedVSItem from './FilterSeedVSItem.vue';

/**
 * Кластер для VirtualScroller на страницу семян
 *
 * @author morlz
 */
export default defineComponent({
  name: 'FilterSeedVSCluster',

  components: {
    FilterSeedVSItem
  },

  props: {
    items: {
      type: Array as () => SeedCard[],
      required: true
    }
  }
});
</script>
