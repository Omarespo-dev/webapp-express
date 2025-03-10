// importo mysql2
const mysql = require("mysql2")

// creo una connessione con il databese tramite le credenziali
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME 
})


// stabilire la connesione  e il suo relativo errore 
connection.connect((err)=>{
    if(err) throw err;
    console.log("Connected to my SQL")
})

// esporto
module.exports = connection