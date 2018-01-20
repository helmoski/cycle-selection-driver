// tslint:disable:no-unused-expression

import { expect } from 'chai';
import { SinonSpy, spy, stub } from 'sinon';
import xstream, { Listener, Stream } from 'xstream';

import 'mocha';

import { IRange } from '../IRange';
import { ISelectionSource } from '../ISelectionSource';
import { selectionDriver, setDocument, setModifySelection } from '../selectionDriver';

describe('selectionDriver', () => {
  const doc = {} as any;
  let modifySelectionStub;

  before(() => {
    setDocument(doc);
    modifySelectionStub = stub();
    setModifySelection(modifySelectionStub);
  });

  afterEach(() => {
    modifySelectionStub.reset();
  });

  it('returns an instance of ISelectionSource', () => {
    const sink$ = new Stream<IRange[] | IRange>();
    const result = selectionDriver(sink$);
    expect(result).to.exist;
    expect(result).to.have.property('selections');
  });

  it('modifies the selection when an event with a single range is emitted', () => {
    const range = {} as IRange;
    const sink$ = xstream.of(range);
    selectionDriver(sink$);
    expect(modifySelectionStub).to.have.been.calledOnce;
    const args = modifySelectionStub.firstCall.args;
    expect(args[0]).to.equal(doc);
    expect(args[1]).to.be.an('array').with.lengthOf(1);
    expect(args[1][0]).to.equal(range);
  });

  it('modifies the selection when an event with multiple ranges is emitted', () => {
    const ranges = [{}, {}] as IRange[];
    const sink$ = xstream.of(ranges);
    selectionDriver(sink$);
    expect(modifySelectionStub)
      .to.have.been.calledOnce.and.calledWithExactly(doc, ranges);
  });
});
