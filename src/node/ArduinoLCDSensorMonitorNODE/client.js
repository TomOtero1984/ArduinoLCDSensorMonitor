var ws_update_script = require("./d3_data")
var ws_d = Array(100).fill(1)

class Client {
    constructor(event_listener) {
        const URL = 'ws://localhost:3000'
        const PROTOCOL = 'echo-protocol'

        const client_socket = new WebSocket(URL, PROTOCOL);

        client_socket.onopen = () => {
            client_socket.send('Client connected');
        };

        client_socket.onmessage = (msg) => {
            // console.log(`[DEBUG][CLIENT]: ${msg.data}`)
            // for(var i in msg.data)
            // {
            //     console.log(msg.data[i])
            // }
            ws_d = JSON.parse(msg.data)
            console.log(`[DEBUG][CLIENT]: ${d3_data}`)
            event_listener.emit("d3_data",ws_d)
        };
    }
}


module.exports = {
    Client: Client,
}