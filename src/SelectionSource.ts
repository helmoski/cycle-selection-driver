import { adapt } from '@cycle/run/lib/adapt';
import { isUndefined } from 'lodash';
import { Stream } from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';

import { ISelection } from './ISelection';
import { ISelectionSource } from './ISelectionSource';

export class SelectionSource implements ISelectionSource {
  private document: Document;

  constructor(document?: Document) {
    this.document = isUndefined(document) ? /* istanbul ignore next */ window.document : document;
  }

  public selections(): Stream<ISelection> {
    const selection$ = fromEvent(this.document, 'selectionchange')
      .map(() => this.document.getSelection() as ISelection);

    return adapt(selection$);
  }
}

export default SelectionSource;
