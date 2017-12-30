import { makeDOMDriver } from '@cycle/dom';
import { run } from '@cycle/run';

import { selectionDriver } from '../dist/cycle-selection-driver.js';
import app from './app';

export default function main() {
  run(app, {
    DOM: makeDOMDriver('body'),
    Selection: selectionDriver,
  });
}
