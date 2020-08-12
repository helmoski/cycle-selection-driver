import { Stream } from 'xstream';

export interface ISelectionSource {
  selections(selector: string): Stream<Selection>;
}

export default ISelectionSource;
