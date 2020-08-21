export function orderElements(
  a: HTMLElement,
  b: HTMLElement,
): [HTMLElement, HTMLElement] {
  if (a === b) return [a, b];
  const comparisonResult = a.compareDocumentPosition(b);
  if (comparisonResult & Node.DOCUMENT_POSITION_PRECEDING) {
    return [b, a];
  }
  if (comparisonResult & Node.DOCUMENT_POSITION_FOLLOWING) {
    return [a, b];
  }
  throw new Error(`Unhandled Situation: ${comparisonResult}`);
}