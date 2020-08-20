import { getLeafNodes } from '../getLeafNodes';

describe('getLeafNodes', () => {
  const textNode1 = {
    nodeType: 3,
    text: 'Lorem',
  };
  const textNode2 = {
    nodeType: 3,
    text: 'Ipsum',
  };
  const textNode3 = {
    nodeType: 3,
    text: 'Dolor',
  };
  const textNode4 = {
    nodeType: 3,
    text: 'Wombat',
  };
  const textNode5 = {
    nodeType: 3,
    text: 'foobar',
  };
  const br1 = {
    nodeType: 1,
    tagName: 'BR',
  };
  const br2 = {
    nodeType: 1,
    tagName: 'BR',
  };
  const li1 = {
    childNodes: [textNode2],
    nodeType: 1,
    tagName: 'LI',
  };
  const li2 = {
    childNodes: [br1],
    nodeType: 1,
    tagName: 'LI',
  };
  const ul = {
    childNodes: [li1, li2],
    nodeType: 1,
    tagName: 'UL',
  };
  const strong = {
    childNodes: [textNode4],
    nodeType: 1,
    tagName: 'STRONG',
  };
  const p = {
    childNodes: [textNode3, strong, br2, textNode5],
    nodeType: 1,
    tagName: 'p',
  };
  const afterAttributeNode = { nodeType: 2 };
  const rootElement = {
    childNodes: [
      textNode1,
      ul,
      p,
      afterAttributeNode,
    ],
    nodeType: 1,
    tagName: 'DIV',
  } as any;
  const leafNodes = [
    textNode1,
    textNode2,
    br1,
    textNode3,
    textNode4,
    br2,
    textNode5,
  ];
  
  it('returns all text nodes and line breaks that are descendants of the root node', () => {
    const result = getLeafNodes(rootElement);
    expect(result).toEqual(leafNodes);
  });
});
