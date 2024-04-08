import { ButtonView } from '@intterra/shared/ui/components/BaseButton';
import { i18n } from '@intterra/i18n';
import { IconName } from '@intterra/shared/types/icon';
import { DescriptionSizes } from '@intterra/shared/ui/components/ErrorInfoStub';
import { computed } from 'vue';
import { injectNetwork, injectOfflineData } from '../../../hooks';
import { useSyncSettingsNavigation } from '../../../hooks/syncSettings/SyncSettingsNavigation';

export function useNotSyncedDictsStub () {
  const { isOnline } = injectNetwork();
  const { dictsHashes } = injectOfflineData();

  const isDictsSynced = computed(() => isOnline.value || !!dictsHashes.value);

  const stubProps = {
    icon: IconName.ReportError48,
    caption: i18n.NOT_SYNCED_DICTS_TITLE,
    description: i18n.NOT_SYNCED_DICTS_DESC,
    hideButton: false,
    descriptionSize: DescriptionSizes.SHORT,
    buttonCaption: i18n.NOTIFY_SYNC_SETTINGS_LINK_TEXT,
    buttonStyle: ButtonView.PRIMARY
  };

  const { openSyncSettings } = useSyncSettingsNavigation();

  return {
    isDictsSynced,
    stubProps,
    clickStub: openSyncSettings
  };
}
