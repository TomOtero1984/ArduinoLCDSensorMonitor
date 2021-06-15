const { arduino } = require("./arduino_monitor");
const { DataHandler } = require("./data_handler");
const { server } = require("./server");
const fs = require('fs')


module.exports = {
    logData: (data_handler) => {
        console.log(data_handler);
    }
}

var data_handler = new DataHandler();
console.log(data_handler.values);
arduino(data_handler);
server();

