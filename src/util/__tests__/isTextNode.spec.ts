import { NodeType } from '../../types';
import { isTextNode } from '../isTextNode';

describe('isTextNode', () => {
  describe('for element node', () => {
    const node = { nodeType: NodeType.ElementNode } as any;

    it('returns false', () => {
      const result = isTextNode(node);
      expect(result).toBe(true);
    });
  });

  describe('for text node', () => {
    const node = { nodeType: NodeType.TextNode } as any;

    it('returns true', () => {
      const result = isTextNode(node);
      expect(result).toBe(false);
    });
  });
});
