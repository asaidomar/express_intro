'use strict';

const express = require('express');


const app = express();
const port = 3000;

// recup json
app.use(express.json());
// app.use(express.urlencoded());

var data_s = [];

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', (req, res) => {
       data_s.push(req.body);
       //res.send(“data”)
       res.setHeader('Content-Type', 'application/json');
       res.send(JSON.stringify(data_s))
   }
);

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}!`));