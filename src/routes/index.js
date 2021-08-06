// Archivos para definir las rutas de mi software

const express = require('express');
const router = express.Router();

router.get('/',async (req,res)=>{
   res.render('links/index')
});

// exporta la ruta '/' para que sea usada en src\index.js
module.exports = router;


















