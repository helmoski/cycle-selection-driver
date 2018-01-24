const editableParagraphId = '#editable-paragraph';
const currentSelectionId = '#current-selection';
const selectSecondWordId = '#select-second-word';
const moveCaretToEndId = '#move-caret-to-end';

module.exports = {
  'Test writable driver' : function (client) {
    client
      .url('http://127.0.0.1:8080')
      .pause(1000);

    client
      .moveToElement(editableParagraphId, 0, 5)
      .mouseButtonDown()
      .moveToElement(editableParagraphId, 30, 5)
      .mouseButtonUp();

    client
      .expect.element(currentSelectionId)
      .value.to.equal('This');

    client.click(selectSecondWordId);

    client
      .expect.element(currentSelectionId)
      .value.to.equal('is');

    client.click(moveCaretToEndId);

    client
      .expect.element(currentSelectionId)
      .value.to.equal('');

    client
      .keys([
        client.Keys.SHIFT,
        client.Keys.ARROW_LEFT,
      ]);

      client
      .expect.element(currentSelectionId)
      .value.to.equal('.');

    client.end();
  }
};