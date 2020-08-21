import { ITargetSelectionRange } from '../types';
import { clearCurrentSelection } from './clearCurrentSelection';
import { getNodeBasedOnRangeNode } from './getNodeBasedOnRangeNode';
import { getTargetLeafNodeWithOffset } from './getTargetLeafNodeWithOffset';
import { selectRange } from './selectRange';

export function modifySelection(range: ITargetSelectionRange | null): void {
  clearCurrentSelection();
  if (range) {
    const startRootNode = getNodeBasedOnRangeNode(range.startNode);
    const endRootNode = getNodeBasedOnRangeNode(range.endNode);

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

    selectRange(
      startNode,
      startOffset,
      endNode,
      endOffset,
    );
  }
}
