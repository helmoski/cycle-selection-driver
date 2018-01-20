import { Driver } from '@cycle/run';
import { Listener, Stream } from 'xstream';

import { IRange } from './IRange';
import { ISelectionSource } from './ISelectionSource';
import { modifySelection as originalModifySelection } from './modifySelection';
import { SelectionSource } from './SelectionSource';

let document: Document;
let modifySelection = originalModifySelection;

export function selectionDriver(sink$: Stream<IRange[] | IRange>): ISelectionSource {
  /* istanbul ignore if */
  if (document === undefined) {
    document = window.document;
  }

  sink$.addListener({
    next: (event: IRange[] | IRange): void => {
      const ranges = event instanceof Array ? event : [event];
      modifySelection(document, ranges);
    },
  } as Partial<Listener<IRange[]>>);

  return new SelectionSource(document);
}

export function setDocument(doc: Document) {
  document = doc;
}

export function setModifySelection(
  newModifySelection: (document: Document, ranges: IRange[]) => void,
) {
  modifySelection = newModifySelection;
}

export default selectionDriver;
