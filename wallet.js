const { generateKeyPairSync } = require('crypto');

class Wallet {
    constructor(passphrase) {
        const { publicKey, privateKey  } = generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
              type: 'spki',
              format: 'pem'
            },
            privateKeyEncoding: {
              type: 'pkcs8',
              format: 'pem',
              cipher: 'aes-256-cbc',
              passphrase: passphrase,
            }
            });
        this.address = publicKey
        this.privateKey = privateKey
        this.passphrase = passphrase
    }
}

module.exports.Wallet = Wallet