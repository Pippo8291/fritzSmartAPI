'use-strict';

import * as checkSession from './modules/checkSession.js';
import * as createSession from './modules/createSession.js';
import * as destroySession from './modules/destroySession.js';
import * as deviceInfo from './modules/deviceInfo.js';
import * as switchCommand from './modules/switchCommand.js';

/**
 * Login request to Fritz!OS with use of PBKDF2 (Requires Fritz!OS 7.24) or MD5 (Requires Fritz!OS 5.50) Challenge-Response Process.
 * If the Fritz!OS version does not support PBKDF2 then the function automaticly falls back to MD5.
 * @param {Object} credentials - credentials details
 * @param {String} credentials.user - the username for the login
 * @param {String} credentials.password - the password for the login
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {String=} [connection.mode=PBKDF2] - Challenge-Response Process; either 'PBKDF2' (default) or 'MD5'
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @param {Boolean} [fullOutput=false] - Get full output as object instead of just the SessionID
 * @return {Promise(String | Object)} Response SessionID as String or if fullOutput is true, the full output from rquest as Object
 */
export const doInitSession = function({user, password}, {host, mode='PBKDF2', useSSL=false}, fullOutput=false) {
	return createSession.doInitSession({password,
		user}, {host,
		mode,
		useSSL}, fullOutput);
};

/**
 * Check if Session is valid
 * @async
 * @function
 * @param {String} sessionId - current session ID
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {String} [connection.mode='PBKDF2'] - Challenge-Response Process; either 'PBKDF2' (default) or 'MD5'
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @return {Promise<Boolean>} Response if Session is valid
 */
export const isValidSession = function(sessionId, {host, mode='PBKDF2', useSSL=false}) {
	return checkSession.isValidSession(sessionId, {host,
		mode,
		useSSL});
};

/**
 * Logout user from the Fritz!OS interface
 * @async
 * @function
 * @param {String} sessionId - current session ID
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {String} [connection.mode='PBKDF2'] - Challenge-Response Process; either 'PBKDF2' (default) or 'MD5'
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @param {Boolean} [fullOutput=false] - Get full output as object instead of just the SessionID
 * @returns {Promise<String | Object>} Response SessionID as String or if fullOutput is true, the full output from rquest as Object
 */
export const doEndSession = function(sessionId, {host, mode='PBKDF2', useSSL=false}, fullOutput=false) {
	return destroySession.doEndSession(sessionId, {host,
		mode,
		useSSL}, fullOutput);
};

/**
 * Switches socket on or off
 * @async
 * @function setSwitchOnOff
 * @param {String} sessionId - current session ID
 * @param {String} actorId - Identifier of a actor, template (e.g. number) or MAC-Address of a network device
 * @param {Boolean} switchOnOff - Turns actor on or off
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @return {Promise<Boolean>} Response either true or false, depending on the device state
 */
export const setSwitchOnOff = function(sessionId, actorId, switchOnOff, {host, useSSL=false}) {
	return switchCommand.setSwitchOnOff(sessionId, actorId, switchOnOff, {host,
		useSSL});
};

/**
 * Provides the basics Information from all SmartHome devices
 * @async
 * @function getDeviceListInfos
 * @param {String} sessionId - current session ID
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @return {Promise<Object>} Response device list data as Object
 */
export const getDeviceListInfos = function(sessionId, {host, useSSL=false}) {
	return deviceInfo.getDeviceListInfos(sessionId, {host,
		useSSL});
};

/**
 * Returns the basic statistics (temperature, voltage, power, energy) of the actuator
 * @async
 * @function getBasicDeviceStats
 * @param {String} sessionId - current session ID
 * @param {String} actorId - Identifier of a actor, template (e.g. number) or MAC-Address of a network device
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @return {Promise<Object>} Response device stats data as Object
 */
export const getBasicDeviceStats = function(sessionId, actorId, {host, useSSL=false}) {
	return deviceInfo.getBasicDeviceStats(sessionId, actorId, {host,
		useSSL});
};

/**
 * Provides the basic information of all routines/triggers
 * @async
 * @function getTriggerListInfos
 * @param {String} sessionId - current session ID
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @return {Promise<Object>} Response routines/triggers data as Object
 */
export const getTriggerListInfos = function(sessionId, {host, useSSL=false}) {
	return deviceInfo.getTriggerListInfos(sessionId, {host,
		useSSL});
};

/**
 * Provides the basic information of all templates/templates
 * @async
 * @function getTemplateListInfos
 * @param {String} sessionId - current session ID
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @return {Promise<Object>} Response templates/templates data as Object
 */
export const getTemplateListInfos = function(sessionId, {host, useSSL=false}) {
	return deviceInfo.getTemplateListInfos(sessionId, {host,
		useSSL});
};
