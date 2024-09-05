const cors = require("cors");
const path = require("path");
const fs = require("fs");
const dataFilePath = path.join(__dirname, "data.json");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

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

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});

module.exports = app;