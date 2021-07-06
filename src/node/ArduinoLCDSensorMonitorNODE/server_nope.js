class Server {
    constructor(data_handler) {
        const express = require('express');
        const app = express();
        const port = 3000;


        // app.use('/d3_data.js', express.static(__dirname + 'd3_data.js'))
        app.use(express.static('public'));


        app.get('/', (req, res) => {
            res.sendFile('index.html');
        });

        app.get('/api/data/', (req, res, next) => {
            data_handler.database_get_data();
            res.json(data_handler.d3_data);
        });

        const server = app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });

        server.on('upgrade', (req, socket, head) => {
            this.wss.handleUpgrade(req, socket, head, (socket) => {
                this.wss.emit('connection', socket, req);
            });
        });

        // WebSocket
        var WebSocketServer = require('websocket').server;
        this.wss = new WebSocketServer({
            httpServer: server,
            autoAcceptConnections: true
        });

        this.connection = null
        this.wss.on('request', (request) => {
            this.connection = request.accept('echo-protocol', request.origin)
            this.connection.on('message', (message) => {
                console.log(message)
            })
        });
    }
}

module.exports = {
    Server: Server,
}