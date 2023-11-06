import mysql from "mysql";

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database: "ecommerce"
});

export default connection;