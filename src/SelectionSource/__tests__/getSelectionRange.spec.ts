import { getNodeElement } from '../getNodeElement';
import { getRootElement } from '../getRootElement';
import { getSelectionRange } from '../getSelectionRange';
import { getStartAndEndOffsets } from '../getStartAndEndOffsets';
import { orderElements } from '../orderElements';

jest.mock('../getNodeElement');
jest.mock('../getStartAndEndOffsets');
jest.mock('../orderElements');
jest.mock('../getRootElement');

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
  const rootElement = 'FAKE_ROOT_ELEMENT';
  const startElement = 'FAKE_START_ELEMENT';
  const endElement = 'FAKE_END_ELEMENT';
  const startOffset = anchorOffset;
  const endOffset = focusOffset;

  beforeAll(() => {
    (getRootElement as jest.Mock).mockReturnValue(rootElement);
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

  it('gets the root element for the selection', () => {
    getSelectionRange(selection, selector);
    expect(getRootElement).toHaveBeenCalledWith(
      anchorElement,
      focusElement,
      selector,
    );
  });

  describe('when the selection does not fall within a root element', () => {
    beforeEach(() => {
      (getRootElement as jest.Mock).mockReturnValueOnce(null);
    });

    it('returns null', () => {
      const result = getSelectionRange(selection, selector);
      expect(result).toBeNull();
    });
  });

  describe('when the selection falls within a root element', () => {
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
        rootElement,
        startElement,
        startOffset,
        text: selectionText,
      });
    });
  });
});