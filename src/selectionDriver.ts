import { Driver } from '@cycle/run';
import { Stream } from 'xstream';

import { ISelection } from './ISelection';
import { ISelectionSource } from './ISelectionSource';
import { SelectionSource } from './SelectionSource';

let document: Document;

export function selectionDriver(): ISelectionSource {
  /* istanbul ignore if */
  if (document === undefined) {
    document = window.document;
  }

  return new SelectionSource(document);
}

export function setDocument(doc: Document) {
  document = doc;
}

export default selectionDriver;
