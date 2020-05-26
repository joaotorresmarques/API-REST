const db = require('../db/db')
const Pedido = db.sequelize.define('pedidos',{
  id_pedido: {
    type: db.Sequelize.INTEGER,
    primaryKey: true
  },
  quantidade: {
    type: db.Sequelize.INTEGER
  },
  id_produto: {
    type: db.Sequelize.SMALLINT,
    references: {
      model: 'produtos',
      key: 'id_produto'
    }
  }
})

module.exports = Pedido;