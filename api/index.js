import http from 'http';
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const dataFilePath = path.join(__dirname, "data.json");
const server = http.createServer();

server.use(cors());

function loadData() {
    if (fs.existsSync(dataFilePath)) {
        const rawData = fs.readFileSync(dataFilePath);
        return JSON.parse(rawData);
    }
    return [];
}

let characters = loadData();

server.get("/api/data.json", function (_, res) {
    res.send(characters);
});

// Define the port to listen on
const port = 3000;

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});