import { INodeWithOffset } from '../types';
import { isElementNode } from '../util';
import { getLeafNodes } from './getLeafNodes';

export function getTargetLeafNodeWithOffset(
  rootNode: Node,
  offset: number,
): INodeWithOffset | null {
  const leafNodes = getLeafNodes(rootNode);
  let targetLeafNode = null as INodeWithOffset | null;
  let remainingOffset = offset;
  let currentIndex = 0;
  while (targetLeafNode === null && currentIndex < leafNodes.length) {
    const leafNode = leafNodes[currentIndex];
    if (isElementNode(leafNode) as boolean) {
      remainingOffset -= 1;
      if (remainingOffset <= 0) {
        targetLeafNode = {
          node: leafNode,
          offset: 0,
        };
      }
    } else {
      if (remainingOffset - leafNode.length <= 0) {
        targetLeafNode = {
          node: leafNode,
          offset: remainingOffset,
        };
      }
      remainingOffset -= leafNode.length;
    }
    currentIndex += 1;
  }
  return targetLeafNode;
}
