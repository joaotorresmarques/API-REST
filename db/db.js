const Sequelize = require('sequelize')
const sequelize = new Sequelize('api-rest','root','',{
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}