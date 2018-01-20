// tslint:disable:no-unused-expression object-literal-sort-keys

import { expect } from 'chai';
import { SinonStub, spy, stub } from 'sinon';
import xstream, { Listener, Stream } from 'xstream';

import 'mocha';

import { IRange } from '../IRange';
import { ISelectionSource } from '../ISelectionSource';
import { modifySelection, setGetTargetTextNode } from '../modifySelection';
import { IResult } from '../util/getTargetTextNode';

function getFakeNode(): Node {
  return {
    nodeType: 1,
  } as Node;
}

describe('modifySelection', () => {
  let doc: Document;
  let selection: Selection;
  let documentRange: Range;
  let getTargetTextNode: (document: Document, node: Node, offset: number) => IResult;
  const startTextNode = {
    node: 'start-text-node',
    offset: 0,
  };
  const endTextNode = {
    node: 'end-text-node',
    offset: 1,
  };

  beforeEach(() => {
    doc = {
      createRange: stub() as () => Range,
      getSelection: stub() as () => Selection,
      querySelector: stub() as (selectors: string) => Element,
    } as Document;
    selection = {
      addRange: stub() as (range: Range) => void,
      removeAllRanges: stub() as () => void,
    } as Selection;
    documentRange = {
      setStart: stub() as (node: Node, offset: number) => void,
      setEnd: stub() as (node: Node, offset: number) => void,
    } as Range;
    (doc.getSelection as SinonStub).returns(selection);
    (doc.createRange as SinonStub).returns(documentRange);
    getTargetTextNode = stub();
    (getTargetTextNode as SinonStub).onFirstCall().returns(startTextNode);
    (getTargetTextNode as SinonStub).onSecondCall().returns(endTextNode);
    setGetTargetTextNode(getTargetTextNode);
  });

  describe('when the ranges argument is empty', () => {
    it('clears the selection', () => {
      modifySelection(doc, []);
      expect(selection.removeAllRanges).to.have.been.calledOnce;
      expect(selection.addRange).not.to.have.been.called;
    });
  });

  describe('when a single range is specified', () => {
    describe('that uses node elements for start and end', () => {
      it('sets the selection based on those nodes', () => {
        const range = {
          startNode: getFakeNode(),
          startOffset: 0,
          endNode: getFakeNode(),
          endOffset: 1,
        } as IRange;
        modifySelection(doc, [range]);
        expect(selection.removeAllRanges).to.have.been.calledOnce;
        expect((getTargetTextNode as SinonStub).firstCall)
          .to.have.been.calledWith(doc, range.startNode, range.startOffset);
        expect((getTargetTextNode as SinonStub).secondCall)
          .to.have.been.calledWith(doc, range.endNode, range.endOffset);
        expect(selection.addRange).to.have.been.calledOnce;
      });
    });

    describe('that uses selector strings for start and end', () => {
      it('sets the selection based on the nodes that match those selector strings', () => {
        const startNode = getFakeNode();
        const endNode = getFakeNode();
        (doc.querySelector as SinonStub).onFirstCall().returns(startNode);
        (doc.querySelector as SinonStub).onSecondCall().returns(endNode);
        const range = {
          startNode: 'start',
          startOffset: 0,
          endNode: 'end',
          endOffset: 1,
        };
        modifySelection(doc, [range]);
        expect(selection.removeAllRanges).to.have.been.calledOnce;
        expect((doc.querySelector as SinonStub).firstCall)
          .to.have.been.calledWith(range.startNode);
        expect((doc.querySelector as SinonStub).secondCall)
          .to.have.been.calledWith(range.endNode);
        expect((getTargetTextNode as SinonStub).firstCall)
          .to.have.been.calledWith(doc, startNode, range.startOffset);
        expect((getTargetTextNode as SinonStub).secondCall)
          .to.have.been.calledWith(doc, endNode, range.endOffset);
        expect(selection.addRange).to.have.been.calledOnce;
      });

      describe('and the start does not match any elements', () => {
        it('throws an error', () => {
          const endNode = getFakeNode();
          (doc.querySelector as SinonStub).onFirstCall().returns(null);
          (doc.querySelector as SinonStub).onSecondCall().returns(endNode);
          const range = {
            startNode: 'start',
            startOffset: 0,
            endNode: 'end',
            endOffset: 1,
          };
          expect(() => modifySelection(doc, [range]))
            .to.throw(`${range.startNode} does not exist`);
        });
      });

      describe('and the end does not match any elements', () => {
        it('throws an error', () => {
          const startNode = getFakeNode();
          (doc.querySelector as SinonStub).onFirstCall().returns(startNode);
          (doc.querySelector as SinonStub).onSecondCall().returns(null);
          const range = {
            startNode: 'start',
            startOffset: 0,
            endNode: 'end',
            endOffset: 1,
          };
          expect(() => modifySelection(doc, [range]))
            .to.throw(`${range.endNode} does not exist`);
        });
      });
    });
  });
});
