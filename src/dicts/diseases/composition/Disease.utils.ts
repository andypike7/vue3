import { i18n } from '@intterra/i18n';
import { DiseaseTabs } from './Disease.types';
import { useDataSource } from '../../../../hooks/DataSource.hook';

export function getTitleAndLabelByName (name: DiseaseTabs): string | never {
  switch (name) {
    case DiseaseTabs.CROP:
      return i18n.FILTER_LABEL_CROP;
    case DiseaseTabs.CROP_PART:
      return i18n.INFECTED_PART_LABEL;
    case DiseaseTabs.DAMAGE_CHARACTER:
      return i18n.CROP_DAMAGE_CHARACTER_LABEL;
    case DiseaseTabs.DAMAGE_PROPAGATION:
      return i18n.CROP_DAMAGE_PROPAGATIONS_LABEL;
    case DiseaseTabs.DAMAGE_TYPE:
      return i18n.CROP_DAMAGE_TYPE_LABEL;
    default:
      throw new Error(`Unknown name "${name}"!`);
  }
}

export function getItemsLoaderByTabName (name: DiseaseTabs) {
  const { dataSource } = useDataSource();
  switch (name) {
    case DiseaseTabs.CROP:
      return dataSource.getDiseaseFilterCrops;
    case DiseaseTabs.CROP_PART:
      return dataSource.getDiseaseFilterCropParts;
    case DiseaseTabs.DAMAGE_CHARACTER:
      return dataSource.getDiseaseFilterDamageCharacters;
    case DiseaseTabs.DAMAGE_PROPAGATION:
      return dataSource.getDiseaseFilterDamagePropagations;
    case DiseaseTabs.DAMAGE_TYPE:
      return dataSource.getDiseaseFilterDamageTypes;
    default:
      throw new Error(`Unknown name "${name}"!`);
  }
}
