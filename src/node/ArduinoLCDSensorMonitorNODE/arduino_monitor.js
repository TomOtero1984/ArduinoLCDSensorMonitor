module.exports = {
    arduino: (data_handler) => {
        // Setting up SerialPort
        const SerialPort = require('serialport');
        const port = new SerialPort('COM6', { baudRate: 9600, autoOpen: false });
        // Setting up parser
        const Readline = SerialPort.parsers.Readline;
        const parser = new Readline();
        // Routing port and parser
        port.pipe(parser)
        parser.on('data', (data) => {
            data_handler.values.push(data);
            module.exports.printData(data_handler);
            return data_handler;
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
    storeData: (data, data_handler) => {
        // module.exports.printData(data)
        data_handler.values.push(data);
        // console.log(data_handler.values);
    }
}