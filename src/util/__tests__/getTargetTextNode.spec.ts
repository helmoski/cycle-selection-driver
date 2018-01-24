import { expect } from 'chai';
import { stub } from 'sinon';

import 'mocha';

import { getTargetTextNode, IResult, mockGetDescendantTextNodes } from '../getTargetTextNode';

describe('getTargetTextNode', () => {
  const textNodes = [
    { length: 5 },
    { length: 4 },
  ];
  const getDescendantTextNodes = stub().returns(textNodes);
  const document = {} as Document;
  const node = {} as Node;

  before(() => {
    mockGetDescendantTextNodes(getDescendantTextNodes);
  });

  afterEach(() => {
    getDescendantTextNodes.resetHistory();
  });

  it('gets the text node specified by the given node and offset', () => {
    const result = getTargetTextNode(document, node, 8);
    expect(getDescendantTextNodes).to.have.been.calledWithExactly(document, node);
    expect(result).to.deep.equal({
      node: textNodes[1],
      offset: 3,
    });
  });

  it('throws an error if the offset is out of bounds', () => {
    expect(() => getTargetTextNode(document, node, 15))
      .to.throw('Offset is out of bounds');
  });

  it('does not throw an error if the offset corresponds to the end of the node', () => {
    expect(() => getTargetTextNode(document, node, 9))
      .not.to.throw();
  });
});
