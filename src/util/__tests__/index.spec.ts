import { expect } from 'chai';

import 'mocha';

import * as index from '../index';

describe('src/util/index', () => {
  it('exports the expected items', () => {
    expect(Object.keys(index)).to.deep.equal([
      'getDescendantTextNodes',
      'getTargetTextNode',
    ]);
  });
});
