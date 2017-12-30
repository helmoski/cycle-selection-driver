const editableParagraphId = '#editable-paragraph';
const currentSelectionId = '#current-selection';

module.exports = {
  'Test mouse selection' : function (client) {
    client
      .url('http://localhost:8080')
      .pause(1000);

    client.moveToElement(editableParagraphId, 0, 5)
      .mouseButtonDown()
      .moveToElement(editableParagraphId, 30, 5);

    client.expect.element(currentSelectionId)
      .value.to.equal('This');

    client.moveToElement(editableParagraphId, 115, 5)
      .mouseButtonUp();

    client.expect.element(currentSelectionId)
      .value.to.equal('This is an editable');
    
    client.end();
  }
};