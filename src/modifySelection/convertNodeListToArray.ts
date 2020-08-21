export const convertNodeListToArray = (
  nodeList: NodeList,
): Node[] => Array.prototype.slice.call(nodeList);
