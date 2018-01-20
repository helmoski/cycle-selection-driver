export function getDescendantTextNodes(document: Document, root: Node): Text[] {
  const textNodes = [] as Text[];
  const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (treeWalker.nextNode() as any) {
    textNodes.push(treeWalker.currentNode as Text);
  }
  return textNodes;
}

export default getDescendantTextNodes;
