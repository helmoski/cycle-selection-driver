// tslint:disable:no-unused-expression

import { expect } from 'chai';
import { Stream } from 'xstream';

import 'mocha';

import { ISelectionSource } from '../ISelectionSource';
import { selectionDriver, setDocument } from '../selectionDriver';

describe('selectionDriver', () => {
  it('returns an instance of ISelectionSource', () => {
    setDocument({} as any);
    const result = selectionDriver(new Stream());
    expect(result).to.exist;
    expect(result).to.have.property('selections');
  });
});
