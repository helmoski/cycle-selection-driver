import { adapt } from '@cycle/run/lib/adapt';
import { isUndefined } from 'lodash';

import ISelectionSource from './ISelectionSource';
import SelectionSource from './SelectionSource';

let document: Document;

export function selectionDriver(): ISelectionSource {
  /* istanbul ignore if */
  if (isUndefined(document)) {
    document = window.document;
  }

  const source = new SelectionSource(document);

  return adapt(source);
}

export function setDocument(doc: Document) {
  document = doc;
}

export default selectionDriver;
