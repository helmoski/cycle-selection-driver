import { getNodeElement } from '../getNodeElement';
import { getSelectionRange } from '../getSelectionRange';
import { getStartAndEndOffsets } from '../getStartAndEndOffsets';
import { orderElements } from '../orderElements';
import { validateSelection } from '../validateSelection';

jest.mock('../getNodeElement');
jest.mock('../getStartAndEndOffsets');
jest.mock('../orderElements');
jest.mock('../validateSelection');

describe('getSelectionRange', () => {
  const anchorNode = 'FAKE_ANCHOR_NODE';
  const anchorOffset = 2;
  const focusNode = 'FAKE_FOCUS_NODE';
  const focusOffset = 3;
  const selectionText = 'FAKE_SELECTION_TEXT';
  const selection = {
    anchorNode,
    anchorOffset,
    focusNode,
    focusOffset,
    toString: jest.fn().mockReturnValue(selectionText),
  } as any;
  const selector = 'FAKE_SELECTOR';
  const anchorElement = 'FAKE_ANCHOR_ELEMENT';
  const focusElement = 'FAKE_FOCUS_ELEMENT';
  const startElement = 'FAKE_START_ELEMENT';
  const endElement = 'FAKE_END_ELEMENT';
  const startOffset = anchorOffset;
  const endOffset = focusOffset;

  beforeAll(() => {
    (validateSelection as jest.Mock).mockReturnValue(true);
    (orderElements as jest.Mock).mockReturnValue([startElement, endElement]);
    (getStartAndEndOffsets as jest.Mock).mockReturnValue([startOffset, endOffset]);
  });

  beforeEach(() => {
    (getNodeElement as jest.Mock).mockReturnValueOnce(anchorElement);
    (getNodeElement as jest.Mock).mockReturnValueOnce(focusElement);
  });

  it('gets the anchor element', () => {
    getSelectionRange(selection, selector);
    expect(getNodeElement).toHaveBeenCalledWith(anchorNode);
  });

  it('gets the focus element', () => {
    getSelectionRange(selection, selector);
    expect(getNodeElement).toHaveBeenCalledWith(focusNode);
  });

  it('validates the selection', () => {
    getSelectionRange(selection, selector);
    expect(validateSelection).toHaveBeenCalledWith(
      anchorElement,
      focusElement,
      selector,
    );
  });

  describe('when the selection is invalid', () => {
    beforeEach(() => {
      (validateSelection as jest.Mock).mockReturnValueOnce(false);
    });

    it('returns null', () => {
      const result = getSelectionRange(selection, selector);
      expect(result).toBeNull();
    });
  });

  describe('when the selection is valid', () => {
    it('determines the start and end elements', () => {
      getSelectionRange(selection, selector);
      expect(orderElements).toHaveBeenCalledWith(
        anchorElement,
        focusElement,
      );
    });

    it('determines the start and end offsets', () => {
      getSelectionRange(selection, selector);
      expect(getStartAndEndOffsets).toHaveBeenCalledWith(
        startElement,
        endElement,
        anchorElement,
        anchorOffset,
        focusOffset,
      );
    });

    it('gets the selection text', () => {
      getSelectionRange(selection, selector);
      expect(selection.toString).toHaveBeenCalledWith();
    });

    it('returns the selection range', () => {
      const result = getSelectionRange(selection, selector);
      expect(result).toEqual({
        anchorNode,
        anchorOffset,
        endElement,
        endOffset,
        focusNode,
        focusOffset,
        startElement,
        startOffset,
        text: selectionText,
      });
    });
  });
});