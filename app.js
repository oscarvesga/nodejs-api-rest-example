var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/', (req, res) => {
    res.send("Hola mundo");
});

app.use(router);

app.listen(3000, () => {
    console.log("Node server running on http://localhost:3000");
});