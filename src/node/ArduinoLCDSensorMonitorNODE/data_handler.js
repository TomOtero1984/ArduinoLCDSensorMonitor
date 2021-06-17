const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:', (err) => {
    if (err){
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});


function DataHandler() {
    this.values = [];
    this.checkValues = () =>{
        console.log(this.values);
    }

    this.database_init = () => {
        const sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database(':memory:', (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        });
    }

    this.database_close = () => {
        this.db.close
    }
}

module.exports = {
    DataHandler: DataHandler,
}