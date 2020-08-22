import xs from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';

import { getSelectionRange } from '../getSelectionRange';
import { SelectionSource } from '../SelectionSource';

jest.mock('xstream/extra/fromEvent');
jest.mock('../getSelectionRange')

describe('SelectionSource', () => {
  const selectionSource = new SelectionSource();
  
  describe('selection stream', () => {
    let selectionChangeProducer;
    const selector = 'FAKE_SELECTOR';
    const listener = {
      error(e) {
        console.error(e);
        throw e;
      },
      next: jest.fn(),
    }

    beforeEach(() => {
      selectionChangeProducer = xs.create();
      (fromEvent as jest.Mock).mockReturnValue(selectionChangeProducer);
    });

    it('creates a stream based on the document `selectionchange` event', () => {
      selectionSource.selections(selector);
      expect(fromEvent).toHaveBeenCalledWith(document, 'selectionchange');
    });

    describe('on selection change', () => {
      const selectionRange = 'FAKE_SELECTION_RANGE';

      beforeAll(() => {
        (getSelectionRange as jest.Mock).mockReturnValue(selectionRange);
      });

      it('gets the selection range', () => {
        const selection$ = selectionSource.selections(selector);
        selection$.addListener(listener);
        selectionChangeProducer.shamefullySendNext(null);
        expect(getSelectionRange).toHaveBeenCalledWith(
          document.getSelection(),
          selector,
        );      
      });

      describe('with valid selection', () => {
        it('emits the selection range', () => {
          const selection$ = selectionSource.selections(selector);
          selection$.addListener(listener);
          selectionChangeProducer.shamefullySendNext(null);
          expect(listener.next).toHaveBeenCalledWith(selectionRange);
        });

        describe('after previous invalid selection', () => {
          it('emits both selection ranges', () => {
            const selection$ = selectionSource.selections(selector);
            selection$.addListener(listener);
            selectionChangeProducer.shamefullySendNext(null);
            selectionChangeProducer.shamefullySendNext(null);
            expect(listener.next).toHaveBeenCalledTimes(2);
            expect(listener.next).toHaveBeenCalledWith(selectionRange);
            expect(listener.next).toHaveBeenCalledWith(selectionRange);
          });
        });
      });

      describe('with invalid selection', () => {
        beforeEach(() => {
          (getSelectionRange as jest.Mock).mockReturnValueOnce(null);
        });

        it('emits null', () => {
          const selection$ = selectionSource.selections(selector);
          selection$.addListener(listener);
          selectionChangeProducer.shamefullySendNext(null);
          expect(listener.next).toHaveBeenCalledWith(null);
        });

        describe('after previous invalid selection', () => {
          beforeEach(() => {
            (getSelectionRange as jest.Mock).mockReturnValueOnce(null);
          });

          it('does not emit null a second time', () => {
            const selection$ = selectionSource.selections(selector);
            selection$.addListener(listener);
            selectionChangeProducer.shamefullySendNext(null);
            selectionChangeProducer.shamefullySendNext(null);
            expect(listener.next).toHaveBeenCalledTimes(1);
          });
        });
      });
    });
  });
});
