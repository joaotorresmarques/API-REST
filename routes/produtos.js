const express = require("express")
const router = express.Router()
const Produto = require('../models/produto')

router.get('/', (req, res) => {
  Produto.findAll().then((x) => {
    const response = {
      quantidade: x.length,
      produtos: x.map(prod => {
        return {
          id_produto: prod.id_produto,
          nome: prod.nome,
          preco: prod.preco,
          request: {
            tipo: 'GET',
            descricao: 'Retorna todos os produtos',
            url: 'http://localhost:8089/produtos/' + prod.id_produto
          }
        }
      })
    }
    res.status(200).send(response)//send({produtos: x})
  }).catch((error) => {
    res.status(500).send({
      error: error
    })
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Produto.findAll({ where: { id_produto: id } }).then((x) => {
    res.status(200).send({ produtos: x })
  }).catch((error) => {
    res.status(500).send({
      error: error
    })
  })
})

//ALTERAR
router.patch('/:id', (req, res) => {
  const id = req.params.id
  Produto.update({
    nome: req.body.nome,
    preco: req.body.preco
  }, {
    where: { id_produto: id }
  }).then(() => {
    res.status(201).send({
      mensagem: "Produto alterado!"
    })
  }).catch((error) => {
    res.status(500).send({
      error: error
    })
  })
})

router.post('/', (req, res) => {
  Produto.create({
    nome: req.body.nome,
    preco: req.body.preco
  }).then((x) => {
    const response = {
      mensagem: "Produto inserido",
      produtoCriado: {
        id_produto: x.id_produto, //NAO FUNCIONOU
        nome: req.body.nome,
        preco: req.body.preco,
        request:{
          tipo: 'POST',
          descricao: "inserir produto",
          url: "http://localhost:8089/produtos"
        }
      }
    }
    /*res.status(201).send({
      mensagem: "Produto inserido"
    })*/
    res.status(201).send({response})
  }).catch((error) => {
    res.status(500).send({
      error: error
    })
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Produto.destroy({ where: { id_produto: id } }).then(() => {
    res.status(201).send({
      mensagem: "Produto excluido!"
    })
  }).catch((error) => {
    res.status(500).send({
      error: error
    })
  })
})


module.exports = router;
