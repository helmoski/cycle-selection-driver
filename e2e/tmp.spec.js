module.exports = {
  'Demo test Google' : function (client) {
    client
      .url('http://google.no')
      .pause(1000);

    // expect element  to be present in 1000ms
    client.expect.element('body').to.be.present.before(1000);

    // expect element <#lst-ib> to have css property 'display'
    client.expect.element('#lst-ib').to.have.css('display');

    // expect element  to have attribute 'class' which contains text 'vasq'
    client.expect.element('body').to.have.attribute('class').which.contains('vasq');

    // expect element <#lst-ib> to be an input tag
    client.expect.element('#lst-ib').to.be.an('input');

    // expect element <#lst-ib> to be visible
    client.expect.element('#lst-ib').to.be.visible;

    client.end();
  }
};