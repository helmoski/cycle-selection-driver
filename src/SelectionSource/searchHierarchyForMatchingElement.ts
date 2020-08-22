export const searchHierarchyForMatchingElement = (
  element: HTMLElement,
  selector: string,
): HTMLElement | null => (
  element.matches(selector)
    ? element
    : element.parentElement === null
      ? null
      : searchHierarchyForMatchingElement(element.parentElement, selector)
);
