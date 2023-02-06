'use-strict';

/**
 * @module destroySession
 * @author Marina Egner <marinafcegner@sheepCreativeStudios.de>
 * @copyright Marina Egner 2023
 */
import * as request from './request.js';
import {parseSessionId, xmlToJson} from './parseData.js';

// Define some Magic numbers for the version which is provided to the login service
const version = {
	MD5: 1,
	PBKDF2: 2,
};

/**
 * Logout user from the Fritz!OS interface
 * @async
 * @function
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {Number} connection.sessionId - current session ID
 * @param {Number} [connection.mode='PBKDF2'] - Challenge-Response Process; either 'PBKDF2' (default) or 'MD5'
 * @param {Boolean} [connection.fullOutput=false] - Get full output as object instead of just the SessionID
 * @return {Promise(String | Object)} Response SessionID as String or if fullOutput is true, the full output from request as Object
 */
const doEndSession = async function({host, sessionId, mode='PBKDF2', useSSL=false, fullOutput=false}) {
	let processVersion = version.MD5;

	// Force mode if selected
	if(mode === 'PBKDF2') processVersion = version.PBKDF2;
	const response = await request.httpGetRequest({
		host,
		parameters: new URLSearchParams({
			logout: sessionId,
			sid: sessionId,
			version: processVersion,
		}),
		service: 'login_sid.lua',
		useSSL,
	}).
		catch((error) => {
			// If request fails, reject with error message
			return Promise.reject(error);
		});

	if(fullOutput) return Promise.resolve(xmlToJson({xmlData: response}));
	return Promise.resolve(parseSessionId(xmlToJson({xmlData: response})));
};

export {doEndSession};
