import { clearCurrentSelection } from '../clearCurrentSelection';
import { getNodeBasedOnRangeNode } from '../getNodeBasedOnRangeNode';
import { getTargetLeafNodeWithOffset } from '../getTargetLeafNodeWithOffset';
import { modifySelection } from '../modifySelection';
import { selectRange } from '../selectRange';

jest.mock('../clearCurrentSelection')
jest.mock('../getNodeBasedOnRangeNode');
jest.mock('../getTargetLeafNodeWithOffset');
jest.mock('../selectRange');

describe('modifySelection', () => {
  describe('if there is not a new target selection range', () => {
    it('clears the current selection', () => {
      modifySelection(null);
      expect(clearCurrentSelection).toHaveBeenCalledWith();
    });

    it('does not try to selection a new range', () => {
      modifySelection(null);
      expect(selectRange).not.toHaveBeenCalled();
    });
  });

  describe('if there is a new target selection range', () => {
    const targetRange = {
      endNode: 'FAKE_END_NODE',
      endOffset: 3,
      startNode: 'FAKE_START_NODE',
      startOffset: 1,
    };
    const startRootNode = 'FAKE_START_ROOT_NODE';
    const endRootNode = 'FAKE_END_ROOT_NODE';
    const startLeafNodeWithOffset = {
      node: 'FAKE_START_LEAF_NODE',
      offset: 1,
    };
    const endLeafNodeWithOffset = {
      node: 'FAKE_END_LEAF_NODE',
      offset: 5,
    };
    
    beforeEach(() => {
      (getNodeBasedOnRangeNode as jest.Mock).mockRestore();
      (getNodeBasedOnRangeNode as jest.Mock)
        .mockReturnValueOnce(startRootNode)
        .mockReturnValueOnce(endRootNode);
      (getTargetLeafNodeWithOffset as jest.Mock).mockRestore();
      (getTargetLeafNodeWithOffset as jest.Mock)
        .mockReturnValueOnce(startLeafNodeWithOffset)
        .mockReturnValueOnce(endLeafNodeWithOffset);
    });

    it('clears the current selection', () => {
      modifySelection(targetRange);
      expect(clearCurrentSelection).toHaveBeenCalledWith();
    });

    it('gets the start node', () => {
      modifySelection(targetRange);
      expect(getNodeBasedOnRangeNode).toHaveBeenCalledWith(targetRange.startNode);
    });

    it('gets the end node', () => {
      modifySelection(targetRange);
      expect(getNodeBasedOnRangeNode).toHaveBeenCalledWith(targetRange.endNode);
    });

    describe('if the start node is null', () => {
      beforeEach(() => {
        (getNodeBasedOnRangeNode as jest.Mock).mockRestore();
        (getNodeBasedOnRangeNode as jest.Mock)
          .mockReturnValueOnce(null)
          .mockReturnValueOnce(endRootNode);
      });

      it('throws an error', () => {
        expect.assertions(1);
        try {
          modifySelection(targetRange);
        } catch(e) {
          expect(e).toEqual(new Error('FAKE_START_NODE does not exist'));
        }
      });
    });

    describe('if the end node is null', () => {
      beforeEach(() => {
        (getNodeBasedOnRangeNode as jest.Mock).mockRestore();
        (getNodeBasedOnRangeNode as jest.Mock)
          .mockReturnValueOnce(startRootNode)
          .mockReturnValueOnce(null);
      });

      it('throws an error', () => {
        expect.assertions(1);
        try {
          modifySelection(targetRange);
        } catch(e) {
          expect(e).toEqual(new Error('FAKE_END_NODE does not exist'));
        }
      });
    });

    it('gets the start leaf node with offset', () => {
      modifySelection(targetRange);
      expect(getTargetLeafNodeWithOffset).toHaveBeenCalledWith(
        startRootNode,
        targetRange.startOffset,
      );
    });

    it('gets the end leaf node with offset', () => {
      modifySelection(targetRange);
      expect(getTargetLeafNodeWithOffset).toHaveBeenCalledWith(
        endRootNode,
        targetRange.endOffset,
      );
    });

    describe('if the start leaf node with offset is null', () => {
      beforeEach(() => {
        (getTargetLeafNodeWithOffset as jest.Mock).mockRestore();
        (getTargetLeafNodeWithOffset as jest.Mock)
          .mockReturnValueOnce(null)
          .mockReturnValueOnce(endLeafNodeWithOffset);
      });

      it('throws an error', () => {
        expect.assertions(1);
        try {
          modifySelection(targetRange);
        } catch(e) {
          expect(e).toEqual(new Error('Start offset out of bounds'));
        }
      });
    });

    describe('if the end leaf node with offset is null', () => {
      beforeEach(() => {
        (getTargetLeafNodeWithOffset as jest.Mock).mockRestore();
        (getTargetLeafNodeWithOffset as jest.Mock)
          .mockReturnValueOnce(startLeafNodeWithOffset)
          .mockReturnValueOnce(null);
      });

      it('throws an error', () => {
        expect.assertions(1);
        try {
          modifySelection(targetRange);
        } catch(e) {
          expect(e).toEqual(new Error('End offset out of bounds'));
        }
      });
    });

    it('selects the new range', () => {
      modifySelection(targetRange);
      expect(selectRange).toHaveBeenCalledWith(
        startLeafNodeWithOffset.node,
        startLeafNodeWithOffset.offset,
        endLeafNodeWithOffset.node,
        endLeafNodeWithOffset.offset,
      );
    });
  });
});
