var express = require("express");
var router = express.Router();

var stocks = null;
var connections = [];
module.exports = function() {
    router.ws("/", function(ws, req) {
        console.log("New connection");
        connections.push(ws);
        ws.on("message", function(msg) {
            console.log("message = " + msg);
            stocks = msg;
            connections.forEach(function(conn) {
                if (conn != ws && (conn.readyState == conn.OPEN)) {
                    console.log("entrou no if " + conn);
                    conn.send(stocks);
                }
            });
        });
        
        ws.on("close", function() {
            console.log("Entrou no close");
            console.log("connections.length antes = " + connections.length);
            var conns = [];
            for (var i = 0; i < connections.length; i++) {
                if (connections[i].readyState != connections[i].CLOSED) {
                    conns.push(ws);
                }
            }
            connections = conns;
            console.log("connections.length depois = " + connections.length);
        });
    });
    
    router.get("/", function(req, res) {
        var resContent = { "stocks": stocks };
        res.render("index", resContent);
    });
    return router;
}
