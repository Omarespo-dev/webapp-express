// importo express e le realative funzioni
const express = require("express")
const app = express()
const port = process.env.Port

// Importo router
const router =require('./router/routes')
// Importo middlewares per le img
const setImagePath = require("./middlewares/ImagePath")
app.use(setImagePath)

//  BODY PARSER JSON E PER LA CARTELLA PUBLIC e il router
app.use(express.json())
app.use(express.static("public"))
app.use("/api/movie",router)


// Impostiamo la rotta home
app.get("/api",(req,res) =>{
    res.send("SERVER HOME")
})



// STAI IN ASCOLTA DELLA PORTA
app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})