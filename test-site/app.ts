import { b, br, button, div, label, MainDOMSource, p, textarea, VNode } from '@cycle/dom';
import { isNull } from 'lodash';
import xstream, { Stream } from 'xstream';

import { IRange, ISelectionSource } from '../dist/es6/index.js';

interface ISources {
  DOM: MainDOMSource;
  Selection: ISelectionSource;
}

interface ISinks {
  DOM: Stream<VNode>;
  Selection: Stream<IRange[] | IRange>;
}

export default function app(sources: ISources): ISinks {
  const selection$ = sources.Selection
    .selections();

  const select2ndWord$ = sources.DOM
    .select('#select-second-word')
    .events('click')
    .map((): IRange => ({
      startNode: '#editable-paragraph',
      startOffset: 5,
      endNode: '#editable-paragraph',
      endOffset: 7,
    }));

  const moveCaretToEnd$ = sources.DOM
    .select('#move-caret-to-end')
    .events('click')
    .map((): IRange => ({
      startNode: '#editable-paragraph',
      startOffset: 27,
      endNode: '#editable-paragraph',
      endOffset: 27,
    }));

  const newSelection$ = xstream.merge(select2ndWord$, moveCaretToEnd$);

  const event$ = xstream.merge(selection$, newSelection$);

  const vdom$: Stream<VNode> = event$
    .startWith(null as any)
    .filter(event => event instanceof Selection || event === null)
    .map((selection: Selection) => {
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
        label({ attrs: { for: 'current-selection' } }, 'Current Selection'),
        br(),
        textarea(
          '#current-selection',
          { attrs: { readonly: 'readonly' } },
          isNull(selection) ? 'Nothing selected' : selection.toString(),
        ),
        br(),
        button('#select-second-word', 'Select Second Word'),
        button('#move-caret-to-end', 'Move Caret to End'),
      ]);
    });

  return {
    DOM: vdom$,
    Selection: newSelection$,
  };
}
