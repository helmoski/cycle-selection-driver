import { clearCurrentSelection } from '../clearCurrentSelection';

describe('clearCurrentSelection', () => {
  const selection = {
    removeAllRanges: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.spyOn(document, 'getSelection').mockReturnValue(selection);
  });

  it('gets the current selection from the document', () => {
    clearCurrentSelection();
    expect(document.getSelection).toHaveBeenCalledWith();
  });

  it('clears the selection', () => {
    clearCurrentSelection();
    expect(selection.removeAllRanges).toHaveBeenCalledWith();
  });
});
