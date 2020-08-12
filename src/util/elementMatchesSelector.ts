export const elementMatchesSelector = (
  element: HTMLElement,
  selector: string,
): boolean => (
  element.matches(selector)
  || (
    element.parentElement !== null
    && elementMatchesSelector(element.parentElement, selector)
  )
);
