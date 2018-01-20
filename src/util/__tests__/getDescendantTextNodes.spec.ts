// tslint:disable:no-unused-expression

import { expect } from 'chai';
import { stub } from 'sinon';

import 'mocha';

import { getDescendantTextNodes } from '../getDescendantTextNodes';

describe('getDescendantTextNodes', () => {
  before(() => {
    (global as any).NodeFilter = {
      SHOW_TEXT: 1,
    };
  });

  after(() => {
    delete (global as any).NodeFilter;
  });

  it('returns all of the root node\'s descendant text nodes', () => {
    const textNode1 = 'text node 1' as any;
    const textNode2 = 'text node 2' as any;
    const treeWalker = {
      nextNode: stub() as () => boolean,
    } as any;
    treeWalker.nextNode.onFirstCall().callsFake(() => {
      treeWalker.currentNode = textNode1;
      return true;
    });
    treeWalker.nextNode.onSecondCall().callsFake(() => {
      treeWalker.currentNode = textNode2;
      return true;
    });
    treeWalker.nextNode.onThirdCall().returns(false);
    const document = {
      createTreeWalker: stub().returns(treeWalker) as (root: Node, filter: number) => TreeWalker,
    } as Document;
    const root = {} as Node;
    const textNodes = getDescendantTextNodes(document, root);
    expect(document.createTreeWalker)
      .to.have.been.calledWithExactly(root, NodeFilter.SHOW_TEXT);
    expect(treeWalker.nextNode).to.have.been.calledThrice;
    expect(textNodes).to.deep.equal([
      textNode1,
      textNode2,
    ]);
  });
});
