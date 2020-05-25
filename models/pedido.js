const db = require('../db/db')
const Pedido = db.sequelize.define('pedidos',{
  quantidade: {
    type: db.Sequelize.INTEGER
  }
})

module.exports = Pedido;