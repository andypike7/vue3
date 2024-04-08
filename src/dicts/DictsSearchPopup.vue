<template>
  <BaseModal :isShow="showPopup"
             isFullScreen
             @close="close">
    <div class="dsm-top">
      <div class="dsm-top-back" @click="close">
        <Icon :name="IconName.ArrowLeft16"/>
      </div>
      <div class="dsm-top-search">
        <Icon :name="IconName.Search16" class="dsm-top-search__icon"/>
        <input ref="searchInput"
               type="text"
               class="dsm-top-search__input"
               :placeholder="i18n.SEARCH_IN_DICTS_PLACEHOLDER"
               :value="inputString"
               @input="setSearchString($event.target.value)">
      </div>
      <div class="dsm-top-cross"
           :class="{ 'm--appeared': !!searchString }"
           @click="clear">
        <Icon :name="IconName.Clear16" class="dsm-top-search__clear"/>
      </div>
    </div>
    <div class="dsm-body">
      <template v-if="searchString.length > 2">
        <div v-if="isEmpty" class="dsm-body-line">
          <div class="dsm-body-line__group">
            {{ getDictTitleByType(currentDict) }}
          </div>
          <div class="dsm-body-line__name">
            {{ i18n.SEARCH_NO_RESULTS_TEXT }}
          </div>
        </div>
        <template v-for="group in dictsSearchGroups">
          <div v-for="(dict, index) in group.items"
               :key="dict.id"
               class="dsm-body-line"
               :class="{ 'm--firstOfType': index === 0 }"
               @click="goToDictPage(dict.id, group.dictionary)">
            <div class="dsm-body-line__group">
              {{ index === 0 ? getDictTitleByType(group.dictionary) : '' }}
            </div>

            <div class="dsm-body-line__name">
              <div v-text="dict.beforePart"/>
              <div v-text="dict.searchPart"
                   class="dsm-body-line__name-match"/>
              <div v-text="dict.afterPart"/>
            </div>
          </div>
        </template>
      </template>
      <div v-else class="dsm-body-line">
        <div class="dsm-body-line__group"/>
        <div class="dsm-body-line__name">
          {{ i18n.LETTERS_TO_ENTER_TEXT }} {{ 3 - searchString.length }}
          {{ searchString.length === 2 ? i18n.LETTERS_SINGLE_FORM : i18n.LETTERS_PLURAL_FORM }}
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { throttle } from 'lodash';
import { Dictionary, DictSearchGroup } from '@intterra/types';
import {
  getDictDetailRouteNameByType,
  getDictListRouteNameByType,
  getDictRouteParamNameByType,
  getDictTitleByType
} from '../../utils/DictionaryUtils';
import { Analytics } from '@intterra/skyscout/services/analytics';
import { injectNetwork, useDataSource, useQueryFormatter, useRouteQuery } from '../../hooks';
import { CommonModals } from '../PopupContainer/PopupContainer.types';

import { BaseModal } from '@intterra/shared/ui/components/BaseModal';
import { Icon } from '@intterra/shared/ui/components/Icon';

