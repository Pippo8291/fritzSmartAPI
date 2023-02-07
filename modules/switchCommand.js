'use-strict';

/**
 * @module deviceInfo
 * @author Marina Egner <marinafcegner@sheepCreativeStudios.de>
 * @copyright Marina Egner 2023
 */
import * as request from './request.js';

/**
 * Switches socket on or off
 * @async
 * @function setSwitchOnOff
 * @param {Number} sessionId - current session ID
 * @param {String} actorId - Identifier of a actor, template (e.g. number) or MAC-Address of a network device
 * @param {Boolean} switchOnOff - Turns actor on or off
 * @param {Object} connection - connection details
 * @param {String} connection.host - hostname or IP-Address
 * @param {Boolean} [connection.useSSL=false] - true if SSL connection over https should be used (default is false)
 * @return {Promise<Boolean>}  Response either true or false, depending on the device state
 */
const setSwitchOnOff = async function(sessionId, actorId, switchOnOff, {host, useSSL=false}) {
	let command = 'setswitchoff';
	if(switchOnOff) command = 'setswitchon';
	const response = await request.httpGetCommand({
		actorId,
		command,
		host,
		sessionId,
		useSSL,
	}).
		catch((error) => {
			// If request fails, reject with error message
			return Promise.reject(error);
		});
	if(response === '1') return Promise.resolve(true);
	return Promise.resolve(false);
};


export {setSwitchOnOff};
