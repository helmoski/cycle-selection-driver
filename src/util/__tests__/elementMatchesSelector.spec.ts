import { expect } from 'chai';
import { stub } from 'sinon';

import 'mocha';

import { elementMatchesSelector } from '../elementMatchesSelector';

describe('elementMatchesSelector', () => {
  const selectorClass = 'target';
  const selector = `.${selectorClass}`;
  const parentElement = {
    matches: stub(),
    parentElement: null,
  } as any;
  const element = {
    matches: stub(),
    parentElement,
  } as any;

  before(() => {
    element.matches.returns(false);
    parentElement.matches.returns(false);
  });

  it('checks if the element or any of its ancestors match the selector', () => {
    elementMatchesSelector(element, selector);
    expect(element.matches).to.have.been.calledWith(selector);
    expect(parentElement.matches).to.have.been.calledWith(selector);
  });

  describe('for element that matches the selector', () => {
    before(() => {
      element.matches.returns(true);
      parentElement.matches.returns(false);
    });

    it('returns true', () => {
      const result = elementMatchesSelector(element, selector);
      expect(result).to.be.true;
    });
  });

  describe('for element whose ancestor matches the selector', () => {
    before(() => {
      element.matches.returns(false);
      parentElement.matches.returns(true);
    });

    it('returns true', () => {
      const result = elementMatchesSelector(element, selector);
      expect(result).to.be.true;
    });
  });

  describe('for element that does not match the selector', () => {
    before(() => {
      element.matches.returns(false);
      parentElement.matches.returns(false);
    });

    it('returns false', () => {
      const result = elementMatchesSelector(element, selector);
      expect(result).to.be.false;
    });
  });
});
