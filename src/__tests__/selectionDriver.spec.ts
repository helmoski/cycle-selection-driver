import xstream, { Stream } from 'xstream';

import { modifySelection } from '../modifySelection';
import { selectionDriver } from '../selectionDriver';
import { ITargetSelectionRange } from '../types';

jest.mock('../modifySelection');
jest.mock('../SelectionSource');

describe('selectionDriver', () => {
  const doc = {} as any;

  it('returns an instance of ISelectionSource', () => {
    const sink$ = new Stream<ITargetSelectionRange>();
    const result = selectionDriver(sink$);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('selections');
  });

  it('modifies the selection when an event with a target range is emitted', () => {
    const range = {} as ITargetSelectionRange;
    const sink$ = xstream.of(range);
    selectionDriver(sink$);
    expect(modifySelection).toHaveBeenCalledWith(document, range);
  });
});
