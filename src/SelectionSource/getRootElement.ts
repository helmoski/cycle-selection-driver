import { searchHierarchyForMatchingElement } from './searchHierarchyForMatchingElement';

export function getRootElement(
  anchorElement: HTMLElement,
  focusElement: HTMLElement,
  selector: string,
): HTMLElement {
  const anchorRootElement = searchHierarchyForMatchingElement(
    anchorElement,
    selector,
  );
  const focusRootElement = searchHierarchyForMatchingElement(
    focusElement,
    selector,
  );
  return (
    anchorRootElement === focusRootElement
      ? anchorRootElement
      : null
  );
}
