import { extractLabel } from './utils';

describe('dicts/composition/utils.ts extractLabel', () => {
  it('should extract label', () => {
    const val1 = 'test1';
    const val2 = 'test2';
    const arr = [{ label: val1 }, {}, { label: val2 }, { label: null }];
    const val = { label: val1 };

    expect(extractLabel(arr)).toEqual(`(2) ${[val1, val2].join(', ')}`);
    expect(extractLabel(val)).toEqual(val1);
    expect(extractLabel(null)).toEqual('');
  });
});
