/* eslint-disable max-len */
/* eslint-disable max-nested-callbacks */
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
	mode: 'MD5',
	useSSL: false,
};

/*
 * Get arguments from console
 * Example $ npm --host=some --user=bla --password=pass run test
 */
if(typeof process.env.npm_config_host !== 'undefined') connection.host = process.env.npm_config_host;
if(typeof process.env.npm_config_user !== 'undefined') credentials.user = process.env.npm_config_user;
if(typeof process.env.npm_config_password !== 'undefined') credentials.password = process.env.npm_config_password;

const zeroString = '0';
const defaulTimeout = 10000;

describe('#General', function () {
	// eslint-disable-next-line no-invalid-this
	this.timeout(defaulTimeout);
	describe('#doInitSession with MD5', function () {
		it('Connect - It should return a object with a valid Session ID', async function () {
			const response = await fritzAPI.doInitSession(credentials, connection);
			config.sessionId = response;
			assert.strictEqual(typeof response, 'string', `The SID should be type string but is ${typeof response}`);
			assert.notStrictEqual(response, zeroString);
		});
	});
	describe('#getDeviceListInfos', function () {
		it('It should return a object with a full list of devices', async function () {
			const response = await fritzAPI.getDeviceListInfos(config.sessionId, connection);
			assert.strictEqual(typeof response, 'object', `Response should be type object but is ${typeof response}`);
			assert.strictEqual(typeof response.devicelist, 'object', `devicelist should be type object but is ${typeof response.devicelist}`);
			assert.strictEqual(typeof response.devicelist.device, 'object', `devicelist.device should be type object but is ${typeof response.devicelist.device}`);
			assert.strictEqual(typeof response.devicelist.group, 'object', `devicelist.group should be type object but is ${typeof response.devicelist.group}`);
		});
		it('Get more Information from Fritz!OS');
		it('Get more Information from Fritz!OS');
	});
	describe('#doEndSession with MD5', function () {
		it('Logout - It should return a object with a invalid Session ID', async function () {
			const response = await fritzAPI.doEndSession(config.sessionId, connection);
			assert.strictEqual(typeof response, 'string', `The SID should be type string but is ${typeof response}`);
			assert.strictEqual(response, zeroString);
		});
	});
});
