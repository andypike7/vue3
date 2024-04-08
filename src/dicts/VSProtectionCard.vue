<template>
  <div>
    <div v-for="item in items"
         :key="item.id"
         :data-event-click="item.id"
         class="p-dict-item m--no-image">
      <div class="p-dict-item__title">
        {{ item.name }}
      </div>
      <div v-if="Array.isArray(item.types)" class="p-dict-item-line">
        <div class="p-dict-item-line__label">
          {{ i18n.PROTECTION_TYPES_LABEL }}
        </div>
        <div class="p-dict-item-line__value">
          {{ getProtectionTypesLabel(item.types) }}
        </div>
      </div>
      <div v-if="item.substanceForm" class="p-dict-item-line">
        <div class="p-dict-item-line__label">
          {{ i18n.PREPARATIVE_FORM_LABEL }}
        </div>
        <div class="p-dict-item-line__value">
          {{ item.substanceForm }}
        </div>
      </div>
      <div v-if="item.substances && item.substances.length > 0" class="p-dict-item-line">
        <div class="p-dict-item-line__label">
          {{ i18n.PROTECTION_COMPOSITION_LABEL }}
        </div>
        <div class="p-dict-item-line-elements">
          <div v-for="substance in item.substances.slice(0, 3)"
               :key="substance.name"
               class="p-dict-item-line-element">
            <div class="p-dict-item-line-element__name">
              {{ substance.name }}
            </div>
            <div class="p-dict-item-line-element__value">
              {{ substance.amount }} {{ item.substanceUnit && item.substanceUnit.name || '' }}
            </div>
          </div>
          <div v-if="item.substances.length > 3" class="p-dict-item-line-element">
            <div class="p-dict-item-line-element__name">
              . . .
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useGraphQLEnums } from '@intterra/hooks';

export default {
  name: 'VSProtectionCard',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup () {
    const { protectionTypes } = useGraphQLEnums();
    const getProtectionTypesLabel = types => types
      .map(type => protectionTypes[type]?.label)
      .filter(Boolean)
      .join(', ');

    return {
      getProtectionTypesLabel
    };
  }
};
</script>
