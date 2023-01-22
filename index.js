/* eslint-disable no-console */
'use-strict';

import {createSession} from './modules/createSession.js';
import {inspect} from 'util';

createSession.getSession({
	host: 'fritz.box',
	mode: 'PBKDF2',
	password: 'testpassword',
	user: 'test',
}).then((response) => {
	console.log(inspect(response, {
		colors: true,
		depth: null,
		showHidden: false,
	}));
}).catch((error) => {
	console.log(error);
});
