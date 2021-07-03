const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();
// Only do this once so we don't loop forever
myEmitter.once('newListener', (event, listener) => {
    console.log('EventEmitter initialized')
}
);
myEmitter.on('array_full', () => {
    console.log('A');
});
myEmitter.emit('event');
// Prints:
//   B
//   A