require("node-gyp/package.json"); // node-gyp is a peer dependency. 
var sqlite3 = require("sqlite3")

function DataHandler() {
    this.values = [];
    this.checkValues = () =>{
        console.log(this.values);
    }
}

module.exports = {
    DataHandler: DataHandler,
}