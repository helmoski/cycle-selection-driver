import { selectRange } from '../selectRange';

describe('selectRange', () => {
  const startNode = 'FAKE_START_NODE' as any;
  const endNode = 'FAKE_END_NODE' as any;
  const startOffset = 0;
  const endOffset = 1;
  const selection = { addRange: jest.fn() } as any;
  const range = {
    setEnd: jest.fn(),
    setStart: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.spyOn(document, 'getSelection').mockReturnValue(selection);
    jest.spyOn(document, 'createRange').mockReturnValue(range);
  });

  it('gets the selection from the document', () => {
    selectRange(startNode, startOffset, endNode, endOffset);
    expect(document.getSelection).toHaveBeenCalledWith();
  });

  it('creates a new selection range', () => {
    selectRange(startNode, startOffset, endNode, endOffset);
    expect(document.createRange).toHaveBeenCalledWith();
  });

  it('sets the start of the new selection range', () => {
    selectRange(startNode, startOffset, endNode, endOffset);
    expect(range.setStart).toHaveBeenCalledWith(startNode, startOffset);
  });

  it('sets the end of the new selection range', () => {
    selectRange(startNode, startOffset, endNode, endOffset);
    expect(range.setEnd).toHaveBeenCalledWith(endNode, endOffset);
  });

  it('selects the range', () => {
    selectRange(startNode, startOffset, endNode, endOffset);
    expect(selection.addRange).toHaveBeenCalledWith(range);
  });
});
