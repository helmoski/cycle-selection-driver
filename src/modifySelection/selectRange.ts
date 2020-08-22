export function selectRange(
  startNode: Node,
  startOffset: number,
  endNode: Node,
  endOffset: number,
): void {
  const selection = document.getSelection();
  const documentRange = document.createRange();
  documentRange.setStart(startNode, startOffset);
  documentRange.setEnd(endNode, endOffset);
  selection.addRange(documentRange);
}
