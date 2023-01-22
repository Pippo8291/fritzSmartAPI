/* eslint-disable no-console */
/* eslint-disable no-undef */
'use-strict';

import {equal} from 'assert';
import {readFileSync} from 'fs';

const rawConfigData = readFileSync('./test/config.json');
const configData = JSON.parse(rawConfigData);

const {host, user, password} = configData.credentials;
console.log({
	host,
	password,
	user,
});

describe('Array', function () {
	describe('#indexOf()', function () {
		it('should return -1 when the value is not present', function () {
			equal([1, 2, 3].indexOf(4), -1);
		});
	});
});
