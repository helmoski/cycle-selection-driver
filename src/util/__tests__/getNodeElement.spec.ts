import { getNodeElement } from '../getNodeElement';

describe('getNodeElement', () => {
  const elementNode = { nodeType: 1 } as any;
  const textNode = {
    nodeType: 3,
    parentElement: elementNode,
  } as any;

  describe('for element node', () => {
    it('returns element', () => {
      const result = getNodeElement(elementNode);
      expect(result).toBe(elementNode);
    });
  });

  describe('for text node', () => {
    it('returns node parent element', () => {
      const result = getNodeElement(textNode);
      expect(result).toBe(elementNode);
    });
  });
});
