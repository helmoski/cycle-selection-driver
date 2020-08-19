import { Listener, Stream } from 'xstream';

import { modifySelection as originalModifySelection } from './modifySelection';
import { SelectionSource } from './SelectionSource';
import {
  ISelectionSource,
  ITargetSelectionRange,
} from './types';

let document: Document;
let modifySelection = originalModifySelection;

export function selectionDriver(sink$: Stream<ITargetSelectionRange>): ISelectionSource {
  /* istanbul ignore if */
  if (document === undefined) {
    document = window.document;
  }

  sink$.addListener({
    next: (range: ITargetSelectionRange | null): void => {
      modifySelection(document, range);
    },
  } as Partial<Listener<ITargetSelectionRange>>);

  return new SelectionSource(document);
}

export function setDocument(doc: Document) {
  document = doc;
}

export function setModifySelection(
  newModifySelection: (document: Document, range: ITargetSelectionRange | null) => void,
) {
  modifySelection = newModifySelection;
}
