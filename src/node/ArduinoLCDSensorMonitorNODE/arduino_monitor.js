var json_data;
module.exports = {
    arduino: (data_handler) => {
        var count
        // Setting up SerialPort
        const SerialPort = require('serialport');
        const port = new SerialPort('COM9', { baudRate: 9600, autoOpen: false });
        // Setting up parser
        const Readline = SerialPort.parsers.Readline;
        const parser = new Readline();
        // Routing port and parser
        port.pipe(parser)
        parser.on('data', (data) => {
            json_data = JSON.parse(data)
            console.log(json_data)
            json_data_str = JSON.stringify(json_data)
            data_handler.database_insert_data(json_data_str)
            sql_count = data_handler.database_get_count(
                data_handler.table_name,
                "id"
            )
            console.log(`count = ${data_handler.sql_count}`)
            // data_handler.values.push(data);
            // data_handler.checkValues();
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