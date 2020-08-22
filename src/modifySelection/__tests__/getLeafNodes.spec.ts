import { NodeType } from '../../types';
import { getLeafNodes } from '../getLeafNodes';

describe('getLeafNodes', () => {
  const textNode1 = {
    nodeType: NodeType.TextNode,
    text: 'Lorem',
  };
  const textNode2 = {
    nodeType: NodeType.TextNode,
    text: 'Ipsum',
  };
  const textNode3 = {
    nodeType: NodeType.TextNode,
    text: 'Dolor',
  };
  const textNode4 = {
    nodeType: NodeType.TextNode,
    text: 'Wombat',
  };
  const textNode5 = {
    nodeType: NodeType.TextNode,
    text: 'foobar',
  };
  const br1 = {
    nodeType: NodeType.ElementNode,
    tagName: 'BR',
  };
  const br2 = {
    nodeType: NodeType.ElementNode,
    tagName: 'BR',
  };
  const li1 = {
    childNodes: [textNode2],
    nodeType: NodeType.ElementNode,
    tagName: 'LI',
  };
  const li2 = {
    childNodes: [br1],
    nodeType: NodeType.ElementNode,
    tagName: 'LI',
  };
  const ul = {
    childNodes: [li1, li2],
    nodeType: NodeType.ElementNode,
    tagName: 'UL',
  };
  const strong = {
    childNodes: [textNode4],
    nodeType: NodeType.ElementNode,
    tagName: 'STRONG',
  };
  const p = {
    childNodes: [textNode3, strong, br2, textNode5],
    nodeType: NodeType.ElementNode,
    tagName: 'p',
  };
  const commentNode = { nodeType: NodeType.CommentNode };
  const rootElement = {
    childNodes: [
      textNode1,
      ul,
      p,
      commentNode,
    ],
    nodeType: NodeType.ElementNode,
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
