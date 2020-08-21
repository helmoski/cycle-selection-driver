import { NodeType } from '../types';

export const isTextNode = (node: Node): boolean => node.nodeType === NodeType.TextNode;
