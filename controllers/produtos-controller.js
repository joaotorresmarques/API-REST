const Produto = require('../models/produto')
exports.postProduto = (req, res) => {
  console.log(req.file.path)
  Produto.create({
    nome: req.body.nome,
    preco: req.body.preco,
    imagem_produto: req.file
  }).then((x) => {
    const response = {
      mensagem: "Produto inserido",
      produtoCriado: {
        nome: req.body.nome,
        preco: req.body.preco,
        request: {
          tipo: 'POST',
          descricao: "inserir produto",
          url: "http://localhost:8089/produtos"
        },
        img: {
          name: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size
        }
      }
    }
    /*res.status(201).send({
      mensagem: "Produto inserido"
    })*/
    res.status(201).send({ response })
  }).catch((error) => {
    res.status(500).send({
      error: error
    })
  })
}

exports.getProdutos = (req, res) => {
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
}

exports.UmProduto = (req, res) => {
  const id = req.params.id
  Produto.findAll({ where: { id_produto: id } }).then((x) => {
    res.status(200).send({ produtos: x })
  }).catch((error) => {
    res.status(500).send({
      error: error
    })
  })
}

exports.EditarProduto = (req, res) => {
  const id = req.params.id
  Produto.update({
    nome: req.body.nome,
    preco: req.body.preco
  }, {
    where: { id_produto: id }
  }).then(() => {
    res.status(200).send({
      mensagem: "Produto alterado!"
    })
  }).catch((error) => {
    res.status(500).send({
      error: error
    })
  })
}
exports.deletarProduto = (req, res) => {
  const id = req.params.id
  Produto.destroy({ where: { id_produto: id } }).then(() => {
    res.status(200).send({
      mensagem: "Produto excluido!"
    })
  }).catch((error) => {
    res.status(500).send({
      error: error
    })
  })
}