// tslint:disable:no-unused-expression

import { expect } from 'chai';

import 'mocha';

import ISelectionSource from '../ISelectionSource';
import { selectionDriver, setDocument } from '../selectionDriver';

describe('selectionDriver', () => {
  it('returns an instance of ISelectionSource', () => {
    setDocument({} as any);
    const result = selectionDriver();
    expect(result).to.exist;
    expect(result).to.have.property('selections');
  });
});
