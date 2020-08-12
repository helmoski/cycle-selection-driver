import { adapt } from '@cycle/run/lib/adapt';
import { Stream } from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';

import { ISelectionSource } from './ISelectionSource';
import { selectionMatchesSelector } from './util';

export class SelectionSource implements ISelectionSource {
  private document: Document;

  constructor(document?: Document) {
    this.document = document === undefined ? /* istanbul ignore next */ window.document : document;
  }

  public selections(selector: string): Stream<Selection> {
    const selection$ = fromEvent(this.document, 'selectionchange')
      .map(() => this.document.getSelection() as Selection)
      .filter((selection) => selectionMatchesSelector(selection, selector));

    return adapt(selection$);
  }
}

export default SelectionSource;
