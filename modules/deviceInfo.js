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
 * @param {String} sessionId - current session ID
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @return {Promise<Object>} Response device list data as Object
 */
const getDeviceListInfos = async function(sessionId, {host, useSSL=false}) {
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
 * @param {String} sessionId - current session ID
 * @param {String} actorId - Identifier of a actor, template (e.g. number) or MAC-Address of a network device
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @return {Promise<Object>} Response device stats data as Object
 */
const getBasicDeviceStats = async function(sessionId, actorId, {host, useSSL=false}) {
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
const getTriggerListInfos = async function(sessionId, {host, useSSL=false}) {
	const response = await request.httpGetCommand({
		command: 'gettriggerlistinfos',
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
 * Provides the basic information of all templates/templates
 * @async
 * @function getTemplateListInfos
 * @param {String} sessionId - current session ID
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @return {Promise<Object>} Response templates/templates data as Object
 */
const getTemplateListInfos = async function(sessionId, {host, useSSL=false}) {
	const response = await request.httpGetCommand({
		command: 'gettemplatelistinfos',
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

export {getDeviceListInfos, getBasicDeviceStats, getTemplateListInfos, getTriggerListInfos};
