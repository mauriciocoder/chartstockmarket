var express = require("express");
var app = express();
var expressWs = require("express-ws")(app);

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
// Forbidden to change stack order!!!
var flash = require("connect-flash");
app.use(flash());

// Mustache Config
var mustacheExpress = require("mustache-express");
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(require("./controllers")());

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Chartstockmarket Listening on port " + port);
});

// WebSocket server
var WebSocketServer = require("websocket").server;
var wsServer = new WebSocketServer({
    httpServer: app
});