import { Stream } from 'xstream';

export interface ISelectionSource {
  selections(selector: string): Stream<Selection | null>;
}

export default ISelectionSource;
