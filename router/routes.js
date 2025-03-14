// Importo express
const express = require("express")

// importo controllersRouter
const controllersRouter = require("../controllers/controllersRoutes")
// importiamo il middelware della gestione file
const upload = require('../middlewares/formPathImg');


// Richiamo Router
const router = express.Router()

// INDEX VISUALIZZA TUTTI GLI ELEMENTI CON .GET 
router.get("/",controllersRouter.index)

// SHOW VISUALIZZA UN ELEMENTO CON .GET /:ID
router.get("/:id",controllersRouter.show)

// STORE In questo caso crea una nuova recensione con .POST
router.post("/:id/reviews",controllersRouter.storeReviews)

// STORE in questo caso creiamo un nuovo film con 
// .POST
router.post("/", upload.single('image'), controllersRouter.createNewFilm)

//esporto router
module.exports = router