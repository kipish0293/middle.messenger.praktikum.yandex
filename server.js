const path = require("path");
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

const publicPath = path.join(__dirname, "dist");

app.use(express.static(`${__dirname}/dist`));

app.get("*", (req, res) => {
    const indexPath = path.join(publicPath, "index.html");
    if (fs.existsSync(indexPath)) {
        res.status(200).sendFile(indexPath);
    } else {
        res.status(200).send("File not found!");
    }
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Мой текст и порт: ${PORT}!`);
});
