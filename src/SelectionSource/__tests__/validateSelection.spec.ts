import { validateSelection } from '../validateSelection';
import { searchHierarchyForMatchingElement } from '../searchHierarchyForMatchingElement';

jest.mock('../searchHierarchyForMatchingElement');

describe('validateSelection', () => {
  const anchorElement = 'FAKE_ANCHOR_ELEMENT' as any;
  const focusElement = 'FAKE_FOCUS_ELEMENT' as any;
  const selector = 'FAKE_SELECTOR';
  const rootElement = 'FAKE_ROOT_ELEMENT';

  beforeAll(() => {
    (searchHierarchyForMatchingElement as jest.Mock)
          .mockReturnValue(rootElement);
  });

  it('gets the root element for the anchor element', () => {
    validateSelection(
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
    validateSelection(
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
      it('returns true', () => {
        const result = validateSelection(
          anchorElement,
          focusElement,
          selector,
        );
        expect(result).toBe(true);
      });
    });

    describe('that does not match the selector', () => {
      beforeEach(() => {
        (searchHierarchyForMatchingElement as jest.Mock)
          .mockReturnValueOnce(null)
          .mockReturnValueOnce(null);
      });

      it('returns false', () => {
        const result = validateSelection(
          anchorElement,
          focusElement,
          selector,
        );
        expect(result).toBe(false);
      });
    });
  });

  describe('when anchor and focus have different root elements', () => {
    beforeEach(() => {
      (searchHierarchyForMatchingElement as jest.Mock)
        .mockReturnValueOnce('OTHER_ROOT_ELEMENT');
    });

    it('returns false', () => {
      const result = validateSelection(
        anchorElement,
        focusElement,
        selector,
      );
      expect(result).toBe(false);
    });
  });
});
