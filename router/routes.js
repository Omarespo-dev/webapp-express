// Importo express
const express = require("express")

// importo controllersRouter
const controllersRouter = require("../controllers/controllersRoutes")

// Richiamo Router
const router = express.Router()

// INDEX VISUALIZZA TUTTI GLI ELEMENTI CON .GET 
router.get("/",controllersRouter.index)

// SHOW VISUALIZZA UN ELEMENTO CON .GET /:ID

router.get("/:id",controllersRouter.show)

//esporto router
module.exports = router