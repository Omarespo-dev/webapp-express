// Importo express
const express = require("express")

// importo controllersRouter
const controllersRouter = require("../controllers/controllersRoutes")

// Richiamo Router
const router = express.Router()

// INDEX VISUALIZZA TUTTI GLI ELEMENTI CON .GET 
router.get("/",controllersRouter.index)




//esporto router
module.exports = router