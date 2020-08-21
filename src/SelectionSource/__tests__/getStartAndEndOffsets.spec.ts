import { getStartAndEndOffsets } from '../getStartAndEndOffsets';

describe('getStartAndEndOffsets', () => {
  const element1 = 'FAKE_ELEMENT_1' as any;
  const element2 = 'FAKE_ELEMENT_2' as any;
  const smallerOffset = 0;
  const largerOffset = 3;

  describe('when the anchor and focus offsets are the same', () => {
    it('returns the expected start and end offset', () => {
      const result = getStartAndEndOffsets(
        element1,
        element2,
        element1,
        smallerOffset,
        smallerOffset,
      );
      expect(result).toEqual([smallerOffset, smallerOffset]);
    });
  });

  describe('when the start element is the same element as the end element', () => {
    describe('and the anchor offset is larger than the focus offset', () => {
      it('returns the focus offset followed by the anchor offset', () => {
        const result = getStartAndEndOffsets(
          element1,
          element1,
          element1,
          largerOffset,
          smallerOffset,
        );
        expect(result).toEqual([smallerOffset, largerOffset]);
      });
    });

    describe('and the anchor offset is smaller than the focus offset', () => {
      it('returns the anchor offset followed by the focus offset', () => {
        const result = getStartAndEndOffsets(
          element1,
          element1,
          element1,
          smallerOffset,
          largerOffset,
        );
        expect(result).toEqual([smallerOffset, largerOffset]);
      });
    });
  });

  describe('if the anchor element is the start element', () => {
    it('returns the anchor offset followed by the focus offset', () => {
      const result = getStartAndEndOffsets(
        element1,
        element2,
        element1,
        largerOffset,
        smallerOffset,
      );
      expect(result).toEqual([largerOffset, smallerOffset]);
    });
  });

  describe('if the anchor element is the end element', () => {
    it('returns the focus offset followed by the anchor offset', () => {
      const result = getStartAndEndOffsets(
        element1,
        element2,
        element2,
        smallerOffset,
        largerOffset,
      );
      expect(result).toEqual([largerOffset, smallerOffset]);
    });
  });
});
