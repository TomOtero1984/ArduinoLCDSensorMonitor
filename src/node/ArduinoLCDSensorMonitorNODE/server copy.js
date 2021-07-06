module.exports = {
    server: (data_handler) => {
        const express = require('express');
        const ws = require('ws')

        const app = express();
        const port = 3000;

        const wss = new ws.Server({ noServer: true });

        wss.on('connection', (socket) => {
            socket.on('message', (message) => {
                console.log(message)
            })
        })

        // app.use('/d3_data.js', express.static(__dirname + 'd3_data.js'))
        app.use(express.static('public'))


        app.get('/', (req, res) => {
            res.sendFile('index.html')
        });

        app.get('/api/data/', (req, res, next) => {
            data_handler.database_get_data()
            res.json(data_handler.d3_data)
        })

        const server = app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        });

        server.on('upgrade', (req, socket, head) => {
            wss.handleUpgrade(req, socket, head, (socket) => {
                wss.emit('connection', socket, req);
            })
        })
    }
}