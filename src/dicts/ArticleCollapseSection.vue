<template>
  <div>
    <div class="p-article-text-group__label"
         @click="toggleText">
      {{ title }}
      <Icon :name="icon"/>
    </div>
    <div v-if="showText"
         v-html="text"
         class="p-article-text-inner"/>
  </div>
</template>

<script>
import { Icon } from '@intterra/shared/ui/components/Icon';

export default {
  name: 'ArticleCollapseSection',
  components: {
    Icon
  },
  emits: ['toggleText'],
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    showText: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleText () {
      this.$emit('toggleText');
    }
  }
};
</script>
