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

See `test-site` directory for usage example.

## API

### `selectionDriver(sink$)`

A Cycle.js driver that returns a `SelectionSource`.

#### Arguments

`sink$`

A stream of `ITargetSelectionRange` objects. When the sink stream emits an event, the specified range will be selected.

#### Returns

`SelectionSource`

### `SelectionSource`

A Cycle.js source that provides access to user selections.

#### Methods

`.selections(selector)`

Returns a stream of `ISelectionRange` objects which represent the current user selection. The stream will emit each time the [`selectionchange`](https://developer.mozilla.org/en-US/docs/Web/Events/selectionchange) event is fired and the selection matches the specified selector. `null` will be emitted when the selection changes to no longer match the specified selector.

##### Arguments

`selector`

A string that allows you to filter the selections to a specific element and its descendants. Selections that occur in an element that doesn't match the selector will be ignored. The selector should be a valid css selector string.

##### Returns

`ISelectionRange` for selection change events that match the specified selector; else, `null`.

### `ISelectionRange`

A range of text selected by the user or the current position of the caret.

#### Properties

* `anchorNode` - The node where the user began their selection
* `anchorOffset` - Character offset relative to the `anchorNode` where the user began their selection
* `endElement` - Element where the selection ends (matches or comes after the `startElement`)
* `endOffset` - Character offset relative to the `endElement` where the selection ends (matches or comes after the `startOffset`)
* `focusNode` - The node where the user finished their selection
* `focusOffset` - Character offset relative to the `focusNode` where the user finished their selection
* `rootElement` - Root element for the selection based on the specified selector
* `startElement` - Element where the selection starts (matches or comes before the `endElement`)
* `startOffset` - Character offset relative to the `startElement` where the selection starts (matches or comes before the `endOffset`)
* `text` - Selected text

### `ITargetSelectionRange`

An object representing a range of text to be selected.

#### Properties

* `endNode` - Node or css selector matching the node where the selection should end
* `endOffset` - Character offset of the end of the selection range relative to the `endNode`.
* `startNode` - Node or css selector matching the node where the selection should start
* `startOffset` - Character offset of the start of the selection range relative to the `startNode`
---

Find other Cycle.js libraries and resources at [Awesome Cycle.js](https://github.com/cyclejs-community/awesome-cyclejs)