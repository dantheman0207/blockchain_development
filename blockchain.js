const { Block } = require('./block')
const { Transaction } = require('./transaction')

class Blockchain {
    constructor(minerAddress, miningReward = 100, difficulty = 2) {
        this.blocks = []
        this.pendingTransactions = []
        this.miningReward = miningReward
        this.minerAddress = minerAddress
        this.difficulty = difficulty
        this.createGenesisBlock()
    }
    createGenesisBlock () {
        if (this.blocks.length === 0) {
            const block = new Block()
            this.blocks.push(block)
        }
    }
    addBlock(block) {
        if (!block) return
        this.blocks.push(block)
    }
    addBlocks(blocks = []) {
        for (let block of blocks) {
            block = Object.assign(new Block(), block)
            this.addBlock(block)
        }
    }
    addTransaction(transaction) {
        this.pendingTransactions.push(transaction)
        if (this.pendingTransactions.length > 10) {
            this.minePendingTransactions()
        }
    }
    minePendingTransactions() {
        const previousHash = this.getLastBlock().hash()
        const block = new Block(previousHash)
        block.addTransactions(this.pendingTransactions)
        block.mine(this.difficulty)
        this.blocks.push(block)
        // add reward for miner
        const rewardTransaction = new Transaction(null, this.minerAddress, this.miningReward)
        this.pendingTransactions = [rewardTransaction]
    }
    getAccountBalance(account) {
        let accountBalance = 0
        for (const block of this.blocks) {
            for (const transaction of block.data) {
                if (account === transaction.sender) {
                    accountBalance -= transaction.amount
                } else if (account === transaction.receiver) {
                    accountBalance += transaction.amount
                }
            }
        }
        return accountBalance
    }
    getLastBlock() {
        const length = this.blocks.length
        if (length > 0) {
            return this.blocks[length-1]
        }
    }
    validateChain() {
        for (let i = 1; i < this.blocks.length; i++) {
            const previousBlock = this.blocks[i-1]
            const block = this.blocks[i]
            if (block.previousHash !== previousBlock.hash()) {
                return false
            }
        }
        return true
    }
}

module.exports.Blockchain = Blockchain