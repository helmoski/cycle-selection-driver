import { expect } from 'chai';

import 'mocha';

import * as index from '../index';

describe('src/index', () => {
  it('exports the expected items', () => {
    expect(Object.keys(index)).to.deep.equal([
      'selectionDriver',
      'SelectionSource',
    ]);
  });
});
