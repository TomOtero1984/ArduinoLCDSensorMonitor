const { arduino } = require("./arduino_monitor");
const { DataHandler } = require("./data_handler");
const { server } = require("./server");

const data_handler = new DataHandler();
console.log(data_handler.values);
arduino(data_handler);
server();
data_monitor(data_handler);


