import { ISelectionRange } from '../types';
import { getNodeElement } from './getNodeElement';
import { getStartAndEndOffsets } from './getStartAndEndOffsets';
import { orderElements } from './orderElements';
import { validateSelection } from './validateSelection';

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
  const isValidSelection = validateSelection(anchorElement, focusElement, selector);
  if (!isValidSelection) {
    return null;
  }
  const [startElement, endElement] = orderElements(anchorElement, focusElement);
  const [startOffset, endOffset] = getStartAndEndOffsets(
    startElement,
    endElement,
    anchorElement,
    anchorOffset,
    focusOffset,
  );
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
