<template>
  <div v-if="col.value"
       class="p-article-text-col"
       :class="{ 'm--wide': col.wide, 'm--small': col.small, 'm--big': col.big }">
    <div class="p-article-text-col__label">
      {{ col.label }}
    </div>
    <div class="p-article-text-col__content" :class="{ ['m--tag-' + col.tag]: col.tag }">
      {{ col.value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentCol',
  props: {
    col: {
      type: Object,
      required: true
    }
  }
};
</script>
