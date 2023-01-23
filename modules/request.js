'use-strict';

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

export {request};
