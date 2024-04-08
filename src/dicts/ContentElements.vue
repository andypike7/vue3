<template>
  <div v-if="elements.length" class="p-article-text-elements">
    <div class="p-article-text-elements-wrap">
      <div class="p-article-text-elements__label">
        {{ label }}
      </div>
    </div>
    <div class="p-article-text-elements-wrap">
      <div v-for="element in filteredElements"
           :key="element.label"
           class="p-article-text-element">
        <div class="p-article-text-element__label">
          {{ element.label }}
        </div>
        <div class="p-article-text-element__amount">
          {{ element.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentElements',
  props: {
    label: {
      type: String,
      required: true
    },
    elements: {
      type: Array,
      required: true
    }
  },
  computed: {
    filteredElements () {
      return this.elements.filter(element => !!element.value);
    }
  }
};
</script>
