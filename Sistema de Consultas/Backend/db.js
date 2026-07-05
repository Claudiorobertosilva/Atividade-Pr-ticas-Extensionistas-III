const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_consultas"
});

connection.connect((erro)=>{
    if(erro){
        console.log(erro);
    }else{
        console.log("MySQL conectado!");
    }
});

module.exports = connection;