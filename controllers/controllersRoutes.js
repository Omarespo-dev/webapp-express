// importo la connessiione con il db
const connection = require("../data/movies_db")

// ANDIAMO A DEFINIRE LE FUNZIONI DELLE DIVERSE ROTTE
function index(req,res){

    // variabile dove va a ricavare tutti i dati dal db
    const moviesql = 'SELECT * FROM movies'

    // facciamo la connesione al db
    connection.query(moviesql,(err,results) =>{
        // se la connesione del database va male dai errore 
        if(err) return res.status(500).json({error:"Database query failed"})
        // altrimenti stampa i dati 
        res.json(results)
    })
}








module.exports ={
    index
}