import { orderElements } from '../orderElements';

describe('orderElements', () => {
  const a = {
    compareDocumentPosition: jest.fn(),
  } as any;
  const b = 'FAKE_ELEMENT_B' as any;

  beforeAll(() => {
    (a.compareDocumentPosition as jest.Mock)
      .mockReturnValue(Node.DOCUMENT_POSITION_PRECEDING);
  });

  it('compares the position of element a relative to element b', () => {
    orderElements(a, b);
    expect(a.compareDocumentPosition).toHaveBeenCalledWith(b);
  });

  describe('when element a is the same element as element b', () => {
    it('returns element a followed by element b', () => {
      const result = orderElements(a, a);
      expect(result).toEqual([a, a]);
    });
  });

  describe('when element a is positioned before element b', () => {
    beforeEach(() => {
      (a.compareDocumentPosition as jest.Mock)
        .mockReturnValueOnce(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it('returns element a followed by element b', () => {
      const result = orderElements(a, b);
      expect(result).toEqual([a, b]);
    });
  });

  describe('when element a is positioned after element b', () => {
    it('returns element b followed by element a', () => {
      const result = orderElements(a, b);
      expect(result).toEqual([b, a]);
    });
  });

  describe('when element a and element b belong to different documents', () => {
    beforeEach(() => {
      (a.compareDocumentPosition as jest.Mock)
        .mockReturnValueOnce(Node.DOCUMENT_POSITION_DISCONNECTED);
    });

    it('throws an error', () => {
      expect.assertions(1);
      try {
        orderElements(a, b);
      } catch (e) {
        expect(e).toEqual(new Error('Unhandled Situation: 1'));
      }
    });
  });
});
