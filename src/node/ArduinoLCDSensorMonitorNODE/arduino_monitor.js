
module.exports = {
    arduino: (data_handler) => {
        // Setting up SerialPort
        const { logData } = require('./index')
        const SerialPort = require('serialport');
        const port = new SerialPort('COM9', { baudRate: 9600, autoOpen: false });
        // Setting up parser
        const Readline = SerialPort.parsers.Readline;
        const parser = new Readline();
        // Routing port and parser
        port.pipe(parser)
        parser.on('data', (data) => {
            data_handler.values.push(data);
            // logData(data_handler);
            data_handler.checkValues();
        });
        // Opening port
        try {
            port.open();
        }
        catch (err) {
            console.log(err);
        }
    },
    printData: (data_handler) => {
        console.log(data_handler.values);
    },
}