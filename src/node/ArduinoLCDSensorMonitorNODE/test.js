const ws = require('ws');

const client = new ws('ws://localhost:3000');

client.on('message', (res) => {
    // Causes the server to print "Hello"
    console.log(res);
});