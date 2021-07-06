class DataHandler {
    constructor() {
        this.sqlite3 = require('sqlite3').verbose()
        this.db_filepath = `data/sensor_readings.db`
        this.db
        this.table_names = []
        this.column_name = "data"
        this.datatype = "TEXT"
        this.date = new Date()
        this.sql_count = 0
        this.data_readings = []
        this.data_reading_limit = 5
        this.d3_data = []
        this.db_results = ""

    }

    generate_table_name() {
        var name = `sensor_readings_${this.date.getDate()}${this.date.getMonth() + 1}${this.date.getFullYear()}`
        return name
    }

    set_table_name() {
        var name = this.generate_table_name()
        this.table_name = name
    }

    set_column_name(name) {
        this.column_name = name
    }

    set_datatype(type) {
        this.datatype = "TEXT"
    }


    build() {
        return new Promise((resolve) => {
            this.db = new this.sqlite3.Database(this.db_filepath, (err) => {
                if (err) {
                    return console.error(err.message)
                }
                console.log(`[INFO] Connected to the ${this.db_filepath} SQlite database.`)
                resolve(true)
            })
        })
    }


    // Database
    database_close() {
        this.db.close((err) => {
            if (err) {
                return console.error(err.message)
            }
            console.log('[INFO] Close the database connection.')
        })
    }

    database_get_tables() {
        return new Promise((resolve) => {
            this.db.all(`SELECT name FROM sqlite_master;'`, (err, res) => {
                if (err) {
                    return console.error(err.message)
                }
                for (let i = 0; i < res.length; i++) {
                    this.table_names[i] = res[i]["name"]
                }
                resolve(true)
            })
        })
    }

    database_create_table(table_name) {
        return new Promise((resolve) => {
            if (!this.table_names.includes(table_name)) {
                console.log(`[INFO] Creating TABLE ${table_name}`)
                this.db.run(`CREATE TABLE ${table_name} 
                            (id INTEGER PRIMARY KEY AUTOINCREMENT,
                             data TEXT);`,
                    (err, res) => {
                        if (err) {
                            return console.error(`[ERROR][database_create_table]: ${err.message}`)
                        }
                        if (res) {
                            return console.log(`[INFO][database_create_table]: ${res.message}`)
                        }
                    })
                return
            }
            console.log(`[INFO] Table ${table_name} already exists`)
            resolve(true)
        })
    }

    database_get_columns() {
        return new Promise((resolve) => {
            this.db.all(`PRAGMA table_info(${this.table_name});`, (err, res) => {
                if (err) {
                    return console.error(`[ERROR][database_get_columns]: ${err.message}`)
                }
                for (let i = 0; i < res.length; i++) {
                    this.column_names[i] = res[i]["name"]
                }
                resolve(true)
            })

        })
    }

    database_insert_data(data) {
        this.db.run(`INSERT INTO ${this.table_name}(${this.column_name})
                     VALUES('${data}');`)
    }

    database_reduce_table_by_range(table_name, column_name,
        range_start, range_end) {
        this.db.run(`DELETE from ${this.table_name}
                     WHERE ${this.column_name} BETWEEN ${range_start} 
                     and ${range_end}`)
    }

    database_get_count() {
        this.db.get(`SELECT COUNT("id") FROM ${this.table_name};`, (err, res) => {
            this.sql_count = res
            console.log(res)
        })
    }

    database_get_data() {
        return new Promise((resolve) => {
            this.db.all(`SELECT * FROM ${this.table_name} 
                         ORDER BY "id" DESC LIMIT 100;`,
                (err, res) => {
                    if (err) {
                        return console.error(`[INFO][database_get_data]: ${err.message}`);
                    }
                    this.db_results = res
                    this.set_d3_data()
                    resolve()
                })
        })
    }


    // Data Readings 
    data_readings_push(data) {
        this.data_readings.push(data)
    }

    data_readings_pop(index) {
        this.data_readings.pop(index)
    }

    data_readings_clear() {
        this.data_readings = []
    }

    data_readings_check_length() {
        return this.data_readings.length
    }

    // D3 Data
    set_d3_data() {
        for (var i in this.db_results) {
            console.log(this.db_results[i]["data"])
            this.d3_data[i] = JSON.parse(this.db_results[i]["data"])
        }
    }

}

module.exports = {
    DataHandler: DataHandler,
}