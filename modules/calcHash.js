'use-strict';

/**
 * @module calcHash
 * @author Marina Egner <marinafcegner@sheepCreativeStudios.de>
 * @copyright Marina Egner 2023
 */

import {createHash, pbkdf2Sync} from 'node:crypto';

/**
 * Calculates MD5 Challenge Response code
 * @param {Object} credentials - credentials details
 * @param {String} credentials.challengeCode - challenge code from Fritz!OS
 * @param {String} credentials.password - the password for the login
 * @returns {String} MD5 Challenge Response code
 */
const calcMd5Response = function({challengeCode, password}) {
	const hash = createHash('md5');
	const bufferData = Buffer.from(challengeCode + '-' + password, 'UTF-16LE');
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
	const challenge = {
		iter1: Number(challengeSplitted[1]),
		iter2: Number(challengeSplitted[3]),
		pass: Buffer.from(password, 'UTF-8'),
		salt1: Buffer.from(challengeSplitted[2], 'hex'),
		salt2: Buffer.from(challengeSplitted[4], 'hex'),
		salt2Norm: challengeSplitted[4],
	};
	const hash1 = pbkdf2Sync(challenge.pass, challenge.salt1, challenge.iter1, pbkdf2KeyLen, 'sha256').toString('hex');
	const bufferHash1 = Buffer.from(hash1, 'hex');
	const hash2 = pbkdf2Sync(bufferHash1, challenge.salt2, challenge.iter2, pbkdf2KeyLen, 'sha256').toString('hex');
	return challenge.salt2Norm + '$' + hash2;
};

export {calcMd5Response, calcPbkdf2Response};
