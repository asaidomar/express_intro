'use strict';

const express = require('express');
const utils = require("./utils");
const database = require("./database");

// les routes seront créées avec un routers
const router = express.Router();


router.post("/user/signup", (req, res) => {
    utils.insert_user_data(req, res)
});

router.post("/user/login", (req, res) => {
    //test sur mysql que le login et mdp sont bons
    utils.check_login(req, res)
});


router.get("/stat/connexions", (req, res) => {
    let query_str = `select * from Connection`;
    utils.display_json_results(query_str, res)
});


router.post("/user/orders", (req, res) => {
    utils.insert_order_data(req, res)
});

router.get("/user/orders", (req, res) => {
    let email = req.query.email;
    let query_str = `select * from UserOrder`;
    if (email)
        query_str = `select * from UserOrder where user_email="${email}"`;
    utils.display_json_results(query_str, res)

});

router.get("/user/order/:id", (req, res) => {
    //affichage information de la commande dont l'id est egale à la valeur du param id
    let order_id = req.params.id;
    let query_str = `select * from UserOrder where id=${order_id}`;
     utils.display_json_results(query_str, res)
});


router.get("/stat/users", (req, res) => {
    // affichage de tous les utilisateurs
    let query_str = `select * from User`;
     utils.display_json_results(query_str, res)

});

router.get("/stat/user:id", (req, res) => {
    // affichage de l'utilisateur dont l'id est id
    let order_id = req.params.id;
    let query_str = `select * from User where id=${order_id}`;
     utils.display_json_results(query_str, res)
});

// middleware appelé sur toutes les connexions
router.use((req, res) => {
    let email = req.query.email;
    let date = new Date();
    let data_str = date.toString();
    database.do_query(`insert into Connection VALUES ("${email}", "${data_str}")`)

});

module.exports = router;


