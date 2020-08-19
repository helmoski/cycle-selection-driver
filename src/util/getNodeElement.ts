import { isElementNode } from './isElementNode';

export const getNodeElement = (
  node: Node,
): HTMLElement => (
  isElementNode(node)
    ? node
    : node.parentElement
)