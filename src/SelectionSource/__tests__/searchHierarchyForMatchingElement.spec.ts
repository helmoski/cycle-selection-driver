import { searchHierarchyForMatchingElement } from '../searchHierarchyForMatchingElement';

describe('searchHierarchyForMatchingElement', () => {
  const selectorClass = 'target';
  const selector = `.${selectorClass}`;
  const parentElement = {
    matches: jest.fn(),
    parentElement: null,
  } as any;
  const element = {
    matches: jest.fn(),
    parentElement,
  } as any;

  beforeAll(() => {
    (element.matches as jest.Mock).mockReturnValue(false);
    (parentElement.matches as jest.Mock).mockReturnValue(false);
  });

  it('searches the specified element and its ancestors for an element that matches the specified selector', () => {
    searchHierarchyForMatchingElement(element, selector);
    expect(element.matches).toHaveBeenCalledWith(selector);
    expect(parentElement.matches).toHaveBeenCalledWith(selector);
  });

  describe('for element that matches the selector', () => {
    beforeEach(() => {
      (element.matches as jest.Mock).mockReturnValueOnce(true);
    });

    it('returns the element', () => {
      const result = searchHierarchyForMatchingElement(element, selector);
      expect(result).toBe(element);
    });
  });

  describe('for ancestor that matches the selector', () => {
    beforeEach(() => {
      (parentElement.matches as jest.Mock).mockReturnValueOnce(true);
    });

    it('returns the ancestor', () => {
      const result = searchHierarchyForMatchingElement(element, selector);
      expect(result).toBe(parentElement);
    });
  });

  describe('for element and ancestors that don\'t match the selector', () => {
    it('returns null', () => {
      const result = searchHierarchyForMatchingElement(element, selector);
      expect(result).toBeNull();
    });
  });
});
