/**
 * Generates random string and password hashing
*/
const crypto = require('crypto')

module.exports = {
    randomString: (length = 32) => {
        let bytes = crypto.randomBytes(length / 2);
        return bytes.toString('hex');
    },
    hashPassword: (password, salt) => {
        return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    },
}