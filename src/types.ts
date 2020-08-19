import { Stream } from 'xstream';

export interface INodeWithOffset {
  node: Node;
  offset: number;
}

export interface ISelectionRange {
  anchorNode: Node;
  anchorOffset: number;
  endElement: HTMLElement;
  endOffset: number;
  focusNode: Node;
  focusOffset: number;
  startElement: HTMLElement;
  startOffset: number;
  text: string;
}

export interface ISelectionSource {
  selections(selector: string): Stream<ISelectionRange | null>;
}

export interface ITargetSelectionRange {
  endNode: Node | string;
  endOffset: number;
  startNode: Node | string;
  startOffset: number;
}
