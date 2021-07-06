const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');




const PORT = 8080
const options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
};
server = https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("hello world\n");
});
const wss = new WebSocket.Server({ server });
const ws = new WebSocket(`wss://localhost:${PORT}`, {
    rejectUnauthorized: false
});

// wss and ws events
wss.on('connection', function connection(ws) {
    ws.on('message', function message(msg) {
        console.log(msg);
    });
});

wss.on("open", () => {
    wss.send('test');
})

ws.on("message", (msg) => {
    console.log(msg);
})


server.listen(PORT, function listening() {
    //
    // If the `rejectUnauthorized` option is not `false`, the server certificate
    // is verified against a list of well-known CAs. An 'error' event is emitted
    // if verification fails.
    //
    // The certificate used in this example is self-signed so `rejectUnauthorized`
    // is set to `false`.
    //
    ws.on('open', function open() {
        ws.send('All glory to WebSockets!');
    });
});


