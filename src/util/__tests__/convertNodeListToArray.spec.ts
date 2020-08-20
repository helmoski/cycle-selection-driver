import { convertNodeListToArray } from '../convertNodeListToArray';

describe('convertNodeListToArray', () => {
  const node1 = 'FAKE_NODE_1' as any;
  const node2 = 'FAKE_NODE_2' as any;
  const nodes = [node1, node2];
  const nodeList = nodes as any as NodeList;

  it('returns an array based on the node list', () => {
    const result = convertNodeListToArray(nodeList);
    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual(nodes);
  });
});
