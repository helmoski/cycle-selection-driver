import { NodeType } from '../../types';
import { isElementNode } from '../isElementNode';

describe('isElementNode', () => {
  describe('for element node', () => {
    const node = { nodeType: NodeType.ElementNode } as any;

    it('returns true', () => {
      const result = isElementNode(node);
      expect(result).toBe(true);
    });
  });

  describe('for text node', () => {
    const node = { nodeType: NodeType.TextNode } as any;

    it('returns false', () => {
      const result = isElementNode(node);
      expect(result).toBe(false);
    });
  });
});
