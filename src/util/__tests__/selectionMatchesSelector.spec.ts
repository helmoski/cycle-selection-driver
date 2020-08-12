import { expect } from 'chai';

import 'mocha';

import { selectionMatchesSelector } from '../selectionMatchesSelector';

describe('selectionMatchesSelector', () => {
  const selectorClass = 'target';
  const selector = `.${selectorClass}`;
  const matchingElement = {
    matches: () => true,
  };
  const nonMatchingElement = {
    matches: () => false,
    parentElement: null,
  };
  const anchorNode = {} as any;
  const focusNode = {} as any;
  const selection = {
    anchorNode,
    focusNode,
  } as any;

  describe('when neither element matches the selector', () => {
    before(() => {
      anchorNode.parentElement = nonMatchingElement;
      focusNode.parentElement = nonMatchingElement;
    });

    it('returns false', () => {
      const result = selectionMatchesSelector(selection, selector);
      expect(result).to.be.false;
    });
  });

  describe('when the anchor element does not match the selector', () => {
    before(() => {
      anchorNode.parentElement = nonMatchingElement;
      focusNode.parentElement = matchingElement;
    });

    it('returns false', () => {
      const result = selectionMatchesSelector(selection, selector);
      expect(result).to.be.false;
    });
  });

  describe('when the focus element does not match the selector', () => {
    before(() => {
      anchorNode.parentElement = matchingElement;
      focusNode.parentElement = nonMatchingElement;
    });

    it('returns false', () => {
      const result = selectionMatchesSelector(selection, selector);
      expect(result).to.be.false;
    });
  });

  describe('when both elements match the selector', () => {
    before(() => {
      anchorNode.parentElement = matchingElement;
      focusNode.parentElement = matchingElement;
    });

    it('returns true', () => {
      const result = selectionMatchesSelector(selection, selector);
      expect(result).to.be.true;
    });
  });
});