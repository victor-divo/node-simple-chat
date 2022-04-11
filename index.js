const express = require('express');
let app = express();

const port = 1212;

app.get('/', (req, res) => res.send('<h1> Hallo </h1>'));

app.get('/api/:name', (req, res) => res.send('<h2>This is api</h2> and its your params, ' + req.params.name))

app.listen(port);
console.log(`server running at http://localhost:${port}`)