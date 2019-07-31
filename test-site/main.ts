import { makeDOMDriver } from '@cycle/dom';
import { run } from '@cycle/run';

import { selectionDriver } from '../dist/es6/index.js';
import app from './app';

export default function main() {
  run(app, {
    DOM: makeDOMDriver('body'),
    Selection: selectionDriver,
  });
}
