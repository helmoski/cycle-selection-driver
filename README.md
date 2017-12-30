# cycle-selection-driver

A Cycle.js Driver for interacting with the [Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection)

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
