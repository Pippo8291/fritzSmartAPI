'use-strict';

/**
 * @module deviceInfo
 * @author Marina Egner <marinafcegner@sheepCreativeStudios.de>
 * @copyright Marina Egner 2023
 */
import * as request from './request.js';
import {xmlToJson} from './parseData.js';

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
const getDeviceListInfos = async function({host, sessionId, useSSL}) {
	const response = await request.httpGetCommand({
		command: 'getdevicelistinfos',
		host,
		sessionId,
		useSSL,
	}).
		catch((error) => {
			// If request fails, reject with error message
			return Promise.reject(error);
		});
	return Promise.resolve(xmlToJson({xmlData: response}));
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
const getBasicDeviceStats = async function({host, sessionId, actorId, useSSL}) {
	const response = await request.httpGetCommand({
		actorId,
		command: 'getbasicdevicestats',
		host,
		sessionId,
		useSSL,
	}).
		catch((error) => {
			// If request fails, reject with error message
			return Promise.reject(error);
		});
	return Promise.resolve(xmlToJson({xmlData: response}));
};

export {getDeviceListInfos, getBasicDeviceStats};
