<template>
  <div class="p-article-text-elements">
    <div class="p-article-text-elements-wrap">
      <div class="p-article-text-elements__label">
        {{ label }}
      </div>
      <div v-if="tags" class="p-article-text-tags">
        <div class="p-article-text-tag m--high">
          {{ i18n.RESISTANCE_TYPE_HIGH_LABEL }}
        </div>
        <div class="p-article-text-tag m--middle">
          {{ i18n.RESISTANCE_TYPE_MIDDLE_LABEL }}
        </div>
        <div class="p-article-text-tag m--low">
          {{ i18n.RESISTANCE_TYPE_LOW_LABEL }}
        </div>
        <div class="p-article-text-tag m--tolerance">
          {{ i18n.RESISTANCE_TYPE_TOLERANCE_LABEL }}
        </div>
      </div>
    </div>
    <div class="p-article-text-elements-wrap">
      <div class="p-article-text-badges">
        <div v-for="badge in preparedBadges"
             :key="badge.name"
             class="p-article-text-badge"
             :class="{ [`m--${badge.type}`]: badge.type }">
          <div class="p-article-text-badge__label">
            {{ badge.name }}
          </div>
          <div v-if="badge.value" class="p-article-text-badge__value">
            {{ badge.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentBadges',
  props: {
    badges: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    tags: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    preparedBadges () {
      return this.badges.map(badge => {
        if (typeof badge === 'string')
          return { name: badge };
        return badge;
      });
    }
  }
};
</script>
