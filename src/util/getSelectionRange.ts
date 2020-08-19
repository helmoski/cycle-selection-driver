import { ISelectionRange } from '../types';
import { getNodeElement } from './getNodeElement';
import { orderElements } from './orderElements';
import { searchHierarchyForMatchingElement } from './searchHierarchyForMatchingElement';

export function getSelectionRange(
  selection: Selection,
  selector: string,
): ISelectionRange | null {
  const {
    anchorNode,
    anchorOffset,
    focusNode,
    focusOffset,
  } = selection;

  const anchorElement = getNodeElement(anchorNode);
  const focusElement = getNodeElement(focusNode);

  // ensure valid selection (same root element that matches selector)
  const anchorRootElement = searchHierarchyForMatchingElement(
    anchorElement,
    selector,
  );
  const focusRootElement = searchHierarchyForMatchingElement(
    focusElement,
    selector,
  );
  if (anchorRootElement !== focusRootElement) return null;
  if (anchorRootElement === null) return null;

  // determine start and end elements
  const [startElement, endElement] = orderElements(anchorElement, focusElement);

  // determine start and end offsets
  let startOffset: number;
  let endOffset: number;
  if (anchorOffset === focusOffset) {
    startOffset = anchorOffset;
    endOffset = anchorOffset;
  } else if (startElement === endElement) {
    startOffset = Math.min(anchorOffset, focusOffset);
    endOffset = Math.max(anchorOffset, focusOffset);
  } else if (startElement === anchorElement) {
    startOffset = anchorOffset;
    endOffset = focusOffset;
  } else {
    startOffset = focusOffset;
    endOffset = anchorOffset;
  }
  
  return {
    anchorNode,
    anchorOffset,
    endElement,
    endOffset,
    focusNode,
    focusOffset,
    startElement,
    startOffset,
    text: selection.toString(),
  };
}