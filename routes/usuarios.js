const express = require("express")
const router = express.Router()


const UsuarioController = require('../controllers/usuarios-controller')

router.post('/',UsuarioController.postUsuario)
router.post('/login', UsuarioController.loginUsuario)
module.exports = router;