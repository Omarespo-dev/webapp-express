// Importiamo il modulo multer per gestire l'upload dei file
const multer = require("multer");

// Configuriamo dove e come salvare i file caricati
const storage = multer.diskStorage({
    // Cartella di destinazione dove verranno salvati i file
    destination: "./public/img/books/",

    // Definiamo il nome con cui salvare il file
    filename: (req, file, cb) => {
        // Creiamo un nome univoco per evitare sovrascritture (aggiungiamo la data al nome originale)
        const uniqueName = `${Date.now()}-${file.originalname}`;

        // Salviamo il file con il nome generato
        cb(null, uniqueName);
    },
});

// Creiamo il middleware per l'upload, usando la configurazione dello storage
const upload = multer({ storage });

// Esportiamo il middleware per poterlo usare in altre parti dell'app
module.exports = upload;