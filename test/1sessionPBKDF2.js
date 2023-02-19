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
const zeroString = '0';
const defaulTimeout = 10000;

describe('#Session', function () {
	describe('#doInitSession with PBKDF2', function () {
		// eslint-disable-next-line no-invalid-this
		this.timeout(defaulTimeout);
		it('Connect - It should return a object with a valid Session ID', async function () {
			const response = await fritzAPI.doInitSession(credentials, {host: connection.host,
				mode: 'PBKDF2',
				useSSL: false}, true);
			config.sessionId = response.SessionInfo.SID;
			assert.strictEqual(typeof response, 'object', `Response should be type object but is ${typeof response}`);
			assert.strictEqual(typeof response.SessionInfo.SID, 'string', `The SID should be type string but is ${typeof response.SessionInfo.SID}`);
			assert.notStrictEqual(response.SessionInfo.SID, zeroString);
		});
		it('Check - It should return boolean true if Session is valid', async function () {
			const response = await fritzAPI.isValidSession(config.sessionId, {host: connection.host,
				mode: 'PBKDF2',
				useSSL: false});
			assert.strictEqual(typeof response, 'boolean', `Response should be type boolean but is ${typeof response}`);
			assert.strictEqual(response, true);
		});
		it('Logout - It should return a object with a invalid Session ID', async function () {
			const response = await fritzAPI.doEndSession(config.sessionId, {host: connection.host,
				mode: 'PBKDF2',
				useSSL: false}, true);
			assert.strictEqual(typeof response, 'object', `Response should be type object but is ${typeof response}`);
			assert.strictEqual(typeof response.SessionInfo.SID, 'number', `The SID should be type number but is ${typeof response.SessionInfo.SID}`);
			assert.strictEqual(response.SessionInfo.SID, zero);
		});
		it('Check - It should return boolean false if Session is invalid', async function () {
			const response = await fritzAPI.isValidSession(config.sessionId, {host: connection.host,
				mode: 'PBKDF2',
				useSSL: false});
			assert.strictEqual(typeof response, 'boolean', `Response should be type boolean but is ${typeof response}`);
			assert.strictEqual(response, false);
		});
	});

	describe('#Check login (PBPBKDF2) without full output and without optional params', function () {
		it('Connect - It should return a string with a valid Session ID', async function () {
			const response = await fritzAPI.doInitSession(credentials, {host: connection.host});
			config.sessionId = response;
			assert.strictEqual(typeof response, 'string', `The SID should be type string but is ${typeof response}`);
			assert.notStrictEqual(response, zeroString);
		});
		it('Check - It should return boolean true if Session is valid', async function () {
			const response = await fritzAPI.isValidSession(config.sessionId, {host: connection.host});
			assert.strictEqual(typeof response, 'boolean', `Response should be type boolean but is ${typeof response}`);
			assert.strictEqual(response, true);
		});
		it('Logout - It should return a string with a invalid Session ID', async function () {
			const response = await fritzAPI.doEndSession(config.sessionId, {host: connection.host});
			assert.strictEqual(typeof response, 'string', `The SID should be type string but is ${typeof response}`);
			assert.strictEqual(response, zeroString);
		});
		it('Check - It should return boolean false if Session is invalid', async function () {
			const response = await fritzAPI.isValidSession(config.sessionId, {host: connection.host});
			assert.strictEqual(typeof response, 'boolean', `Response should be type boolean but is ${typeof response}`);
			assert.strictEqual(response, false);
		});
	});
});
