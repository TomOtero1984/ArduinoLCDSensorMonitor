const d3 = require("d3")
const $ = require("jquery")
const { event_listener } = require("./event_listener")

// Event Listener
event_listener.on('d3_data', (ws_d) => {
    d3_data = ws_d
    ws_update_script()
})

// Global const
const URL = 'ws://localhost:3000'
const API = "/api/data"

// Data array
var d3_data = Array(100).fill(1)
window.d3_data = d3_data

// Web socket client
const { Client } = require("./client")
var client = new Client(event_listener)


// D3 Graph
var svgWidth = 800, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / d3_data.length);

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight)

var barChart = svg.selectAll("rect")
    .data(d3_data)
    .enter()
    .append("rect")
    .attr("y", (d) => {
        return svgHeight - d
    })
    .attr("height", (d) => {
        return d;
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", (d, i) => {
        var translate = [barWidth * i, 0];
        return "translate(" + translate + ")";
    })



// API
function get_d3_data() {
    $.getJSON(URL+API, (res) => {
        d3_data = res
        console.log(d3_data)
    })
}
window.get_d3_data = get_d3_data;

function parse_d3_data() {
    for (var i in d3_data) {
        d3_data[i] = d3_data[i]["in"]
    }
    console.log(d3_data)
}
window.parse_d3_data = parse_d3_data;



// Update
function update_graph() {
    if (d3_data[0] === undefined) {
        console.error("[ERROR] d3_data is undefined")
        return
    }
    barWidth = (svgWidth / d3_data.length);
    d3.selectAll("rect")
        .data(d3_data)
        .attr("y", (d) => {
            return svgHeight - d
        })
        .attr("height", (d) => {
            return d;
        })
        .attr("width", barWidth - barPadding)
        .attr("transform", (d, i) => {
            var translate = [barWidth * i, 0];
            return "translate(" + translate + ")";
        })

}
window.update_graph = update_graph;

function update_script() {
    get_d3_data()
    parse_d3_data()
    update_graph()
}
window.update_script = update_script

function ws_update_script() {
    // get_d3_data()
    parse_d3_data()
    update_graph()
}
window.update_script = ws_update_script

// const interval_time = 120000
// setInterval(update_script, interval_time)
