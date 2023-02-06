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
const one = 1;

describe('#Session', function () {
	describe('#doInitSession with MD5', function () {
		it('Connect - It should return a object with a valid Session ID', async function () {
			const response = await fritzAPI.doInitSession({fullOutput: true,
				host: config.credentials.host,
				mode: 'MD5',
				password: config.credentials.password,
				useSSL: false,
				user: config.credentials.user});
			config.sessionId = response.SessionInfo.SID;
			assert.strictEqual(typeof response, 'object', `Response should be type object but is ${typeof response}`);
			assert.strictEqual(typeof response.SessionInfo.SID, 'string', `The SID should be type string but is ${typeof response.SessionInfo.SID}`);
			assert.notStrictEqual(response.SessionInfo.SID, zero);
		});
		it('Check - It should return boolean true if Session is valid', async function () {
			const response = await fritzAPI.isValidSession({
				host: config.credentials.host,
				mode: 'MD5',
				sessionId: config.sessionId,
				useSSL: false,
			});
			assert.strictEqual(typeof response, 'boolean', `Response should be type boolean but is ${typeof response}`);
			assert.strictEqual(response, true);
		});
		it('Logout - It should return a object with a invalid Session ID', async function () {
			const response = await fritzAPI.doEndSession({fullOutput: true,
				host: config.credentials.host,
				mode: 'MD5',
				sessionId: config.sessionId,
				useSSL: false});
			assert.strictEqual(typeof response, 'object', `Response should be type object but is ${typeof response}`);
			assert.strictEqual(typeof response.SessionInfo.SID, 'number', `The SID should be type number but is ${typeof response.SessionInfo.SID}`);
			assert.strictEqual(response.SessionInfo.SID, zero);
		});
		it('Check - It should return boolean false if Session is invalid', async function () {
			const response = await fritzAPI.isValidSession({
				host: config.credentials.host,
				mode: 'MD5',
				sessionId: config.sessionId,
				useSSL: false,
			});
			assert.strictEqual(typeof response, 'boolean', `Response should be type boolean but is ${typeof response}`);
			assert.strictEqual(response, false);
		});
	});

	describe('#doInitSession with PBKDF2', function () {
		it('Connect - It should return a object with a valid Session ID', async function () {
			const response = await fritzAPI.doInitSession({fullOutput: true,
				host: config.credentials.host,
				mode: 'PBKDF2',
				password: config.credentials.password,
				useSSL: false,
				user: config.credentials.user});
			config.sessionId = response.SessionInfo.SID;
			assert.strictEqual(typeof response, 'object', `Response should be type object but is ${typeof response}`);
			assert.strictEqual(typeof response.SessionInfo.SID, 'string', `The SID should be type string but is ${typeof response.SessionInfo.SID}`);
			assert.notStrictEqual(response.SessionInfo.SID, zero);
		});
		it('Check - It should return boolean true if Session is valid', async function () {
			const response = await fritzAPI.isValidSession({
				host: config.credentials.host,
				mode: 'PBKDF2',
				sessionId: config.sessionId,
				useSSL: false,
			});
			assert.strictEqual(typeof response, 'boolean', `Response should be type boolean but is ${typeof response}`);
			assert.strictEqual(response, true);
		});
		it('Logout - It should return a object with a invalid Session ID', async function () {
			const response = await fritzAPI.doEndSession({fullOutput: true,
				host: config.credentials.host,
				mode: 'PBKDF2',
				sessionId: config.sessionId,
				useSSL: false});
			assert.strictEqual(typeof response, 'object', `Response should be type object but is ${typeof response}`);
			assert.strictEqual(typeof response.SessionInfo.SID, 'number', `The SID should be type number but is ${typeof response.SessionInfo.SID}`);
			assert.strictEqual(response.SessionInfo.SID, zero);
		});
		it('Check - It should return boolean false if Session is invalid', async function () {
			const response = await fritzAPI.isValidSession({
				host: config.credentials.host,
				mode: 'PBKDF2',
				sessionId: config.sessionId,
				useSSL: false,
			});
			assert.strictEqual(typeof response, 'boolean', `Response should be type boolean but is ${typeof response}`);
			assert.strictEqual(response, false);
		});
	});

	describe('#Check login (MD5) without full output and without optional params', function () {
		it('Connect - It should return a string with a valid Session ID', async function () {
			const response = await fritzAPI.doInitSession({
				host: config.credentials.host,
				mode: 'MD5',
				password: config.credentials.password,
				user: config.credentials.user,
			});
			config.sessionId = response;
			assert.strictEqual(typeof response, 'string', `The SID should be type string but is ${typeof response}`);
			assert.notStrictEqual(response, zero);
		});
		it('Check - It should return boolean true if Session is valid', async function () {
			const response = await fritzAPI.isValidSession({
				host: config.credentials.host,
				mode: 'MD5',
				sessionId: config.sessionId,
			});
			assert.strictEqual(typeof response, 'boolean', `Response should be type boolean but is ${typeof response}`);
			assert.strictEqual(response, true);
		});
		it('Logout - It should return a string with a invalid Session ID', async function () {
			const response = await fritzAPI.doEndSession({
				host: config.credentials.host,
				mode: 'MD5',
				sessionId: config.sessionId,
			});
			assert.strictEqual(typeof response, 'number', `The SID should be type number but is ${typeof response}`);
			assert.strictEqual(response, zero);
		});
		it('Check - It should return boolean false if Session is invalid', async function () {
			const response = await fritzAPI.isValidSession({
				host: config.credentials.host,
				mode: 'MD5',
				sessionId: config.sessionId,
			});
			assert.strictEqual(typeof response, 'boolean', `Response should be type boolean but is ${typeof response}`);
			assert.strictEqual(response, false);
		});
	});

	describe('#Check login (PBPBKDF2) without full output and without optional params', function () {
		it('Connect - It should return a string with a valid Session ID', async function () {
			const response = await fritzAPI.doInitSession({
				host: config.credentials.host,
				password: config.credentials.password,
				user: config.credentials.user,
			});
			config.sessionId = response;
			assert.strictEqual(typeof response, 'string', `The SID should be type string but is ${typeof response}`);
			assert.notStrictEqual(response, zero);
		});
		it('Check - It should return boolean true if Session is valid', async function () {
			const response = await fritzAPI.isValidSession({
				host: config.credentials.host,
				sessionId: config.sessionId,
			});
			assert.strictEqual(typeof response, 'boolean', `Response should be type boolean but is ${typeof response}`);
			assert.strictEqual(response, true);
		});
		it('Logout - It should return a string with a invalid Session ID', async function () {
			const response = await fritzAPI.doEndSession({
				host: config.credentials.host,
				sessionId: config.sessionId,
			});
			assert.strictEqual(typeof response, 'number', `The SID should be type number but is ${typeof response}`);
			assert.strictEqual(response, zero);
		});
		it('Check - It should return boolean false if Session is invalid', async function () {
			const response = await fritzAPI.isValidSession({
				host: config.credentials.host,
				sessionId: config.sessionId,
			});
			assert.strictEqual(typeof response, 'boolean', `Response should be type boolean but is ${typeof response}`);
			assert.strictEqual(response, false);
		});
	});

	describe('#isValidSession with Errors', function () {
		it('Check with SessionID: 0 - It should return an Error', async function () {
			const response = await fritzAPI.isValidSession({
				host: config.credentials.host,
				mode: 'PBKDF2',
				sessionId: zero,
				useSSL: false,
			}).
				catch((error) => {
					assert.strictEqual(typeof error, 'object', `Response should be type object but is ${typeof error}`);
					assert.strictEqual(error.message, 'Invalid SessionID provided');
				});
			assert.strictEqual(typeof response, 'undefined');
		});
		it('Check with wrong Hostname - It should return an Error', async function () {
			const response = await fritzAPI.isValidSession({
				host: 'localhost',
				mode: 'PBKDF2',
				sessionId: one,
				useSSL: false,
			}).
				catch((error) => {
					assert.strictEqual(typeof error, 'object', `Response should be type object but is ${typeof error}`);
					assert.strictEqual(error.message, 'fetch failed');
				});
			assert.strictEqual(typeof response, 'undefined');
		});
		it('Check with wrong IP-Address - It should return an Error', async function () {
			const response = await fritzAPI.isValidSession({
				host: '127.0.0.1',
				mode: 'PBKDF2',
				sessionId: one,
				useSSL: false,
			}).
				catch((error) => {
					assert.strictEqual(typeof error, 'object', `Response should be type object but is ${typeof error}`);
					assert.strictEqual(error.message, 'fetch failed');
				});
			assert.strictEqual(typeof response, 'undefined');
		});
	});
});
