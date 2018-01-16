import { b, br, button, div, label, MainDOMSource, p, textarea, VNode } from '@cycle/dom';
import { isNull } from 'lodash';
import xstream, { Stream } from 'xstream';

import { IRange, ISelection, ISelectionSource } from '../dist/cycle-selection-driver';

interface ISources {
  DOM: MainDOMSource;
  Selection: ISelectionSource;
}

interface ISinks {
  DOM: Stream<VNode>;
  Selection: Stream<Range[]>;
}

export default function app(sources: ISources): ISinks {
  const selection$ = sources.Selection
    .selections()
    .startWith(null as any);

  const select2ndWord$ = sources.DOM
    .select('#select-second-word')
    .events('click')
    .startWith(null as any)
    .map((): IRange => ({
      startNode: '#editable-paragraph',
      startOffset: 5,
      endNode: '#editable-paragraph',
      endOffset: 7,
    }));

  const event$ = xstream.combine(selection$, select2ndWord$);

  const vdom$: Stream<VNode> = event$
    .map(events => events[0])
    .map((selection: ISelection) => {
      return div([
        p(
          '#editable-paragraph',
          { attrs: { contenteditable: true } },
          [
            'This ',
            b('is'),
            ' an editable region.',
          ],
        ),
        label({ attrs: { for: 'current-selection' } } , 'Current Selection'),
        br(),
        textarea(
          '#current-selection',
          { attrs: { readonly: 'readonly' } },
          isNull(selection) ? 'Nothing selected' : selection.toString(),
        ),
        br(),
        button('#select-second-word', 'Select Second Word'),
      ]);
    });

  return {
    DOM: vdom$,
    Selection: select2ndWord$,
  };
}
