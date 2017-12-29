import { isUndefined } from 'lodash';
import { Stream } from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';

import ISelection from './ISelection';
import ISelectionSource from './ISelectionSource';

export class SelectionSource implements ISelectionSource {
  private document: Document;

  constructor(document?: Document) {
    this.document = isUndefined(document) ? /* istanbul ignore next */ window.document : document;
  }

  public selections(): Stream<ISelection> {
    return fromEvent(this.document, 'selectionchange')
      .map(() => this.document.getSelection() as ISelection);
  }
}

export default SelectionSource;
