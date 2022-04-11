const express = require('express');
let app = express();

const port = 1212;

app.use();
app.get('/', (req, res) => res.send('<h1> Hallo </h1>'));

app.listen(port);
console.log(`server running at http://localhost:${port}`)