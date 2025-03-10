// importo express e le realative funzioni
const express = require("express")
const app = express()
const port = 3000

//  BODY PARSER JSON E PER LA CARTELLA PUBLIC
app.use(express.json())
app.use(express.static("public"))



// Impostiamo la rotta home
app.get("/api",(req,res) =>{
    res.send("SERVER HOME")
})



// STAI IN ASCOLTA DELLA PORTA
app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})