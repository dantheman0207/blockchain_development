const app = require('express')()
const bodyParser = require('body-parser')
const httpServer = require('http').Server(app)
const axios = require('axios');
const { Blockchain } = require('./blockchain');



let nodes = []
let coin = new Blockchain()
const PORT = 4647
let IPs = [ ...Array(255).keys() ]
IPs = IPs.map(element => {
    return `http://192.168.1.${element}:${4646}/nodes`
});
IPs = [ `http://localhost:${4646}/nodes`, ...IPs ]
IPs.forEach(host => {
    axios.post(host, { host: 'localhost', port: PORT})
    .then(() => { console.log('During scan found', host) })
    .catch(e => { console.log('no host found at', host) })
});

app.use(bodyParser.json());
app.post('/nodes', (req, res) => {
    const { host, port } = req.body
    const { callback } = req.query
    const node = `http://${host}:${port}/nodes`
    nodes.push(node)
    if (callback) {
        console.info(`Added node ${node} back`);
        res.json({ status: 'Added node back' }).end()
    } else {
        axios.post(`${node}?callback=true`, { host: req.hostname, port: PORT })
        .then(() => {
            console.info(`Added node ${node}`)
            res.json({ status: 'Added node' }).end()
        })
        .catch((e) => {
            console.log('error:',e)
            res.sendStatus(406)
        })
    }
})
app.post('/transaction', (req, res) => {
    const { sender, receiver, amount } = req.body;
    coin.addTransaction(sender, receiver, amount)
    res.json({ message: 'transaction success' }).end();
});

app.post('/chain', (req, res) => {
    const newCoin = new Blockchain()
    Object.assign(newCoin, req.body)
    newCoin.blocks = []
    newCoin.addBlocks(req.body.blocks)
     
    if (!newCoin.validateChain()) { 
        res.sendStatus(409)
        return
    }
    if (newCoin.blocks.length > coin.blocks.length) {
        coin = newCoin
        res.json({status: 'updated chain'})
    } else {
        res.sendStatus(400)
    }
})

app.get('/chain', (req, res) => {
    res.json(coin).end();
});
  
httpServer.listen(PORT, () => console.info(`Express server running on ${PORT}...`));
