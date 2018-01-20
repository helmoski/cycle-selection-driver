import { IRange } from './IRange';
import { getTargetTextNode as originalGetTargetTextNode, IResult } from './util/getTargetTextNode';

let getTargetTextNode = originalGetTargetTextNode;

export function modifySelection(document: Document, ranges: IRange[]): void {
  const selection = document.getSelection();
  selection.removeAllRanges();
  ranges
    .map((range): Range => {
      const documentRange = document.createRange();
      const startNode = (range.startNode.hasOwnProperty('nodeType') ?
        range.startNode :
        document.querySelector(range.startNode as string)) as Node;
      const endNode = (range.endNode.hasOwnProperty('nodeType') ?
        range.endNode :
        document.querySelector(range.endNode as string)) as Node;

      if (startNode === null) {
        throw new Error(`${range.startNode} does not exist`);
      }

      if (endNode === null) {
        throw new Error(`${range.endNode} does not exist`);
      }

      const startTextNode = getTargetTextNode(document, startNode, range.startOffset);
      documentRange.setStart(startTextNode.node, startTextNode.offset);
      const endTextNode = getTargetTextNode(document, endNode, range.endOffset);
      documentRange.setEnd(endTextNode.node, endTextNode.offset);
      return documentRange;
    })
    .forEach(range => selection.addRange(range));
}

export function setGetTargetTextNode(
  newGetTargetTextNode: (document: Document, node: Node, offset: number) => IResult,
) {
  getTargetTextNode = newGetTargetTextNode;
}

export default modifySelection;
