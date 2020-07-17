const crypto = require('crypto');

class Transaction {
    constructor(sender, receiver, amount) {
        this.sender = sender
        this.receiver = receiver
        this.amount = amount
        this.timestamp = Date.now() // unix time
    }
    hash() {
        const transactionString = JSON.stringify(this)
        const hash = crypto.createHash('sha256').update(transactionString).digest('hex');
        return hash
    }
    signTransaction(privateKey, passphrase) {
        const sign = crypto.createSign('SHA256')
        sign.update(this.hash())
        sign.end()
        this.signature = sign.sign({
            key: privateKey,
            passphrase: passphrase
          }, 'hex')
        return this.signature
    }
    verifyTransaction() {
        // special case: miner reward has no from address
        if (this.sender === null) {
            return true
        }
        const verify = crypto.createVerify('SHA256')
        verify.update(this.hash())
        verify.end()
        return verify.verify(this.sender, this.signature)
    }
}

module.exports.Transaction = Transaction