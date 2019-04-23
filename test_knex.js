// Create connection object
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: "localhost",
        port: '8889',
        user: "root",
        password: "root",
        database: "NODE_APP"
    }
});


function get_user(id) {
    return knex.select("*").from('User')
        .where({'id': id});

}
function display_results(results){
    results.then(function (results) {
        console.log(results)
    });

}

var results = get_user(3);
display_results(results);


module.exports.knex = knex