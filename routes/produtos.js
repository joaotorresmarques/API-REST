const express = require("express")
const router = express.Router()
const Produto = require('../models/produto')

router.get('/', (req, res) => {

  Produto.findAll().then((x)=>{
    res.status(200).send({produtos: x})
  })
 
})

router.post('/', (req, res) => {
  Produto.create({
    nome: req.body.nome,
    preco: req.body.preco
  }).then(() => {
    res.status(201).send({
      mensagem: "Produto inserido"
    })
      }).catch((error) => {
        res.status(500).send({
          error: error
    })
  })
})

router.get('/:id', (req, res) => {
  const id = req.params
  res.status(200).send({
    msg: "Usando GET com parametro",
    id: id
  })
})



module.exports = router;
