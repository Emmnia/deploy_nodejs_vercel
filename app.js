const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

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

module.exports = app;