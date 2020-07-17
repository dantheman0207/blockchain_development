'use strict'
const crypto = require('crypto');

class Block {
    constructor(previousHash) {
        this.previousHash = previousHash
        this.timestamp = Date.now() //unix time
        this.nonce = 0
        this.data = []
    }
    hash() {
        const blockString = JSON.stringify(this)
        const hash = crypto.createHash('sha256').update(blockString).digest('hex');
        return hash
    }
    hashPrefix(difficulty = 2) {
        return this.hash().substring(0, difficulty)
    }
    addTransactions(transactions = []) {
        for (const transaction of transactions) {
            transaction.verifyTransaction()
        }
        this.data = transactions
    }
    mine(difficulty = 2) {
        const leadingZeroes = '0'.repeat(difficulty)
        let prefix = this.hashPrefix(difficulty)
        while (prefix !== leadingZeroes) {
            this.nonce++
            prefix = this.hashPrefix()
        }
    }
}

module.exports.Block = Block