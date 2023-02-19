/* eslint-disable max-nested-callbacks */
/* eslint-disable no-console */
/* eslint-disable no-undef */
'use-strict';

import * as assert from 'assert';
import * as fritzAPI from '../index.js';

// Some default config values for the test (Username and Password should be provided withing console arguments)
const config = {
	sessionId: '0',
};

const credentials = {
	password: 'mypassword',
	user: 'username',
};

const fakeCredentials = {
	password: 'fakePassword',
	user: 'fakeUser',
};

const connection = {
	host: 'fritz.box',
	mode: 'PBKDF2',
	useSSL: false,
};


/*
 * Get arguments from console
 * Example $ npm --host=some --user=bla --password=pass run test
 */
if(typeof process.env.npm_config_host !== 'undefined') connection.host = process.env.npm_config_host;
if(typeof process.env.npm_config_user !== 'undefined') credentials.user = process.env.npm_config_user;
if(typeof process.env.npm_config_password !== 'undefined') credentials.password = process.env.npm_config_password;

const zero = 0;
const one = 1;
const zeroString = '0';
const oneString = '1';

describe('#Session', function () {
	describe('#isValidSession with Errors', function () {
		it('Check with SessionID: 0 - It should return an Error', async function () {
			const response = await fritzAPI.isValidSession(zeroString, {host: connection.host}).
				catch((error) => {
					assert.strictEqual(typeof error, 'object', `Response should be type object but is ${typeof error}`);
					assert.strictEqual(error.message, 'Invalid SessionID provided');
				});
			assert.strictEqual(typeof response, 'undefined');
		});
		it('Check with wrong Hostname - It should return an Error', async function () {
			const response = await fritzAPI.isValidSession(oneString, {host: 'localhost'}).
				catch((error) => {
					assert.strictEqual(typeof error, 'object', `Response should be type object but is ${typeof error}`);
					assert.strictEqual(error.message, 'fetch failed');
				});
			assert.strictEqual(typeof response, 'undefined');
		});
		it('Check with wrong IP-Address - It should return an Error', async function () {
			const response = await fritzAPI.isValidSession(oneString, {host: '127.0.0.1'}).
				catch((error) => {
					assert.strictEqual(typeof error, 'object', `Response should be type object but is ${typeof error}`);
					assert.strictEqual(error.message, 'fetch failed');
				});
			assert.strictEqual(typeof response, 'undefined');
		});
	});
});
