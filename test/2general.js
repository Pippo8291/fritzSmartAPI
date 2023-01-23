/* eslint-disable max-nested-callbacks */
/* eslint-disable no-console */
/* eslint-disable no-undef */
'use-strict';

import * as assert from 'assert';
import * as fritzAPI from '../index.js';

// Some default config values for the test (Username and Password should be provided withing console arguments)
const config = {
	credentials: {
		fakePassword: 'fakePassword',
		fakeUser: 'fakeUser',
		host: 'fritz.box',
		password: 'password',
		user: 'username',
	},
	sessionId: 0,
};


/*
 * Get arguments from console
 * Example $ npm --host=some --user=bla --password=pass run test
 */
if(typeof process.env.npm_config_host !== 'undefined') config.credentials.host = process.env.npm_config_host;
if(typeof process.env.npm_config_user !== 'undefined') config.credentials.user = process.env.npm_config_user;
if(typeof process.env.npm_config_password !== 'undefined') config.credentials.password = process.env.npm_config_password;

const zero = 0;

describe('#General', function () {
	describe('#doInitSession with PBKDF2', function () {
		it('Connect - It should return a object with a valid Session ID', async function () {
			const response = await fritzAPI.doInitSession({
				host: config.credentials.host,
				mode: 'PBKDF2',
				password: config.credentials.password,
				useSSL: false,
				user: config.credentials.user,
			});
			config.sessionId = response.SessionInfo.SID;
			assert.strictEqual(typeof response, 'object', `Response should be type object but is ${typeof response}`);
			assert.strictEqual(typeof response.SessionInfo.SID, 'string', `The SID should be type string but is ${typeof response.SessionInfo.SID}`);
			assert.notStrictEqual(response.SessionInfo.SID, zero);
		});
	});
	describe('#fromSession', function () {
		it('Get General Information from Fritz!OS');
	});
});
