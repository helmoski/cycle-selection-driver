import { ISelectionRange } from '../types';
import { getNodeElement } from './getNodeElement';
import { getRootElement } from './getRootElement';
import { getStartAndEndOffsets } from './getStartAndEndOffsets';
import { orderElements } from './orderElements';

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
  const rootElement = getRootElement(anchorElement, focusElement, selector);
  if (rootElement === null) {
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
    rootElement,
    startElement,
    startOffset,
    text: selection.toString(),
  };
}
