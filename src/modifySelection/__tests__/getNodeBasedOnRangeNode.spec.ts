import { NodeType } from '../../types';
import { getNodeBasedOnRangeNode } from '../getNodeBasedOnRangeNode';

describe('getNodeBasedOnRangeNode', () => {
  beforeEach(() => {
    jest.spyOn(document, 'querySelector');
  });

  describe('when range node is of type "Node"', () => {
    const node = { nodeType: NodeType.TextNode } as any;

    it('returns the range node', () => {
      const result = getNodeBasedOnRangeNode(node);
      expect(result).toBe(node);
    });
  });

  describe('when range node is of type "string"', () => {
    const node = 'FAKE_SELECTOR';

    it('queries the document for an element matching the selector string', () => {
      getNodeBasedOnRangeNode(node);
      expect(document.querySelector).toHaveBeenCalledWith(node);
    });

    describe('when an element matches the selector string', () => {
      const element = 'FAKE_ELEMENT';
  
      beforeEach(() => {
        (document.querySelector as jest.Mock).mockReturnValueOnce(element);
      });

      it('returns the element', () => {
        const result = getNodeBasedOnRangeNode(node);
        expect(result).toBe(element);
      });
    });

    describe('when an element does not match the selector string', () => {
      beforeEach(() => {
        (document.querySelector as jest.Mock).mockReturnValueOnce(null);
      });

      it('returns null', () => {
        const result = getNodeBasedOnRangeNode(node);
        expect(result).toBeNull();
      });
    });
  });
});
