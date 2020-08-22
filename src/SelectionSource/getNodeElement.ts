import { isElementNode } from '../util';

export const getNodeElement = (
  node: Node,
): HTMLElement => (
  isElementNode(node)
    ? node
    : node.parentElement
);
