'use-strict';

import {checkSession} from './modules/checkSession.js';
import {createSession} from './modules/createSession.js';
import {destroySession} from './modules/destroySession.js';

/**
 * Login request to Fritz!OS with use of PBKDF2 (Requires Fritz!OS 7.24) or MD5 (Requires Fritz!OS 5.50) Challenge-Response Process.
 * If the Fritz!OS version does not support PBKDF2 then the function automaticly falls back to MD5.
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {String} connection.user - the username for the login
 * @param {String} connection.password - the password for the login
 * @param {String=} [connection.mode=PBKDF2] - Challenge-Response Process; either 'PBKDF2' (default) or 'MD5'
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @returns {Promise<Object>} Response session data as Object
 */
export const doInitSession = function({host, user, password, mode, useSSL}) {
	return createSession.getSession({host,
		mode,
		password,
		useSSL,
		user});
};

/**
 * Check if Session is valid
 * @async
 * @function
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {Number} connection.sessionId - current session ID
 * @param {Number} [connection.mode='PBKDF2'] - Challenge-Response Process; either 'PBKDF2' (default) or 'MD5'
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @return {Promise<Boolean>} Response if Session is valid
 */
export const isValidSession = function({host, sessionId, mode, useSSL}) {
	return checkSession.isValidSession({host,
		mode,
		sessionId,
		useSSL});
};

/**
 * Logout user from the Fritz!OS interface
 * @async
 * @function
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {Number} connection.sessionId - current session ID
 * @param {Number} [connection.mode='PBKDF2'] - Challenge-Response Process; either 'PBKDF2' (default) or 'MD5'
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @return {Promise<Object>} Response session data as Object
 */
export const doEndSession = function({host, sessionId, mode, useSSL}) {
	return destroySession({host,
		mode,
		sessionId,
		useSSL});
};
