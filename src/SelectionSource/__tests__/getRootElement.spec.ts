import { getRootElement } from '../getRootElement';
import { searchHierarchyForMatchingElement } from '../searchHierarchyForMatchingElement';

jest.mock('../searchHierarchyForMatchingElement');

describe('getRootElement', () => {
  const anchorElement = 'FAKE_ANCHOR_ELEMENT' as any;
  const focusElement = 'FAKE_FOCUS_ELEMENT' as any;
  const selector = 'FAKE_SELECTOR';
  const rootElement = 'FAKE_ROOT_ELEMENT';

  beforeAll(() => {
    (searchHierarchyForMatchingElement as jest.Mock)
          .mockReturnValue(rootElement);
  });

  it('gets the root element for the anchor element', () => {
    getRootElement(
      anchorElement,
      focusElement,
      selector,
    );
    expect(searchHierarchyForMatchingElement).toHaveBeenCalledWith(
      anchorElement,
      selector,
    );
  });

  it('gets the root element for the focus element', () => {
    getRootElement(
      anchorElement,
      focusElement,
      selector,
    );
    expect(searchHierarchyForMatchingElement).toHaveBeenCalledWith(
      focusElement,
      selector,
    );
  });

  describe('when anchor and focus have the same root element', () => {
    describe('that matches the selector', () => {
      it('returns the root element', () => {
        const result = getRootElement(
          anchorElement,
          focusElement,
          selector,
        );
        expect(result).toBe(rootElement);
      });
    });

    describe('that does not match the selector', () => {
      beforeEach(() => {
        (searchHierarchyForMatchingElement as jest.Mock)
          .mockReturnValueOnce(null)
          .mockReturnValueOnce(null);
      });

      it('returns null', () => {
        const result = getRootElement(
          anchorElement,
          focusElement,
          selector,
        );
        expect(result).toBeNull()
      });
    });
  });

  describe('when anchor and focus have different root elements', () => {
    beforeEach(() => {
      (searchHierarchyForMatchingElement as jest.Mock)
        .mockReturnValueOnce('OTHER_ROOT_ELEMENT');
    });

    it('returns null', () => {
      const result = getRootElement(
        anchorElement,
        focusElement,
        selector,
      );
      expect(result).toBeNull()
    });
  });
});
