const editableParagraphId = '#editable-paragraph';
const currentSelectionId = '#current-selection';
const selectSecondWordId = '#select-second-word';

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

    client.end();
  }
};