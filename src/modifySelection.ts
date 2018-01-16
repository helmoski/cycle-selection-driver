import { IRange } from './IRange';
import { getTargetTextNode } from './util';

export function modifySelection(document: Document, ranges: IRange[]) {
  const selection = document.getSelection();
  selection.removeAllRanges();
  ranges
    .map((range): Range => {
      const documentRange = document.createRange();
      const startNode = range.startNode instanceof Node ?
        range.startNode :
        document.querySelector(range.startNode);
      const endNode = range.endNode instanceof Node ?
        range.endNode :
        document.querySelector(range.endNode);

      if (startNode !== null) {
        const startTextNode = getTargetTextNode(document, startNode, range.startOffset);
        documentRange.setStart(startTextNode.node, startTextNode.offset);
      }

      if (endNode !== null) {
        const endTextNode = getTargetTextNode(document, endNode, range.endOffset);
        documentRange.setEnd(endTextNode.node, endTextNode.offset);
      }

      return documentRange;
    })
    .forEach(range => selection.addRange(range));
}

export default modifySelection;
