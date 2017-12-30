import { br, div, h1, label, MainDOMSource, p, textarea, VNode } from '@cycle/dom';
import { isNull } from 'lodash';
import xstream, { Stream } from 'xstream';

import { ISelection, ISelectionSource } from '../dist/cycle-selection-driver';

interface ISources {
  DOM: MainDOMSource;
  Selection: ISelectionSource;
}

interface ISinks {
  DOM: Stream<VNode>;
}

export default function app(sources: ISources): ISinks {
  const vdom$: Stream<VNode> = sources.Selection.selections()
    .startWith(null as any)
    .map((selection: ISelection) => {
      return div([
        h1('Test Page'),
        p('This page is used for functionally testing cycle-selection-driver.'),
        p(
          '#editable-paragraph',
          { attrs: { contenteditable: true } },
          'This is an editable region.',
        ),
        label({ attrs: { for: 'current-selection' } } , 'Current Selection'),
        br(),
        textarea(
          '#current-selection',
          { attrs: { readonly: 'readonly' } },
          isNull(selection) ? 'Nothing selected' : selection.toString(),
        ),
      ]);
    });

  return {
    DOM: vdom$,
  };
}
