import { Stream } from 'xstream';

export interface ISelectionSource {
  selections(): Stream<Selection>;
}

export default ISelectionSource;
