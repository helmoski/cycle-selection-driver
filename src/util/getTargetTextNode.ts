import { getDescendantTextNodes as originalGetDescendantTextNodes } from './getDescendantTextNodes';

let getDescendantTextNodes = originalGetDescendantTextNodes;

export interface IResult {
  node: Text;
  offset: number;
}

export function getTargetTextNode(document: Document, node: Node, offset: number): IResult {
  const textNodes = getDescendantTextNodes(document, node);
  let found = false;
  let remainingOffset = offset;
  let currentIndex = 0;
  while (!found) {
    const textNode = textNodes[currentIndex];
    if (textNode.length > remainingOffset) {
      found = true;
    } else if (currentIndex + 1 === textNodes.length) {
      if (textNode.length === remainingOffset) {
        found = true;
      } else {
        throw new Error('Offset is out of bounds');
      }
    } else {
      remainingOffset -= textNode.length;
      currentIndex += 1;
    }
  }
  const result = {
    node: textNodes[currentIndex],
    offset: remainingOffset,
  } as IResult;

  return result;
}

export function mockGetDescendantTextNodes(mock) {
  getDescendantTextNodes = mock;
}

export default getTargetTextNode;
