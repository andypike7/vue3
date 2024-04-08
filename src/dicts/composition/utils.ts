import { isEqual } from 'lodash';

interface Labeled {
  label: string
}

type MaybeLabeled = Maybe<{
  label?: Maybe<string>
} | MaybeLabeled[]>

export function extractLabel (
  value?: MaybeLabeled
): string {
  if (Array.isArray(value)) {
    const labels = value
      .filter(isLabeled)
      .map(el => el.label);

    const joined = labels.join(', ');

    return `(${labels.length}) ${joined}`;
  } else if (isLabeled(value))
    return value.label;
  else
    return '';
}

function isLabeled (value: any): value is Labeled {
  return value
    && typeof value === 'object'
    && 'label' in value
    && typeof value.label === 'string';
}

// TODO: [vue3] При переходе на vue 3 избавиться от этого
export function onlyWhenChanged<V, OV> (
  callback: (newValue: V, oldValue: OV) => unknown
) {
  return (newValue: V, oldValue: OV) =>
    !isEqual(newValue, oldValue) && callback(newValue, oldValue);
}
