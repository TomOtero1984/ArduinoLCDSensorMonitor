const { DataHandler } = require("../data_handler")


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
    data_handler.d3_data = data_handler.db_results
    for (var idx in data_handler.d3_data) {
        // console.log(`[DEBUG] d3 keys = ${Object.keys(data_handler.d3_data[idx])}`)
        data_handler.d3_data[idx] = JSON.parse(data_handler.d3_data[idx]["data"])
        // console.log(`[DEBUG] d3 data = ${Object.keys(data_handler.d3_data[idx])}`)
    }
}

async function main() {
    var data_handler = new DataHandler
    await data_handler_setup(data_handler)
    await init_d3_data(data_handler)
}

main()