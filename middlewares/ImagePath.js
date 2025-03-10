// middleware per gestire la visualizzazione dell img
function setImagePath(req, res, next){
    // creiamo un path assoluto della img
    req.imagePath = `${req.protocol}://${req.get('host')}/img/movies_cover/`
    next()
}

module.exports = setImagePath