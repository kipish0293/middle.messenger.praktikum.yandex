const path = require("path");
const express = require('express');

const app = express();
const PORT = 3000;

const publicPath = path.join(__dirname, 'dist')

app.use(express.static(`${__dirname}/dist`))

app.use((req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Мой текст и порт: ${PORT}!`);
});