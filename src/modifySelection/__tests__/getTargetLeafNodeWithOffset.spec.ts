import { NodeType } from '../../types';
import { getLeafNodes } from '../getLeafNodes';
import { getTargetLeafNodeWithOffset } from '../getTargetLeafNodeWithOffset';

jest.mock('../getLeafNodes');

describe('getTargetLeafNodeWithOffset', () => {
  const rootNode = 'FAKE_ROOT_NODE' as any;
  const offset = 5;
  const brNode1 = {
    nodeType: NodeType.ElementNode,
    tagName: 'BR',
  };
  const brNode2 = { ...brNode1 };
  const textNode1 = {
    length: 2,
    nodeType: NodeType.TextNode,
    text: 'ab',
  };
  const textNode2 = {
    length: 1,
    nodeType: NodeType.TextNode,
    text: 'c',
  };
  const leafNodesWithBrTarget = [
    brNode1,
    textNode1,
    textNode2,
    brNode2,
  ] as any;
  const leafNodesWithTextTarget = [
    brNode1,
    textNode1,
    brNode2,
    textNode2,
  ] as any;

  beforeAll(() => {
    (getLeafNodes as jest.Mock).mockReturnValue(leafNodesWithBrTarget);
  });

  it('gets the leaf nodes for the specified root node', () => {
    getTargetLeafNodeWithOffset(rootNode, offset);
    expect(getLeafNodes).toHaveBeenCalledWith(rootNode);
  });

  describe('for target line break node', () => {
    it('returns the line break node', () => {
      const result = getTargetLeafNodeWithOffset(rootNode, offset);
      expect(result).toEqual({
        node: brNode2,
        offset: 0,
      })
    });
  });

  describe('for target text node', () => {
    beforeEach(() => {
      (getLeafNodes as jest.Mock).mockReturnValueOnce(leafNodesWithTextTarget);
    });

    it('returns the text node', () => {
      const result = getTargetLeafNodeWithOffset(rootNode, offset);
      expect(result).toEqual({
        node: textNode2,
        offset: 1,
      });
    });
  });
});
