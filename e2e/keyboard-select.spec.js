const editableParagraphId = '#editable-paragraph';
const currentSelectionId = '#current-selection';

module.exports = {
  'Test keyboard selection' : function (client) {
    client
      .url('http://127.0.0.1:8080')
      .pause(1000);

    client
      .keys([
        client.Keys.TAB,
        client.Keys.SHIFT,
        client.Keys.ARROW_RIGHT,
        client.Keys.ARROW_RIGHT,
        client.Keys.ARROW_RIGHT,
        client.Keys.ARROW_RIGHT,
      ]);

    client
      .expect.element(currentSelectionId)
      .value.to.equal('This');

    client
      .keys([
        client.Keys.ARROW_RIGHT,
        client.Keys.ARROW_RIGHT,
        client.Keys.ARROW_RIGHT,
      ]);

    client
      .expect.element(currentSelectionId)
      .value.to.equal('This is');

    client.end();
  }
};