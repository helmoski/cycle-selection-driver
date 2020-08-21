import { Listener, Stream } from 'xstream';

import { modifySelection } from './modifySelection';
import { SelectionSource } from './SelectionSource';
import {
  ISelectionSource,
  ITargetSelectionRange,
} from './types';

export function selectionDriver(sink$: Stream<ITargetSelectionRange>): ISelectionSource {
  sink$.addListener({
    next: (range: ITargetSelectionRange | null): void => {
      modifySelection(document, range);
    },
  } as Partial<Listener<ITargetSelectionRange>>);

  return new SelectionSource(document);
}
