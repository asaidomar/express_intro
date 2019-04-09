'use strict';

// utilisation de module express
const express = require('express');
const router = require('./urls');

// creation de l'application express
const app = express();
// port d'ecoute
const port = 3000;

// les échanges sont faits en JSON
app.use(express.json());
// app.use(express.urlencoded());

app.use("/", router);




app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}!`));