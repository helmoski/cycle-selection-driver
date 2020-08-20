import { convertNodeListToArray } from './convertNodeListToArray';
import { isElementNode } from './isElementNode';
import { isTextNode } from './isTextNode';

export function getLeafNodes(rootNode: Node) {
  const leafNodes = [];
  let stack = [rootNode];
  while (stack.length > 0) {
    const currentNode = stack.pop();
    if (isElementNode(currentNode)) {
      if (currentNode.tagName === 'BR') {
        leafNodes.unshift(currentNode)
      } else {
        stack.push(
          ...convertNodeListToArray(currentNode.childNodes),
        );
      }
    } else if (isTextNode(currentNode)) {
      leafNodes.unshift(currentNode)
    }
  }
  return leafNodes;
}