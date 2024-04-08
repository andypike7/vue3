<template>
  <div>
    <div v-for="item in items"
         :key="item.id"
         :data-event-click="item.id"
         class="p-dict-item m--no-image">
      <div class="p-dict-item__title">
        {{ item.name }}
      </div>
      <div v-if="item.originator" class="p-dict-item-line">
        <div class="p-dict-item-line__label">
          {{ i18n.SEED_ORIGINATOR_LABEL }}
        </div>
        <div class="p-dict-item-line__value">
          {{ item.originator }}
        </div>
      </div>
      <div v-if="item.cropName" class="p-dict-item-line">
        <div class="p-dict-item-line__label">
          {{ i18n.BRANCH_CROP_LABEL }}
        </div>
        <div class="p-dict-item-line__value">
          {{ item.cropName }}
        </div>
      </div>
      <div v-if="Number.isInteger(item.cultivationCategory)" class="p-dict-item-line">
        <div class="p-dict-item-line__label">
          {{ i18n.SEED_CATEGORY_LABEL }}
        </div>
        <div v-text="getSeedCultivationCategoryLabel(item.cultivationCategory)"
             class="p-dict-item-line__value"/>
      </div>
      <div v-if="Number.isInteger(item.usage)" class="p-dict-item-line">
        <div class="p-dict-item-line__label">
          {{ i18n.SEED_USAGE_LABEL }}
        </div>
        <div v-text="getSeedUsageLabel(item.usage)"
             class="p-dict-item-line__value"/>
      </div>
    </div>
  </div>
</template>

<script>
import { useGraphQLEnums } from '@intterra/hooks';

export default {
  name: 'VSSeedCard',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup () {
    const { seedCultivationCategories, seedUsages } = useGraphQLEnums();
    const getSeedCultivationCategoryLabel = category => seedCultivationCategories[category]?.label || '';
    const getSeedUsageLabel = usage => seedUsages[usage]?.label || '';

    return { getSeedCultivationCategoryLabel, getSeedUsageLabel };
  }
};
</script>
