
module.exports = {
    arduino: (data_handler, server) => {
        var json_data
        // Setting up SerialPort
        const SerialPort = require('serialport')
        const port = new SerialPort('COM9', { baudRate: 9600, autoOpen: false })
        // Setting up parser
        const Readline = SerialPort.parsers.Readline
        const parser = new Readline()
        // Routing port and parser
        port.pipe(parser)
        parser.on('data', (data) => {
            json_data = JSON.parse(data)
            json_data_str = JSON.stringify(json_data)
            json_data_str = json_data_str.replace(`{`, `{"count":${data_handler.data_readings.length},`)
            console.log(json_data_str)
            data_handler.data_readings_push(json_data_str)
            if (data_handler.data_readings_check_length() >= data_handler.data_reading_limit) {
                data_handler.sql_count = data_handler.database_get_count()
                for (var idx in data_handler.data_readings) {
                    // console.log(`[DEBUG] ${data_handler.data_readings[idx]}`)
                    data_handler.database_insert_data(data_handler.data_readings[idx])
                }
                data_handler.sql_count = data_handler.database_get_count()
                // data_handler.data_readings_to_d3_data()
                data_handler.data_readings_clear()
            }

            // data_handler.values.push(data)
            // data_handler.checkValues()
        })
        // Opening port
        try {
            port.open()
        }
        catch (err) {
            console.log(err)
        }
    },
    printData: (data_handler) => {
        console.log(data_handler.values)
    },
}