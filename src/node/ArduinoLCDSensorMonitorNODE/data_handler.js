function DataHandler() {
    this.values = [];
    this.checkValues = () =>{
        console.log(this.values);
    }
}

module.exports = {
    DataHandler: DataHandler,
}