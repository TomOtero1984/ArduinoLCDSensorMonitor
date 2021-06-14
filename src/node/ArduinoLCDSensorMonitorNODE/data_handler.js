function DataHandler() {
    this.values = [];
    this.checkValues = async function () {
        while (true) {
            console.log(this.values);
        }
    }
}
module.exports = {
    DataHandler: DataHandler,
}