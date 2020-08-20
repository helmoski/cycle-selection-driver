import { getSelectionRoot } from '../getSelectionRoot';

describe('getSelectionRoot', () => {
  const selectorClass = 'target';
  const selector = `.${selectorClass}`;
  const matchingElement = {
    matches: () => true,
  };
  const matchingElement2 = {
    matches: () => true,
  };
  const nonMatchingElement = {
    matches: () => false,
    parentElement: null,
  };
  const anchorNode = {} as any;
  const focusNode = {} as any;
  const selection = {
    anchorNode,
    focusNode,
  } as any;

  describe('when neither the anchor or focus element matches the selector', () => {
    beforeAll(() => {
      anchorNode.parentElement = nonMatchingElement;
      focusNode.parentElement = nonMatchingElement;
    });

    it('returns null', () => {
      const result = getSelectionRoot(selection, selector);
      expect(result).toBeNull();
    });
  });

  describe('when the anchor element does not match the selector', () => {
    beforeAll(() => {
      anchorNode.parentElement = nonMatchingElement;
      focusNode.parentElement = matchingElement;
    });

    it('returns null', () => {
      const result = getSelectionRoot(selection, selector);
      expect(result).toBeNull();
    });
  });

  describe('when the focus element does not match the selector', () => {
    beforeAll(() => {
      anchorNode.parentElement = matchingElement;
      focusNode.parentElement = nonMatchingElement;
    });

    it('returns null', () => {
      const result = getSelectionRoot(selection, selector);
      expect(result).toBeNull();
    });
  });

  describe('when both the anchor and focus elements match the selector', () => {
    describe('and are the same root element', () => {
      beforeAll(() => {
        anchorNode.parentElement = matchingElement;
        focusNode.parentElement = matchingElement;
      });

      it('returns the root element', () => {
        const result = getSelectionRoot(selection, selector);
        expect(result).toBe(matchingElement);
      });
    });

    describe('but are not the same root element', () => {
      beforeAll(() => {
        anchorNode.parentElement = matchingElement;
        focusNode.parentElement = matchingElement2;
      });

      it('returns null', () => {
        const result = getSelectionRoot(selection, selector);
        expect(result).toBeNull();
      });
    });
  });
});