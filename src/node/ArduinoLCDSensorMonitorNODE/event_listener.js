const EventEmitter = require('events')

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter()
myEmitter.once('newListener', (event, listener) => {
    console.log('EventEmitter initialized')
}
)
myEmitter.on('array_full', (data, data_handler) => {
    for(var i = 0; i < data.length; i++){
        data_handler.database_insert_data(data[i])
    }
})



module.exports = {
    event_listener: myEmitter,
}