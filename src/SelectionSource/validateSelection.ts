import { searchHierarchyForMatchingElement } from './searchHierarchyForMatchingElement';

export function validateSelection(
  anchorElement: HTMLElement,
  focusElement: HTMLElement,
  selector: string,
): boolean {
  const anchorRootElement = searchHierarchyForMatchingElement(
    anchorElement,
    selector,
  );
  const focusRootElement = searchHierarchyForMatchingElement(
    focusElement,
    selector,
  );
  return anchorRootElement === focusRootElement && anchorRootElement !== null;
}
