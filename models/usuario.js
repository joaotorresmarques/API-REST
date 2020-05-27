const db = require('../db/db')
const Usuario = db.sequelize.define('usuarios',{
  id_usuario: {
    type: db.Sequelize.INTEGER,
    primaryKey: true
  },
  email: { type: db.Sequelize.STRING},
  senha: { type: db.Sequelize.STRING}
})

module.exports = Usuario