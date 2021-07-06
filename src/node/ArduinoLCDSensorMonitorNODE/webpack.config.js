const path = require('path');

module.exports = {
    mode: 'development',
    entry: './d3_data.js',
    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: 'd3.bundle.js',
    },
};