// tslint:disable:no-unused-expression

import * as chai from 'chai';
import { noop } from 'lodash';
import { stub } from 'sinon';

import 'mocha';

import { SelectionSource } from '../SelectionSource';

const { expect } = chai;
const sinonChai = require('sinon-chai'); // tslint:disable-line:no-var-requires
chai.use(sinonChai);

describe('SelectionSource', () => {
  const selector = '.target';

  describe('selections method', () => {
    it('should add a listener for the document selectionchange event', () => {
      const document = {
        addEventListener: stub(),
      };
      const selectionSource = new SelectionSource(document as any);
      selectionSource
        .selections(selector)
        .addListener({
          complete: noop,
          error: noop,
          next: noop,
        });
      expect(document.addEventListener).to.have.been.calledWith('selectionchange');
    });

    it('should get the selection when the selectionchange event is emitted', () => {
      const document = {
        addEventListener: stub(),
        getSelection: stub(),
      };
      const selectionSource = new SelectionSource(document as any);
      const listener = {
        complete: noop,
        error: noop,
        next: noop,
      };
      selectionSource
        .selections(selector)
        .addListener(listener);
      const emitEvent = document.addEventListener.firstCall.args[1];
      emitEvent();
      expect(document.getSelection).to.have.been.calledOnce;
    });

    describe('returned stream', () => {
      it('should emit the updated selection when the selectionchange event is emitted for the specified selector', () => {
        const document = {
          addEventListener: stub(),
          getSelection: stub(),
        };
        const matchingElement = { matches: () => true };
        const nonMatchingElement = {
          matches: () => false,
          parentElement: null,
        };
        const matchingNode = { parentElement: matchingElement };
        const nonMatchingNode = { parentElement: nonMatchingElement };
        const selection1 = {
          anchorNode: matchingNode,
          focusNode: matchingNode,
        };
        const selection2 = {
          anchorNode: matchingNode,
          focusNode: matchingNode,
        };
        const selection3 = {
          anchorNode: nonMatchingNode,
          focusNode: nonMatchingNode,
        };
        const selection4 = {
          anchorNode: nonMatchingNode,
          focusNode: nonMatchingNode,
        };
        document.getSelection.onCall(0).returns(selection1);
        document.getSelection.onCall(1).returns(selection2);
        document.getSelection.onCall(2).returns(selection3);
        document.getSelection.onCall(3).returns(selection4);
        const selectionSource = new SelectionSource(document as any);
        const listener = {
          complete: noop,
          error: (e) => console.error(e),
          next: stub().callsFake(x => { console.log(x) })
        } as any;
        selectionSource
          .selections(selector)
          .addListener(listener);
        const emitEvent = document.addEventListener.firstCall.args[1];
        emitEvent();
        emitEvent();
        emitEvent();
        emitEvent();
        expect(listener.next).to.have.been.calledThrice;
        expect(listener.next.firstCall.calledWithExactly(selection1)).to.be.true;
        expect(listener.next.secondCall.calledWithExactly(selection2)).to.be.true;
        expect(listener.next.thirdCall.calledWithExactly(null)).to.be.true;
      });
    });
  });
});
