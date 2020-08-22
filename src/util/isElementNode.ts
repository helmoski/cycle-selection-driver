import { NodeType } from '../types';

export const isElementNode = (
  node: Node,
): node is HTMLElement => node.nodeType === NodeType.ElementNode;
