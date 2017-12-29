export interface ISelection {
  readonly anchorNode: Node;
  readonly anchorOffset: number;
  readonly focusNode: Node;
  readonly focusOffset: number;
  readonly isCollapsed: boolean;
  readonly rangeCount: number;
  readonly type: string;

  toString(): string;
}

export default ISelection;
