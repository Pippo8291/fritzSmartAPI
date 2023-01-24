'use-strict';

/**
 * @module request
 * @author Marina Egner <marinafcegner@sheepCreativeStudios.de>
 * @copyright Marina Egner 2023
 */
const request = {};

/**
 * Performs a GET Request to a Fritz!OS Service
 * @async
 * @function httpGetRequest
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {String} connection.service - the Fritz!OS service you want to call
 * @param {URLSearchParams} connection.parameters - GET Request parameter list
 * @param {Boolean} connection.useSSL - true if SSL connection over https should be used
 * @returns {Promise<String>} Response XML Data as text
 */

request.httpGetRequest = async function({host, service, parameters, useSSL}) {
	let urlStart = 'http';
	if(useSSL) urlStart = 'https';
	const url = `${urlStart}://${host}/${service}?${parameters}`;
	const response = await fetch(url, {
		method: 'GET',
	}).
		catch((error) => {
			// Catch if connection failes
			return Promise.reject(error);
		});
	if(response.ok)	return Promise.resolve(response.text());
	return Promise.reject(response);
};

/**
 * Performs a GET Command Request to a Fritz!OS Service
 * @async
 * @function httpGetCommand
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {String} [connection.actorId] - Identifier of a actor, template (e.g. number) or MAC-Address of a network device
 * @param {String} [connection.command] - The AHA-Interface command to be executed
 * @param {String} [connection.parameter] - Additional parameter for some of the commands
 * @param {String} connection.sessionId - Current valid Session ID
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @returns {Promise<String>} Response XML or text data (Depending on the command)
 */
request.httpGetCommand = async function({host, actorId, command, parameter, sessionId, useSSL=false}) {
	const parameters = new URLSearchParams({sid: sessionId});
	if(typeof actorId !== 'undefined') parameters.append('ain', actorId);
	if(typeof command !== 'undefined') parameters.append('switchcmd', command);
	if(typeof parameter !== 'undefined') parameters.append('param', parameter);
	const response = await request.httpGetRequest({
		host,
		parameters,
		service: 'webservices/homeautoswitch.lua',
		useSSL,
	}).
		catch((error) => {
			// If request fails, reject with error message
			return Promise.reject(error);
		});
	return Promise.resolve(response);
};

export {request};
