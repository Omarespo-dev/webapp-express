// Facciamo una funzione notFound dove gestiamo un errore della pagina in se dando uno status di (404 not Found) {rotte inesistenti}

function notFound(req, res, next){
    // setto status
    res.status(404)

    // stampa in formato json 
    res.json({error:"Not Found",message: "Pagina non trovata"})
}

module.exports = notFound