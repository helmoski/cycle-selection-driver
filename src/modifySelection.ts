import { ITargetSelectionRange } from './types';
import { getTargetLeafNodeWithOffset } from './util';

export function modifySelection(
  document: Document,
  range: ITargetSelectionRange | null,
): void {
  const selection = document.getSelection();
  selection.removeAllRanges();
  if (range) {
    const startRootNode = (range.startNode.hasOwnProperty('nodeType') ?
      range.startNode :
      document.querySelector(range.startNode as string)) as Node;
    const endRootNode = (range.endNode.hasOwnProperty('nodeType') ?
      range.endNode :
      document.querySelector(range.endNode as string)) as Node;

    if (startRootNode === null) {
      throw new Error(`${range.startNode} does not exist`);
    }

    if (endRootNode === null) {
      throw new Error(`${range.endNode} does not exist`);
    }

    const startLeafNodeWithOffset = getTargetLeafNodeWithOffset(
      startRootNode,
      range.startOffset,
    );
    const endLeafNodeWithOffset = getTargetLeafNodeWithOffset(
      endRootNode,
      range.endOffset,
    );

    if (!startLeafNodeWithOffset) {
      throw new Error('Start offset out of bounds');
    }
    if (!endLeafNodeWithOffset) {
      throw new Error('End offset out of bounds');
    }

    const startNode = startLeafNodeWithOffset.node;
    const startOffset = startLeafNodeWithOffset.offset;
    const endNode = endLeafNodeWithOffset.node;
    const endOffset = endLeafNodeWithOffset.offset;
    const documentRange = document.createRange();
    documentRange.setStart(startNode, startOffset);
    documentRange.setEnd(endNode, endOffset);
    selection.addRange(documentRange);
  }
}
