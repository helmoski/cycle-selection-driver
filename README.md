# cycle-selection-driver

A Cycle.js driver for interacting with the [Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection)

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
import { selectionDriver } from 'cycle-selection-driver';

function main (sources) {
  const vdom$ = sources.Selection.selections()
    .startWith(null)
    .map(selection => div([
      p('This is a regular paragraph with text you can select.'),
      p(
        { attrs: { contentEditable: true } },
        'This is an editable region with text you can select.'
      ),
      label(
        { attrs: { for: 'current-selection' } },
        'Current Selection'
      ),
      br(),
      textarea(
        '#current-selection',
        { attrs: { readonly: 'readonly' } },
        selection === null ? 'Nothing selected' : selection.toString(),
      )
    ]));

  return {
    DOM: vdom$,
  };
}

run(main, {
  DOM: makeDOMDriver('.app'),
  Selection: selectionDriver
});
```

## API

### `selectionDriver()`

A readonly Cycle.js driver that returns a `SelectionSource`

### `SelectionSource`

A Cycle.js source that provides access to user selections.

#### Methods

`.selections()`

Returns a stream of `Selection` objects. The current `Selection` will be emitted each time the [`selectionchange`](https://developer.mozilla.org/en-US/docs/Web/Events/selectionchange) event is fired.

### `Selection`

A [`Selection`](https://developer.mozilla.org/en-US/docs/Web/API/Selection) object representing the range of text selected by the user or the current position of the caret.

It is recommended that you avoid using the mutational methods of the `Selection` object because doing so would constitute as a side effect. Although the `selectionDriver` is currently readonly, it could be updated in the future to accept a sink that would allow mutations to the current selection.

