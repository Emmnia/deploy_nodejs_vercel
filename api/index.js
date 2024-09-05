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

// Загрузка данных при старте сервера
let characters = loadData();

// вспомогательная функция для поиска индекса персонажа по id
function findCharacterIndexById(id) {
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].id == id) return i;
    }
    return -1;
}

app.get("/api", function (_, res) {
    res.send(characters);
});

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});

module.exports = app;