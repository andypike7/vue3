import { DiseasesFiltersEnabled } from '@intterra/graphql';

export type AvailableStoreProp =
  | 'crop'
  | 'cropPart'
  | 'cropDamageCharacter'
  | 'cropDamageType'
  | 'cropDamagePropagation'

export type AvailableFilterProp =
  | 'cropId'
  | 'cropPartId'
  | 'cropDamageCharacterId'
  | 'cropDamageTypeId'
  | 'cropDamagePropagationId'

export enum DiseaseTabs {
  CROP = 'DiseaseCrop',
  CROP_PART = 'DiseaseCropPart',
  DAMAGE_CHARACTER = 'DiseaseDamageCharacter',
  DAMAGE_PROPAGATION = 'DiseaseDamagePropagation',
  DAMAGE_TYPE = 'DiseaseDamageType',
}

export const storePropByName: Record<DiseaseTabs, AvailableStoreProp> = {
  [DiseaseTabs.CROP]: 'crop',
  [DiseaseTabs.CROP_PART]: 'cropPart',
  [DiseaseTabs.DAMAGE_CHARACTER]: 'cropDamageCharacter',
  [DiseaseTabs.DAMAGE_PROPAGATION]: 'cropDamagePropagation',
  [DiseaseTabs.DAMAGE_TYPE]: 'cropDamageType'
};

export const filterPropByName: Record<DiseaseTabs, AvailableFilterProp> = {
  [DiseaseTabs.CROP]: 'cropId',
  [DiseaseTabs.CROP_PART]: 'cropPartId',
  [DiseaseTabs.DAMAGE_CHARACTER]: 'cropDamageCharacterId',
  [DiseaseTabs.DAMAGE_PROPAGATION]: 'cropDamagePropagationId',
  [DiseaseTabs.DAMAGE_TYPE]: 'cropDamageTypeId'
};

export const isDisabledByName: Record<DiseaseTabs, Maybe<keyof DiseasesFiltersEnabled>> = {
  [DiseaseTabs.CROP]: null,
  [DiseaseTabs.CROP_PART]: 'cropPart',
  [DiseaseTabs.DAMAGE_CHARACTER]: 'cropDamageCharacter',
  [DiseaseTabs.DAMAGE_PROPAGATION]: 'cropDamagePropagation',
  [DiseaseTabs.DAMAGE_TYPE]: 'cropDamageType'
};
