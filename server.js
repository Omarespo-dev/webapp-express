// importo express e le realative funzioni
const express = require("express")
const app = express()
const port = process.env.PORT

// importo il cors
const cors = require("cors")

// Importo router
const router =require('./router/routes')
// Importo middlewares per le img
const setImagePath = require("./middlewares/ImagePath")
app.use(setImagePath)

// uso il CORS
app.use(cors({origin: process.env.FE_APP}))

// Importo middlewares error 
const errorsHandler = require("./middlewares/errorsHandler")

const notFound = require("./middlewares/notFound")

//  BODY PARSER JSON E PER LA CARTELLA PUBLIC e il router
app.use(express.json())
app.use(express.static("public"))
app.use("/api/movie",router)


// Impostiamo la rotta home
app.get("/api",(req,res) =>{
    res.send("SERVER HOME")
})

// Uso i middlewares per gli errori in page
app.use(errorsHandler)
app.use(notFound)

// STAI IN ASCOLTA DELLA PORTA
app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})