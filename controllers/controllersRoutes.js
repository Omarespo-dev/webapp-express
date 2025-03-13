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

        // Versione mappata per le img
        const movies = results.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        // altrimenti stampa i dati 
        res.json(movies)
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
        if (movieResults.length === 0) return res.status(404).json({ error: "Movie not found" })

        // altrimenti stampa i dati in questo caso salviamo il risultato su una costante cosi la andiamo a richiamre nell altra connection
        // res.json(movieResults[0])
        const movie = movieResults[0]

        // Versione per le img
        const moviesImg = {
            ...movie,
            image: req.imagePath + movie.image
        }


        // facciamo la connesione al db di reviewSql per unire le table con movie e recensioni
        connection.query(reviewSql, [id], (err, reviewResults) => {
            // se la connesione del database va male dai errore 
            if (err) return res.status(500).json({ error: "Database query failed" })
         
            // Nuovo oggetto prendendo moviesImg facendo la copia e aggiungendo il reviews: le recensioni che sarebbe il risultato
            const response = { ...moviesImg, reviews: reviewResults }

            // altrimenti stampa i dati 
            res.json(response)
        })
    })



}


// Rotta store che va a creare una nuova recensione all invio del form
function storeReviews(req,res){

    // andiamo a prendere id dai parametri quindi dall url
    const {id} = req.params

    // Prendiamo le info dal body
    const{text,vote,name} = req.body

    // Variabile da ricavare in mysql per creare una nuova recensione TESTATA SUL DB
    const insertReviewSql =`
    INSERT INTO reviews (text,name,vote,movie_id)
    VALUES (?, ?, ?, ?)`

    // Eseguiamo la query 
    connection.query(insertReviewSql, [text,name,vote,id],(err, results) =>{
        if (err) return res.status(500).json({ error: 'Database query failed' , details: err});
        // per la creazione di una nuova recensione usiamo un res.status 201
        res.status(201);
        // Mandiamo anche un messaggio di avvenuta aggiunta con id nuovo 
        res.json({message:"Review added",id: results.insertId})
    })

}




module.exports = {
    index,
    show,
    storeReviews
}