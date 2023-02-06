'use-strict';

import * as checkSession from './modules/checkSession.js';
import * as createSession from './modules/createSession.js';
import * as destroySession from './modules/destroySession.js';
import * as deviceInfo from './modules/deviceInfo.js';

/**
 * Login request to Fritz!OS with use of PBKDF2 (Requires Fritz!OS 7.24) or MD5 (Requires Fritz!OS 5.50) Challenge-Response Process.
 * If the Fritz!OS version does not support PBKDF2 then the function automaticly falls back to MD5.
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {String} connection.user - the username for the login
 * @param {String} connection.password - the password for the login
 * @param {String=} [connection.mode=PBKDF2] - Challenge-Response Process; either 'PBKDF2' (default) or 'MD5'
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @param {Boolean} [connection.fullOutput=false] - Get full output as object instead of just the SessionID
 * @return {Promise(String | Object)} Response SessionID as String or if fullOutput is true, the full output from rquest as Object
 */
export const doInitSession = function({host, user, password, mode = 'PBKDF2', useSSL=false, fullOutput=false}) {
	return createSession.doInitSession({fullOutput,
		host,
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
export const isValidSession = function({host, sessionId, mode = 'PBKDF2', useSSL=false}) {
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
 * @param {Boolean} [connection.fullOutput=false] - Get full output as object instead of just the SessionID
 * @return {Promise(String | Object)} Response SessionID as String or if fullOutput is true, the full output from rquest as Object
 */
export const doEndSession = function({host, sessionId, mode = 'PBKDF2', useSSL=false, fullOutput=false}) {
	return destroySession.doEndSession({fullOutput,
		host,
		mode,
		sessionId,
		useSSL});
};

/**
 * Provides the basics Information from all SmartHome devices
 * @async
 * @function getDeviceListInfos
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {Number} connection.sessionId - current session ID
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @return {Promise<Object>} Response device list data as Object
 */
export const getDeviceListInfos = function({host, sessionId, useSSL=false}) {
	return deviceInfo.getDeviceListInfos({host,
		sessionId,
		useSSL});
};

/**
 * Returns the basic statistics (temperature, voltage, power, energy) of the actuator
 * @async
 * @function getBasicDeviceStats
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {Number} connection.sessionId - current session ID
 * @param {String} connection.actorId - Identifier of a actor, template (e.g. number) or MAC-Address of a network device
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @return {Promise<Object>} Response device stats data as Object
 */
export const getBasicDeviceStats = function({host, sessionId, actorId, useSSL=false}) {
	return deviceInfo.getBasicDeviceStats({actorId,
		host,
		sessionId,
		useSSL});
};
