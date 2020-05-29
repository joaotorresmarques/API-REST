const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')


exports.postUsuario = (req, res) => {
  bcrypt.hash(req.body.senha, 0, (errBcrypt, hash) => {
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
}

exports.loginUsuario = (req, res) => {
  Usuario.findAll({ where: { email: req.body.email } }).then((x) => {
    bcrypt.compare(req.body.senha, x[0].senha, (err, result) => {
      if(result){
        const token = jwt.sign({
          id_usuario: x[0].id_usuario,
          email: x[0].email
        },
        'chave',
        {
          expiresIn: "1d"
        })
        res.status(200).send({msg: 'Autenticado com sucesso', token: token})
      }
      if(err){
        res.status(401).send({msg: 'Falha na autenticação'})
      }
    })
  }).catch((err)=>{
    res.status(401).send({msg: 'Falha na autenticação'})
  })
}