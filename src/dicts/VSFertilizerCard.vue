<template>
  <div>
    <div v-for="item in items"
         :key="item.id"
         :data-event-click="item.id"
         class="p-dict-item m--no-image">
      <div class="p-dict-item__title">
        {{ item.name }}
      </div>
      <div v-if="item.type" class="p-dict-item-line">
        <div class="p-dict-item-line__label">
          {{ i18n.FERTILIZER_TYPE_LABEL }}
        </div>
        <div class="p-dict-item-line__value">
          {{ item.type.name }}
        </div>
      </div>
      <div v-if="item.form" class="p-dict-item-line">
        <div class="p-dict-item-line__label">
          {{ i18n.PREPARATIVE_FORM_LABEL }}
        </div>
        <div class="p-dict-item-line__value">
          {{ item.form.name }}
        </div>
      </div>
      <div v-if="item.nutritions.length > 0" class="p-dict-item-line">
        <div class="p-dict-item-line__label">
          {{ i18n.NUTRITION_ELEMENTS_LABEL }}
        </div>
        <div class="p-dict-item-line-elements">
          <div v-for="nutrition in item.nutritions.slice(0, 10)"
               :key="nutrition"
               class="p-dict-item-line-element">
            <div v-text="getNutritionLabel(nutrition)"
                 class="p-dict-item-line-element__name"/>
          </div>
          <div v-if="item.nutritions.length > 10" class="p-dict-item-line-element">
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
  name: 'VSFertilizerCard',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup () {
    const { nutritions } = useGraphQLEnums();
    const getNutritionLabel = nutrition => nutritions[nutrition]?.label || '';

    return { getNutritionLabel };
  }
};
</script>
