/* eslint-disable no-console */
/* eslint-disable no-undef */
'use-strict';

import * as fritzAPI from '../index.js';
import {config} from './config.js';
import {equal} from 'assert';


fritzAPI.doInitSession({
	host: config.credentials.host,
	mode: 'MD5',
	password: config.credentials.password,
	useSSL: false,
	user: config.credentials.user,
}).then((response) => console.log(response)).
	catch((error) => console.log(error));

describe('Array', function () {
	describe('#indexOf()', function () {
		it('should return -1 when the value is not present', function () {
			equal([1, 2, 3].indexOf(4), -1);
		});
	});
});
