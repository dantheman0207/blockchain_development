const { Blockchain } = require('./blockchain')
const { Block } = require('./block')
const { Transaction } = require('./transaction')
const { Wallet } = require('./wallet')

const passphrase = 'secret passphrase'
const myWallet = new Wallet(passphrase)
const myAddress = myWallet.address
const privateKey = myWallet.privateKey

const coin = new Blockchain(myWallet)

coin.createGenesisBlock()
const genesisBlock = coin.getLastBlock()

const genesisHash = genesisBlock.hash()
const newBlock = new Block(genesisHash)

const start = new Date()
newBlock.mine()
const stop = new Date()
console.log('time spent mining (seconds):', (stop-start)/1000)

coin.addBlock(newBlock)
console.log(coin.validateChain())

coin.minePendingTransactions()
const exampleTransaction = new Transaction(null, myAddress, 50)
exampleTransaction.signTransaction(privateKey, passphrase)
coin.addTransaction(exampleTransaction)
coin.minePendingTransactions(myAddress, 4)

console.log(coin.getAccountBalance(myAddress))