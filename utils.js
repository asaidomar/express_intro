const database = require('./database');

/**
 * Display result of query as JSON.
 * @param query
 * @param res
 */
function display_json_results(query, res){
    database.do_query(query, (results) => res.end(JSON.stringify(results)))
}


function check_login(req, res) {
    let loging_data = req.body;
    let query_str =  `select id from User where email="${loging_data.email}" AND mdp="${loging_data.mdp}"`;

    /**
     * user exists => redirect to "/"
     */
    function is_user(){
        res.writeHead(302, {
          'Location': `/?email=${email}`
          //add other headers here...
        });
        res.end(); // closure
    }

    /**
     * Use does not exist, return an HTTP 403 error code
     */
    function is_not_user(){
        res.writeHead(403);
        res.end() // closure
    }

    /**
     * Check if user exits in DB
     * @param result, SQL query result
     */
    function check_user(result){
        console.debug(result);
        // if (result.length === 1) should be the real test
        if (result.length === 0){
            is_not_user()
        }else{
            is_user()
        }
    }

    database.do_query(query_str, check_user)

}

/**
 * Insert in db user data, get data from body.
 * @param req
 * @param res
 */
function insert_user_data(req, res) {
    let user_data = req.body;
    let query_sql_str = get_insert_query(user_data);
    return database.do_query(query_sql_str, ()=> res.send(user_data), () => res.send('ERROR'))
}

/**
 * return the sql query to insert order in table UserOrder
 * @param order
 * @returns {string}
 */
function get_insert_order_query(order) {
    return `INSERT INTO UserOrder(id, user_email, item_name, item_price, item_quantity, order_date) VALUES("${order.id}", "${order.user_email}", "${order.item_name}", "${order.item_price}", "${order.item_quantity}", "${order.order_date}")`
}


/**
 * Insert order in database
 * @param req
 * @param res
 */
function insert_order_data(req, res) {
    let order_data = req.body;
    let query_sql_str = get_insert_order_query(order_data);
    return database.do_query(query_sql_str, ()=> res.send(order_data), () => res.send('ERROR'))
}


/**
 * get the sql query to insert user
 * @param user
 */
function get_insert_query(user){
    return `INSERT INTO User(email, nom, prenom, tel, mdp) VALUES("${user.email}", "${user.nom}", "${user.prenom}", "${user.tel}", "${user.mdp}")`
}

module.exports.insert_user_data = insert_user_data;
module.exports.check_login = check_login;
module.exports.display_json_results = display_json_results;
module.exports.insert_order_data = insert_order_data;