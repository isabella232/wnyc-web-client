import { test } from 'qunit';
import moduleForAcceptance from 'wnyc-web-client/tests/helpers/module-for-acceptance';
import { Response } from 'ember-cli-mirage';
import config from 'wnyc-web-client/config/environment';
import { currentSession } from 'wnyc-web-client/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | set password');

const email = 'test@example.com';
const username = 'user1';
const password = 'password1';
const code = 'a1b2c3';
const setPasswordUrl = '/set-password';
const setPasswordUrlWithParameters = `${setPasswordUrl}?username=${username}&email=${email}&code=${code}&verification_token=token&email_id=email123`;
const setPasswordUrlWithExpiredCode = `${setPasswordUrl}?username=${username}&email=${email}&code=expired&verification_token=token&email_id=email123`;

test('visiting /set-password with expired code', function(assert) {
  visit(setPasswordUrlWithExpiredCode);

  andThen(() => {
    assert.equal(currentURL(), setPasswordUrlWithExpiredCode);
    assert.equal(find('.account-form-heading').text().trim(), 'Create a password', 'it should show the create password form header');
    assert.equal(find('.account-form-description').text().trim(), `Create a WNYC password for ${email}.`, 'it should show the create password form desc');
  });

  fillIn('input[name=password]', password);
  click('button:contains(Create password)');

  andThen(() => {
    assert.equal(find('.account-form-heading').text().trim(), 'Oops!', 'it should show an oops page when you click create password with a bad code');
  });
});

test('visiting /set-password and creating a password and logging in', function(assert) {
  server.create('django-page', {id: '/'});
  server.create('user');
  server.create('stream');
  visit(setPasswordUrlWithParameters);

  andThen(() => {
    assert.equal(currentURL(), setPasswordUrlWithParameters);
    assert.equal(find('.account-form-heading').text().trim(), 'Create a password', 'it should show the create password form');
  });

  fillIn('input[name=password]', password);
  click('button:contains(Create password)');

  andThen(() => {
    assert.equal(find('.account-form-heading').text().trim(), 'Log in to WNYC', 'it should show a login form when you click create password with a good email code and password');
  });

  fillIn('input[name=email]', email);
  fillIn('input[name=password]', password);

  click('button[type=submit]:contains(Log in)');

  andThen(() => {
    assert.ok(currentSession(this.application).get('isAuthenticated'));
  });
});


test('visiting /set-password and getting a server error when submitting the form', function(assert) {
  server.post(`${config.authAPI}/v1/password/change-temp`, () => {
    return new Response(500);
  });

  visit(setPasswordUrlWithParameters);

  andThen(() => {
    assert.equal(currentURL(), setPasswordUrlWithParameters);
    assert.equal(find('.account-form-heading').text().trim(), 'Create a password', 'it should show the create password form');
  });

  fillIn('input[name=password]', password);
  click('button:contains(Create password)');

  andThen(() => {
    assert.equal(find('.account-form-heading').text().trim(), 'Create a password', 'it should remain on the form when the reset url returns other errors.');
  });
});
