<template>
  <div v-if="line.value" class="p-article-infobox-line">
    <div class="p-article-infobox__label">
      {{ line.label }}
    </div>
    <div ref="value"
         v-html="line.value"
         class="p-article-infobox__value"
         :class="{ 'm--big': bigValue && !expanded }"/>
    <div v-if="bigValue && !expanded"
         class="p-article-infobox__expand"
         @click="expanded = true">
      . . .
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoboxLine',
  props: {
    line: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.getValueHeight();
  },
  data: () => ({
    bigValue: false,
    expanded: false
  }),
  methods: {
    getValueHeight () {
      if (!this.$refs.value)
        return;
      const valueHeight = this.$refs.value.offsetHeight;
      if (valueHeight && valueHeight > 85)
        this.bigValue = true;
    }
  }
};
</script>
