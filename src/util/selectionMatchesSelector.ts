import { elementMatchesSelector } from './elementMatchesSelector';

export const selectionMatchesSelector = (
  selection: Selection,
  selector: string,
): boolean => (
  elementMatchesSelector(selection.anchorNode.parentElement, selector)
  && elementMatchesSelector(selection.focusNode.parentElement, selector)
);
