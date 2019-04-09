const http = require("http"); // import du module
const url = require('url');
const database = require("./database");
// creation et lancement serveur http en node
// lire url
// parser url
const port = 9191;

function parse_url(req) {
    let q = url.parse(req.url, true);
    console.log("url ", req.url);
    console.log("path ", q.path);
    console.log("pathname ", q.pathname);

    let query_obj = q.query;
    console.log("query ", query_obj);
    console.log(`query obj name ${query_obj.name}`);
    console.log(`query obj password ${query_obj.password}`);
    //console.log("query obj password ", query_obj.password);


}



function generate_query_from_data(data) {
    return `INSERT INTO User (name, firstname) VALUES ('${data.name}', '${data.firstname}')`;
}

function insert_data(res, req){
    let data = get_data_from_url(req);
    let query_str = generate_query_from_data(data)
    database.do_query(query_str, () => res.end("User inserted"))

}


function get_data_from_url(req) {
    return url.parse(req.url, true).query
}

function dispatch(req, res) {
    let parsed_url = url.parse(req.url);
    let pathname = parsed_url.pathname;

    function display_result(results){
        console.log(results);
        res.end(JSON.stringify(results))
    }

    res.writeHead(200);
    //res.end(`vous avez demande ${req.url}`);
    //res.end("Hello  je suis le contenu renvoye!!!")
    // http://localhost:9191/user/signup?name=test_name33&firstname=test_firstname44
    if (pathname === "/user/signup"){
        insert_data(res, req)
    }

    if (pathname == "/"){
        database.do_query("show databases", display_result);

    }
    if (pathname == "/users"){
         database.do_query("select * from User", display_result);
    }


}

const server = http.createServer(dispatch);

console.log(`server en ecoute sur ${port}`);
console.log(`http://localhost:${port}`);
server.listen(port);


