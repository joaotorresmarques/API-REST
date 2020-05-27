const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario')

router.post('/', (req, res) => {
  bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
    Usuario.create({
      email: req.body.email,
      senha: hash
    }).then(() => {
      const response = {
        msg: 'Usuario criado com sucesso',
        UsuarioCriado: { nome: req.body.email }
      }
      console.log(hash)
      res.status(200).send(response)
    }).catch((error, errBcrypt) => {
      errBcrypt ? erro = errBcrypt : erro = error
      res.status(500).send({
        error: erro
      })
    })
  })
})
module.exports = router;