export default defineComponent({
  name: 'DictsSearchPopup',
  components: { BaseModal, Icon },
  emits: ['close'],
  props: {
    currentDict: {
      type: String as PropType<Maybe<Dictionary>>,
      default: null
    },
    showPopup: {
      type: Boolean,
      required: true
    }
  },
  setup (props, { emit }) {
    const query = useRouteQuery();
    const router = useRouter();
    const getQuery = useQueryFormatter();
    const searchInput = ref<HTMLInputElement>();
    const isLoading = ref(false);
    const searchStarted = ref(false);
    const searchString = ref('');
    const inputString = ref('');
    const dictsSearchGroups = ref<DictSearchGroup[]>([]);
    const isModal = computed(() => query.value.modal === CommonModals.DICTIONARY);
    const allGroupsAreEmpty = computed(
      () => dictsSearchGroups.value
        .every(group => (group.items?.length ?? 0) === 0)
    );
    const isCurrentDictGroupEmpty = computed(() => {
      if (!props.currentDict)
        return false;
      return dictsSearchGroups.value[0]?.items?.length === 0;
    });
    const isEmpty = computed(
      () => !isLoading.value
        && (allGroupsAreEmpty.value || isCurrentDictGroupEmpty.value)
    );

    function clear () {
      inputString.value = '';
      searchString.value = '';
      dictsSearchGroups.value = [];
    }

    function close () {
      searchStarted.value = false;
      clear();
      emit('close');
    }
    const { offlineModeIsOn } = injectNetwork();
    const { dataSource } = useDataSource();

    watchEffect(() => {
      if (!props.showPopup)
        return;

      searchInput.value?.focus();

      if (offlineModeIsOn.value)
        dataSource.populateDictionarySearchCache();
    }, { flush: 'post' });

    async function updateDictSearchGroups () {
      isLoading.value = true;
      dictsSearchGroups.value = await dataSource.getDictSearchGroups({
        searchString: searchString.value,
        isModal: isModal.value,
        currentDict: props.currentDict
      });
      isLoading.value = false;
    }

    const getDictSearchGroups = throttle(updateDictSearchGroups, 500);

    function setSearchString (value: string) {
      inputString.value = value;
      const newSearchString = value.toLowerCase();
      if (searchString.value === newSearchString)
        return;
      searchString.value = newSearchString;
      if (searchString.value.length < 3)
        return;

      getDictSearchGroups();

      if (!searchStarted.value) {
        Analytics.searchInDictionaries(props.currentDict);
        searchStarted.value = true;
      }
    }

    function getPageRoute (id: string, dictionary: Dictionary) {
      if (isModal.value) {
        const dictPage = getDictListRouteNameByType(dictionary);
        return getQuery({ dictPage, dictItemId: id });
      } else {
        const name = getDictDetailRouteNameByType(dictionary);
        const paramName = getDictRouteParamNameByType(dictionary);
        return {
          name,
          params: { [paramName]: id }
        };
      }
    }

    function goToDictPage (id: Maybe<string>, dictionary: Dictionary) {
      const newRoute = getPageRoute(id!, dictionary);
      close();
      router.push(newRoute);
    }

    return {
      searchInput,
      inputString,
      searchString,
      isEmpty,
      dictsSearchGroups,
      clear,
      close,
      setSearchString,
      goToDictPage,
      getDictTitleByType
    };
  }
});
</script>

<style lang="scss" scoped>
  .dsm {
    &-top {
      display: flex;
      align-items: center;
      height: 10rem;
      border-bottom: var(--border-size) solid rgba($default-text-color, 0.1); // TODO
      overflow: hidden;

      &-back {
        font-size: 1.7rem;
        height: 10rem;
        flex: 0 0 10rem;
        line-height: 10rem;
        text-align: center;
        color: $dark-gray70-color;

        &:active {
          background: $default-bg-hover-color;
          color: $dark-gray70-color;
        }
      }

      &-search {
        flex: 1 1 100%;
        display: flex;
        align-items: center;

        &__icon {
          flex: 0 0 14rem;
          padding-right: 4rem;
          text-align: right;
          font-size: 1.7rem;
          color: $gray-A7-color;
        }

        &__clear {
          color: $gray-A7-color;
          font-size: 3.2rem;
          padding: 1.3rem;
          height: 5rem;
        }

        &__input {
          width: 100%;
          -webkit-appearance: none;
          border: 0;
          padding: 0;
          font-size: 4.8rem;
          font-weight: 700;
          text-transform: lowercase;
          outline: none;
        }
      }

      &-cross {
        height: 10rem;
        flex: 0 0 10rem;
        display: flex;
        align-items: center;
        line-height: 10rem;
        text-align: center;
        transform: translate3d(10rem, 0, 0);
        opacity: 0;
        transition: transform .2s, opacity .2s;

        &.m--appeared {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
      }

      &:active:after {
        background: $gray-A7-color;
      }
    }

    &-body {
      max-height: calc(100% - 10rem);
      overflow: hidden;
      overflow-y: auto;
      padding-top: 1rem;
      padding-bottom: 5rem;

      &-line {
        display: flex;
        align-items: flex-start;
        margin-top: 1.2rem;
        text-decoration: none;

        &:first-child,
        &.m--firstOfType {
          margin-top: 3.2rem;
        }

        &__group {
          @include text13Reg19Line;
          text-transform: uppercase;
          flex: 0 0 24rem;
          text-align: right;
          padding-right: 4rem;
          color: rgba($default-text-color, 0.5);
        }

        &__name {
          @include text15Reg21Line;
          display: flex;
          white-space: pre;
          &-match {
            font-weight: 700;
          }
        }
      }
    }
  }
</style>
