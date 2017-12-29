// tslint:disable:no-unused-expression

import * as chai from 'chai';
import { noop } from 'lodash';
import { stub } from 'sinon';

import 'mocha';

import SelectionSource from '../SelectionSource';

const { expect } = chai;
const sinonChai = require('sinon-chai'); // tslint:disable-line:no-var-requires
chai.use(sinonChai);

describe('SelectionSource', () => {
  describe('selections method', () => {
    it('should add a listener for the document selectionchange event', () => {
      const document = {
        addEventListener: stub(),
      };
      const selectionSource = new SelectionSource(document as any);
      selectionSource
        .selections()
        .addListener({
          next: noop,
          error: noop,
          complete: noop,
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
        next: stub(),
        error: stub(),
        complete: stub(),
      };
      selectionSource
        .selections()
        .addListener(listener);
      const emitEvent = document.addEventListener.firstCall.args[1];
      emitEvent();
      expect(document.getSelection).to.have.been.calledOnce;
    });

    describe('returned stream', () => {
      it('should emit the updated selection when the selectionchange event is emitted', () => {
        const document = {
          addEventListener: stub(),
          getSelection: stub(),
        };
        const selection1 = 'selection 1';
        const selection2 = 'selection 2';
        document.getSelection.onFirstCall().returns(selection1);
        document.getSelection.onSecondCall().returns(selection2);
        const selectionSource = new SelectionSource(document as any);
        const listener = {
          next: stub(),
          error: stub(),
          complete: stub(),
        };
        selectionSource
          .selections()
          .addListener(listener);
        const emitEvent = document.addEventListener.firstCall.args[1];
        emitEvent();
        emitEvent();
        expect(listener.next).to.have.been.calledTwice;
        expect(listener.next.firstCall.calledWithExactly(selection1)).to.be.true;
        expect(listener.next.secondCall.calledWithExactly(selection2)).to.be.true;
      });
    });
  });
});
