# cycle-selection-driver

A [Cycle.js](https://cycle.js.org) driver for interacting with the [Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection)

[![NPM version](https://img.shields.io/npm/v/cycle-selection-driver.svg)](https://www.npmjs.com/package/cycle-selection-driver)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Build Status](https://travis-ci.org/helmoski/cycle-selection-driver.svg?branch=master)](https://travis-ci.org/helmoski/cycle-selection-driver)
[![Coverage Status](https://coveralls.io/repos/github/helmoski/cycle-selection-driver/badge.svg?branch=master)](https://coveralls.io/github/helmoski/cycle-selection-driver?branch=master)

## Installation

```bash
npm install cycle-selection-driver --save
```

## Usage

```js
import { br, div, label, makeDOMDriver, p, textarea } from '@cycle/dom';
import { run } from '@cycle/run';
import { timeDriver } from '@cycle/time';
import { selectionDriver } from 'cycle-selection-driver';

function main (sources) {
  const vdom$ = sources.Selection.selections()
    .startWith(null)
    .map(selection => div([
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
    ]));

  // selects the 2nd word every 5 seconds
  const select2ndWord$ = sources.Time.periodic(5000)
    .map(() => ({
      startNode: '#editable-paragraph',
      startOffset: 5,
      endNode: '#editable-paragraph',
      endOffset: 7,
    }));

  return {
    DOM: vdom$,
    selection: select2ndWord$,
  };
}

run(main, {
  DOM: makeDOMDriver('.app'),
  Selection: selectionDriver,
  Time: timeDriver,
});
```

## API

### `selectionDriver(sink$)`

A Cycle.js driver that returns a `SelectionSource`.

### Arguments

`sink$`

A stream of `IRange` objects or `IRange` arrays. When the sink stream emits an event, the specified range(s) will be selected.

### `SelectionSource`

A Cycle.js source that provides access to user selections.

#### Methods

`.selections()`

Returns a stream of `Selection` objects. The current `Selection` will be emitted each time the [`selectionchange`](https://developer.mozilla.org/en-US/docs/Web/Events/selectionchange) event is fired.

### `Selection`

A [`Selection`](https://developer.mozilla.org/en-US/docs/Web/API/Selection) object representing the range of text selected by the user or the current position of the caret.

It is recommended that you avoid using the mutational methods of the `Selection` object because doing so would constitute as a side effect. To update the selection, use the driver `sink$`.

### `IRange`

An object representing a [`Range`](https://developer.mozilla.org/en-US/docs/Web/API/Range); albeit, with a slight difference: The offset in `IRange` represents characters; whereas, the offset in a `Range` can represent characters or nodes depending on the type of node.

### Properties

`startNode` - The node that the start of the range is in

`startOffset` - The character offset of the start of the range within the start node

`endNode` - The node that the end of the range is in

`endOffset` The character offset of the end of the range within the end node.

---

Find other Cycle.js libraries and resources at [Awesome Cycle.js](https://github.com/cyclejs-community/awesome-cyclejs)