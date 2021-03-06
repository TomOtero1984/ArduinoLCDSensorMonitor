const { Arduino } = require("./arduino_monitor")
const { Server } = require("./server")
const { DataHandler } = require("./data_handler")
// const { myEmitter } = require("./event_listener")
// const { Client }    = require("./client")

async function data_handler_setup(data_handler) {
    await data_handler.build()
    await data_handler.set_table_name()
    // console.log(`[DEBUG] data_handler.table_name:${data_handler.table_name}`)
    await data_handler.database_get_tables()
    // console.log(`[DEBUG] data_handler.table_names: ${data_handler.table_names}`)
    await data_handler.database_create_table(data_handler.table_name)
}

async function init_d3_data(data_handler) {
    await data_handler.database_get_data()
}


async function main() {
    var data_handler = new DataHandler
    await data_handler_setup(data_handler)
    await init_d3_data(data_handler)
    var server = new Server(data_handler)
    // var client = new Client()
    var arduino = new Arduino(data_handler, server)
}

main()
