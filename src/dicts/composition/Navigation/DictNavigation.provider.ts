import { useCurrentRoute, useRouter } from '../../../../hooks/router';
import { computed, inject, InjectionKey, provide, Ref, ref } from 'vue';
import { RouteLocation } from 'vue-router';

const prevKey: InjectionKey<Ref<RouteLocation | undefined>> = Symbol('dict-navigation-prev');
const nextKey: InjectionKey<Ref<RouteLocation | undefined>> = Symbol('dict-navigation-next');

export function provideDictNavigation () {
  const prev = ref<RouteLocation>();
  const next = ref<RouteLocation>();

  provide(prevKey, prev);
  provide(nextKey, next);
}

export function useDictNavigation () {
  const prev = inject(prevKey);
  const next = inject(nextKey);

  if (!prev || !next)
    throw new Error('Используй provideDictNavigation()!');

  const setPrevRoute = (value?: RouteLocation) =>
    (prev.value = value);

  const setNextRoute = (value?: RouteLocation) =>
    (next.value = value);

  return {
    setPrevRoute,
    setNextRoute,
    prev,
    next
  };
}

export function useDictNavigationView (pages: string[]) {
  const { prev, next } = useDictNavigation();

  const router = useRouter();
  const currentRoute = useCurrentRoute();

  const handlePrev = () => prev.value && router.replace(prev.value);
  const handleNext = () => next.value && router.replace(next.value);

  const isPrevDisabled = computed(() => !prev.value);
  const isNextDisabled = computed(() => !next.value);

  const isVisible = computed(
    () =>
      pages.includes(currentRoute.value.name! as string)
      && [!isNextDisabled.value, !isPrevDisabled.value].some(Boolean)
  );

  return {
    handleNext,
    handlePrev,
    isVisible,
    isNextDisabled,
    isPrevDisabled
  };
}
