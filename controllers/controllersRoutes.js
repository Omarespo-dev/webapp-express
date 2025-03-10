// importo la connessiione con il db
const connection = require("../data/movies_db")

// ANDIAMO A DEFINIRE LE FUNZIONI DELLE DIVERSE ROTTE
function index(req, res) {

    // variabile dove va a ricavare tutti i dati dal db
    const moviesql = `SELECT * FROM movies`

    // facciamo la connesione al db
    connection.query(moviesql, (err, results) => {
        // se la connesione del database va male dai errore 
        if (err) return res.status(500).json({ error: "Database query failed" })
        // altrimenti stampa i dati 
        res.json(results)
    })
}

// ROTTA SHOW andiamo a prendere prima un oggetto e poi aggiungiamo le recensioni
function show(req, res) {
    // ricaviamo id dalla request
    const { id } = req.params

    // variabile dove va a ricavare dalla query ogni singolo oggetto cercandolo per id
    const moviesql = `
    SELECT * 
    FROM movies
    WHERE id = ?
    `
    // variabile dove va a ricavare dalla query le recensioni attraverso a una relazione one to many vedere la table sql
    const reviewSql = `
    SELECT * 
    FROM reviews
    WHERE movie_id =?`

    // facciamo la connesione al db di movieSql quindi del singolo oggetto
    connection.query(moviesql, [id], (err, movieResults) => {
        // se la connesione del database va male dai errore 
        if (err) return res.status(500).json({ error: "Database query failed" })
        // condizione se non trova il film
        if (movieResults === 0) return res.status(404).json({ error: "Movie not found" })

        // altrimenti stampa i dati in questo caso salviamo il risultato su una costante cosi la andiamo a richiamre nell altra connection
        // res.json(movieResults[0])
        const movie = movieResults[0]

        // facciamo la connesione al db di reviewSql per unire le table con movie e recensioni
        connection.query(reviewSql, [id], (err, reviewResults) => {
            // se la connesione del database va male dai errore 
            if (err) return res.status(500).json({ error: "Database query failed" })

            // aggiorniamo movie aggiungendo le recensioni
            movie.review = reviewResults

            // altrimenti stampa i dati 
            res.json(movie)
        })
    })



}







module.exports = {
    index,
    show
}