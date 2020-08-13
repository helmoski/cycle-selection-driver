import { expect } from 'chai';
import { stub } from 'sinon';

import 'mocha';

import { searchHierarchyForMatchingElement } from '../searchHierarchyForMatchingElement';

describe('searchHierarchyForMatchingElement', () => {
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

  it('searches the specified element and its ancestors for an element that matches the specified selector', () => {
    searchHierarchyForMatchingElement(element, selector);
    expect(element.matches).to.have.been.calledWith(selector);
    expect(parentElement.matches).to.have.been.calledWith(selector);
  });

  describe('for element that matches the selector', () => {
    before(() => {
      element.matches.returns(true);
      parentElement.matches.returns(false);
    });

    it('returns the element', () => {
      const result = searchHierarchyForMatchingElement(element, selector);
      expect(result).to.equal(element);
    });
  });

  describe('for ancestor that matches the selector', () => {
    before(() => {
      element.matches.returns(false);
      parentElement.matches.returns(true);
    });

    it('returns the ancestor', () => {
      const result = searchHierarchyForMatchingElement(element, selector);
      expect(result).to.equal(parentElement);
    });
  });

  describe('for element and ancestors that don\'t match the selector', () => {
    before(() => {
      element.matches.returns(false);
      parentElement.matches.returns(false);
    });

    it('returns null', () => {
      const result = searchHierarchyForMatchingElement(element, selector);
      expect(result).to.be.null;
    });
  });
});
