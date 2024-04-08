<template>
  <div v-if="letters.length > 1" class="dl">
    <div v-for="letter in letters"
         :key="letter"
         class="dl__item"
         :class="{ 'm--active': selected === letter }"
         @click="$emit('change', letter)">
      {{ letter.toLowerCase() }}
    </div>
  </div>
  <div v-else class="dl__empty"/>
</template>

<script>
export default {
  name: 'DictionaryLetters',
  emits: ['change'],
  props: {
    letters: {
      type: Array,
      required: true
    },
    selected: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
  .dl {
    padding: 1.4rem 0 2rem;
    display: flex;
    flex: 0 0 8.2rem;
    overflow: hidden;
    overflow-x: auto;

    &:before, &:after {
      content: '';
      padding: 0 1rem;
    }

    &__empty {
      height: 3rem;
      flex: 0 0 3rem;
    }

    &__item {
      @include text17Reg23Line;
      padding: 1rem;
      border-radius: 0.3rem;
      text-transform: capitalize;

      &.m--active {
        @include text25Med31Line;
        font-weight: 700;
        line-height: 2.5rem;
        color: $accent-color;
      }

      &:active {
        background: rgba($default-bg-hover-color, 0.5);
        color: $accent-color;
      }
    }
  }
</style>
