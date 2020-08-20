import { isElementNode } from '../isElementNode';

describe('isElementNode', () => {
  describe('for element node', () => {
    const node = { nodeType: 1 } as any;

    it('returns true', () => {
      const result = isElementNode(node);
      expect(result).toBe(true);
    });
  });

  describe('for text node', () => {
    const node = { nodeType: 3 } as any;

    it('returns false', () => {
      const result = isElementNode(node);
      expect(result).toBe(false);
    });
  });
});
