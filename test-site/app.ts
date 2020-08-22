import { b, br, button, div, li, MainDOMSource, p, pre, ul, VNode } from '@cycle/dom';
import xstream, { Stream } from 'xstream';

import {
  ISelectionRange,
  ISelectionSource,
  ITargetSelectionRange,
} from '../dist/cycle-selection-driver';

interface ISources {
  DOM: MainDOMSource;
  Selection: ISelectionSource;
}

interface ISinks {
  DOM: Stream<VNode>;
  Selection: Stream<ITargetSelectionRange[]>;
}

export default function app(sources: ISources): ISinks {
  const selection$ = sources.Selection
    .selections('#editable-paragraph');

  const select2ndWord$ = sources.DOM
    .select('#select-second-word')
    .events('click')
    .map((): ITargetSelectionRange => ({
      startNode: '#second-word',
      startOffset: 0,
      endNode: '#second-word',
      endOffset: 5,
    }));

  const selectEmptyLine$ = sources.DOM
    .select('#select-empty-line')
    .events('click')
    .map((): ITargetSelectionRange => ({
      startNode: '#empty-line',
      startOffset: 0,
      endNode: '#empty-line',
      endOffset: 0,
    }));

  const newSelection$ = xstream.merge(select2ndWord$, selectEmptyLine$);

  const vdom$: Stream<VNode> = selection$
    .startWith(null as any)
    .map((selectionRange: ISelectionRange) => {
      return div([
        div(
          '#editable-paragraph',
          { attrs: { contenteditable: true } },
          [
            p([
              'Lorem ',
              b(
                '#second-word',
                ['ipsum']
              ),
              ' dolor',
            ]),
            p(
              '#empty-line',
              [br()],
            ),
            p('Wombat'),
            ul([
              li('Lorem'),
              li([
                br(),
              ]),
              li('Ipsum'),
              ul([
                li('foo'),
                li('bar'),
              ]),
              li('Dolor'),
            ])
          ],
        ),
        br(),
        pre([
          'Current Selection:',
          br(),
          selectionRange === null ? 'N/A' : selectionRange.text,
        ]),
        pre([
          'Start Element:',
          br(),
          selectionRange === null ? 'N/A' : selectionRange.startElement.outerHTML,
        ]),
        pre([
          'Start Offset:',
          br(),
          selectionRange === null ? 'N/A' : selectionRange.startOffset,
        ]),
        pre([
          'End Element:',
          br(),
          selectionRange === null ? 'N/A' : selectionRange.endElement.outerHTML,
        ]),
        pre([
          'End Offset:',
          br(),
          selectionRange === null ? 'N/A' : selectionRange.endOffset,
        ]),
        br(),
        button('#select-second-word', 'Select Second Word'),
        button('#select-empty-line', 'Select Empty Line'),
      ]);
    });

  return {
    DOM: vdom$,
    Selection: newSelection$,
  };
}
