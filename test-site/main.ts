import { makeDOMDriver } from '@cycle/dom';
import { run } from '@cycle/run';

import { selectionDriver } from '../src/index';
import app from './app';

export default function main() {
  run(app, {
    DOM: makeDOMDriver('body'),
    Selection: selectionDriver,
  });
}
