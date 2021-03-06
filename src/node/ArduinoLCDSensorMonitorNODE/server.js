const WebSocket = require('ws');

class Server {
    constructor(data_handler) {
        const express = require('express');
        const app = express();
        const port = 3000;

        this.wss = new WebSocket.Server({
            clientTracking: true, 
            noServer: true });
        this.wss.on('connection', (ws) => {
            ws.on('message', (msg) => {
                console.log(`[INFO][SERVER] ${msg}`);
            });
        });
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
        
    }
    send_msg(msg) {
        this.wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                console.log(`[INFO][SERVER] Sending data to ${client}`)
                // console.log(JSON.stringify(msg))
                client.send(JSON.stringify(msg))
            }
        })
}
}

module.exports = {
    Server: Server,
}