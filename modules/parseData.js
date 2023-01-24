'use-strict';

/**
 * @module parseData
 * @author Marina Egner <marinafcegner@sheepCreativeStudios.de>
 * @copyright Marina Egner 2023
 */

import {XMLParser} from 'fast-xml-parser';

const parseData = {};

/**
 * Convert XML Data into a Object
 * @function xmlToJson
 * @param {Object} parseData - Input for function
 * @param {String} parseData.xmlData - XML Data
 * @returns {Object} Response Data as Object
 */
parseData.xmlToJson = function({xmlData}) {
	const parser = new XMLParser({ignoreDeclaration: true});
	return parser.parse(xmlData);
};

export {parseData};
