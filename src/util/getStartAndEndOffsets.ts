export function getStartAndEndOffsets(
  startElement: HTMLElement,
  endElement: HTMLElement,
  anchorElement: HTMLElement,
  anchorOffset: number,
  focusOffset: number,
): [number, number] {
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
  return [startOffset, endOffset];
}