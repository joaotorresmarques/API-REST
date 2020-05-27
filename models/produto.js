const db = require('../db/db')
const Produto = db.sequelize.define('produtos',{
  id_produto: {
    type: db.Sequelize.INTEGER,
    primaryKey: true
  },
  nome: {
    type: db.Sequelize.STRING
  },
  preco: {
    type: db.Sequelize.DOUBLE
  },
  imagem_produto:{
    type: db.Sequelize.INTEGER
  }

})

module.exports = Produto;