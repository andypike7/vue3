import { waitForRefValue } from '@intterra/common/utils/CompositionUtils';
import { DefineComponent, ref } from 'vue';

export function useSecondTabActivator () {
  const wrapper = ref<DefineComponent>();

  const activateSecondTab = async () => {
    await waitForRefValue(wrapper);

    const activateTab = wrapper.value?.$slots?.default()?.[1].componentInstance?.setActive; // TODO fix
    if (typeof activateTab !== 'function') return;

    activateTab();
  };

  return {
    wrapper,
    activateSecondTab
  };
}
