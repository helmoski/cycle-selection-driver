export const getNodeBasedOnRangeNode = (
  node: Node | string,
): Node | null => (
  node.hasOwnProperty('nodeType')
    ? node as Node
    : document.querySelector(node as string) as Node | null
);
