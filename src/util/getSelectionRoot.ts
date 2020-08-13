import { searchHierarchyForMatchingElement } from './searchHierarchyForMatchingElement';

export const getSelectionRoot = (
  selection: Selection,
  selector: string,
): HTMLElement => {
  const anchorRootElement = searchHierarchyForMatchingElement(
    selection.anchorNode.parentElement,
    selector,
  );
  const focusRootElement = searchHierarchyForMatchingElement(
    selection.focusNode.parentElement,
    selector,
  );
  return (
    anchorRootElement === focusRootElement
      ? anchorRootElement
      : null
  );
};
