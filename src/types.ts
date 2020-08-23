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
  rootElement: HTMLElement;
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

export enum NodeType {
  CDataSectionNode = 4,
  CommentNode = 8,
  DocumentFragmentNode = 11,
  DocumentNode = 9,
  DocumentTypeNode = 10,
  ElementNode = 1,
  ProcessingInstructionNode = 7,
  TextNode = 3,
}
