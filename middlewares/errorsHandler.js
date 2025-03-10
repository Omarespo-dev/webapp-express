// Facciamo una funzione errorsHandler.js dove gestiamo un errore della pagina in se dando uno status di (500) {gestione error}

function errorsHandler(err,req,res,next){
    // setto status
    res.status(500)

    // stampa in formato json 
    res.json({error: err.message})
}

module.exports = errorsHandler