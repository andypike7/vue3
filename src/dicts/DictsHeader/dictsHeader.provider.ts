import { computed, InjectionKey, onUnmounted, provide, Ref, ref, watch } from 'vue';
import { i18n } from '@intterra/i18n';
import { createInjector } from '@intterra/shared/ui/util/composition';
import { useLifecycleStatus } from '@intterra/shared/ui/hooks/LifecycleStatus';

type DictsHeaderState = ReturnType<typeof provideDictsHeaderState>;

const stateKey: InjectionKey<DictsHeaderState> = Symbol('dicts-header-state');

export const injectDictsHeaderState = createInjector(stateKey);

export function provideDictsHeaderState () {
  type Names = {
    title: string;
    subtitle: string | null;
  }

  const defaultNames = [{ title: i18n.DICTS_TITLE } as Names];
  const namesStack = ref(defaultNames);
  const names = computed(() => namesStack.value[namesStack.value.length - 1]);
  const withBackButton = computed(() => namesStack.value.length > 1);

  function pushNames (title: string, subtitle?: string | null): void {
    namesStack.value.push({
      title: title,
      subtitle: subtitle ?? null
    });
  }

  function popNames (): void {
    if (namesStack.value.length > 1)
      namesStack.value.pop();
  }

  function resetNames (): void {
    namesStack.value = [...defaultNames];
  }

  const state = {
    withBackButton,
    names,
    pushNames,
    popNames,
    resetNames
  };
  provide(stateKey, state);
  return state;
}

export function useDictsHeader (
  title: Readonly<Ref<string | undefined | null>>,
  subtitle: Readonly<Ref<string | undefined | null>> = computed(() => null)
): void {
  const { pushNames, popNames } = injectDictsHeaderState();
  const { isMounted } = useLifecycleStatus();
  onUnmounted(() => isMounted.value && popNames());

  watch([title, subtitle, isMounted], (
    [newTitle, newSubtitle, isMounted],
    [oldtitle]
  ) => {
    if (!isMounted || !newTitle)
      return;

    if (isMounted && oldtitle)
      popNames();
    pushNames(newTitle, newSubtitle);
  });
}
