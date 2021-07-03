const { arduino } = require("./arduino_monitor");
const { server } = require("./server");
const { DataHandler } = require("./data_handler");
// var table_name = "test3";
// var column_name = 'data';
// var datatype = 'TEXT';

async function data_handler_setup(data_handler) {
    data_handler.build().then(() => {
        data_handler.set_table_name()
        console.log(data_handler.table_name)
        // data_handler.set_column_name(column_name)
        // data_handler.set_datatype(datatype)
    }).then(() => {
        data_handler.database_get_tables()
            .then((get_flag) => {
                if (get_flag === true) {
                    console.log(`flag = ${get_flag}`)
                    console.log(`res = ${data_handler.table_names}`);
                }
            }).then(() => {
                data_handler.database_create_table(data_handler.table_name)
            });
    });
}


async function main() {
    var data_handler = new DataHandler
    await data_handler_setup(data_handler);
    arduino(data_handler);
    server();
}

main();
