import { INodeWithOffset } from '../types';
import { getDescendantTextNodes as originalGetDescendantTextNodes } from './getDescendantTextNodes';
import { getLeafNodes } from './getLeafNodes';
import { isElementNode } from './isElementNode';

let getDescendantTextNodes = originalGetDescendantTextNodes;

export function getTargetLeafNodeWithOffset(rootNode: Node, offset: number): INodeWithOffset | null {
  const leafNodes = getLeafNodes(rootNode);
  let targetLeafNode = null as INodeWithOffset | null;
  let remainingOffset = offset;
  let currentIndex = 0;
  while (!targetLeafNode && currentIndex < leafNodes.length) {
    const leafNode = leafNodes[currentIndex];
    if (isElementNode(leafNode)) {
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

export function mockGetDescendantTextNodes(mock) {
  getDescendantTextNodes = mock;
}
