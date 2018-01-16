import { Driver } from '@cycle/run';
import { Listener, Stream } from 'xstream';

import { IRange } from './IRange';
import { ISelectionSource } from './ISelectionSource';
import { modifySelection } from './modifySelection';
import { SelectionSource } from './SelectionSource';

let document: Document;

export function selectionDriver(sink$: Stream<IRange[]>): ISelectionSource {
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

export default selectionDriver;
