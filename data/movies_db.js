// importo mysql2
const mysql = require("mysql2")

// creo una connessione con il databese tramite le credenziali
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'movies_db'
})


// stabilire la connesione  e il suo relativo errore 
connection.connect((err)=>{
    if(err) throw err;
    console.log("Connected to my SQL")
})

// esporto
module.exports = connection