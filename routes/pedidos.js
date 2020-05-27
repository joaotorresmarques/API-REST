const express = require('express')
const router = express.Router()
const Pedido = require('../models/pedido')
const Produto = require('../models/produto') //VERIFICAR SE EXISTE PRODUTO CADASTRADO PARA USAR NO POST DE PEDIDO

router.get('/', (req, res) => {
  Pedido.findAll().then((x) => {
    const response = {
      quantidade: x.length,
      pedidos: x.map(ped => {
        return {
          id_pedido: ped.id_pedido,
          quantidade: ped.quantidade,
          id_produto: ped.id_produto
        }
      })
    }
    res.status(200).send(response)
  }).catch((error) => {
    res.status(500).send({
      error: error
    })
  })
})

router.post('/', (req, res) => {

  Produto.findAll().then((x) => {
    const qtd = x.length;

    if(qtd != 0){} //ENCONTROU PRODUTO?

    Pedido.create({
      quantidade: req.body.qtd,
      id_produto: req.body.id_produto
    }).then((x) => {
      const response = {
        msg: "Pedido inserido com sucesso",
        pedidoCriado: {
          quantidade: req.body.qtd,
          id_produto: req.body.id_produto
        }
      }
      res.status(201).send(response)

    }).catch((error) => {
      res.status(500).send({
        error: error
      })
    })
  })
}) //FIM PRODUTO

module.exports = router;