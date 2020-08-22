import { adapt } from '@cycle/run/lib/adapt';
import { Stream } from 'xstream';
import dropRepeats from 'xstream/extra/dropRepeats';
import fromEvent from 'xstream/extra/fromEvent';

import {
  ISelectionRange,
  ISelectionSource,
} from '../types';
import { getSelectionRange } from './getSelectionRange';

export class SelectionSource implements ISelectionSource {
  public selections(selector: string): Stream<ISelectionRange | null> {
    const selection$ = fromEvent(document, 'selectionchange')
      .map(() => document.getSelection() as Selection)
      .map(selection => getSelectionRange(selection, selector))
      .compose(dropRepeats((x, y) => x === null && y === null));

    return adapt(selection$);
  }
}
