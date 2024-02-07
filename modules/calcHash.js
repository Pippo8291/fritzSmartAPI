'use-strict';

/**
 * @module calcHash
 * @author Marina Egner <marinafcegner@sheepCreativeStudios.de>
 * @copyright Marina Egner 2023
 */
import {
	pbkdf2Sync,
} from 'browser-crypto';

/**
 * Calculates MD5 Challenge Response code
 * @param {Object} credentials - credentials details
 * @param {String} credentials.challengeCode - challenge code from Fritz!OS
 * @param {String} credentials.password - the password for the login
 * @returns {String} MD5 Challenge Response code
 */
const calcMd5Response = function({challengeCode, password}) {
	const hash = createHash('md5');
	const bufferData = Buffer.from(challengeCode + '-' + password, 'utf16le');
	const md5Hash = hash.update(bufferData).digest('hex');
	return challengeCode + '-' + md5Hash;
};

// Length of the derived key for hash algorithm
const pbkdf2KeyLen = 32;

/**
 * Calculates PBKDF2 Challenge Response code
 * @param {Object} credentials - credentials details
 * @param {String} credentials.challengeCode - challenge code from Fritz!OS
 * @param {String} credentials.password - the password for the login
 * @returns {String} PBKDF2 Challenge Response code
 */
const calcPbkdf2Response = function({challengeCode, password}) {
	const challengeSplitted = challengeCode.split('$');
	const passUtf8 = new TextEncoder().encode(password);
	const salt1Hex = challengeSplitted[2];
	const salt2Hex = challengeSplitted[4];
	const salt1 = hexStringToUint8Array(salt1Hex);
	const salt2 = hexStringToUint8Array(salt2Hex);
	const iter1 = Number(challengeSplitted[1]);
	const iter2 = Number(challengeSplitted[3]);

	const hash1 = pbkdf2Sync(passUtf8, salt1, iter1, pbkdf2KeyLen, 'sha256').toString('hex');
	const hash1Bytes = hexStringToUint8Array(hash1);
	const hash2 = pbkdf2Sync(hash1Bytes, salt2, iter2, pbkdf2KeyLen, 'sha256').toString('hex');

	return challengeSplitted[4] + '$' + hash2;
};

// Helper function to convert hex string to Uint8Array
const hexStringToUint8Array = function(hexString) {
	const bytes = [];
	// eslint-disable-next-line no-magic-numbers,id-length
	for(let i = 0; i < hexString.length; i += 2) {
		// eslint-disable-next-line no-magic-numbers
		bytes.push(parseInt(hexString.substr(i, 2), 16));
	}
	return new Uint8Array(bytes);
};

export {calcMd5Response, calcPbkdf2Response};
