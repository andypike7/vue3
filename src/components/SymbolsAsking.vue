<template>
  <div>SymbolsAskings: [{{ phrase }}]</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SymbolsAskings',

  data() {
    return {};
  },
  // props: {
  //   phrase: null,
  // },
  setup() {
    return {
      phrase: 'Hello?',
    };
  },
});
</script>
