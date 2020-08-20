import { isTextNode } from '../isTextNode';

describe('isTextNode', () => {
  describe('for element node', () => {
    const node = { nodeType: 1 } as any;

    it('returns false', () => {
      const result = isTextNode(node);
      expect(result).toBe(true);
    });
  });

  describe('for text node', () => {
    const node = { nodeType: 3 } as any;

    it('returns true', () => {
      const result = isTextNode(node);
      expect(result).toBe(false);
    });
  });
});
