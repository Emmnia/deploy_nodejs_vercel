const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/api'));

const dataFilePath = path.join(__dirname, "data.json");

function loadData() {
    if (fs.existsSync(dataFilePath)) {
        const rawData = fs.readFileSync(dataFilePath);
        return JSON.parse(rawData);
    }
    return [];
}

let characters = loadData();

app.get("/", function (_, res) {
    res.send(characters);
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;