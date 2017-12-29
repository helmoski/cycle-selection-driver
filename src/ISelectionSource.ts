import { Stream } from 'xstream';

import ISelection from './ISelection';

export interface ISelectionSource {
  selections(): Stream<ISelection>;
}

export default ISelectionSource;
