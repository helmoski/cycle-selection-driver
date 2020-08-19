import { convertNodeListToArray } from './convertNodeListToArray';
import { isElementNode } from './isElementNode';
import { isTextNode } from './isTextNode';

export function getLeafNodes(rootNode: Node) {
  const leafNodes = [];
  let queue = [rootNode];
  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (isElementNode(currentNode)) {
      if (currentNode.tagName === 'BR') {
        leafNodes.push(currentNode)
      } else {
        queue.push(
          ...convertNodeListToArray(currentNode.childNodes),
        );
      }
    } else if (isTextNode(currentNode)) {
      leafNodes.push(currentNode)
    }
  }
  return leafNodes;
}