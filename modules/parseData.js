'use-strict';

/**
 * @module parseData
 * @author Marina Egner <marinafcegner@sheepCreativeStudios.de>
 * @copyright Marina Egner 2023
 */

import {XMLParser} from 'fast-xml-parser';

/**
 * Convert XML Data into a Object
 * @function xmlToJson
 * @param {Object} parseData - Input for function
 * @param {String} parseData.xmlData - XML Data
 * @returns {Object} Response Data as Object
 */
const xmlToJson = function({xmlData}) {
	const parser = new XMLParser({ignoreDeclaration: true});
	return parser.parse(xmlData);
};

/**
 * Parse Session ID from login response object
 * @function parseSessionId
 * @param {Object} parseData - Object with Session ID
 * @returns {String} Response the SessionID
 */
const parseSessionId = function(parseData) {
	return parseData.SessionInfo.SID;
};

export {parseSessionId, xmlToJson};
