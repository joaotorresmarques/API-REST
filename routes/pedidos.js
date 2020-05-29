const express = require('express')
const router = express.Router()



const PedidosController = require('../controllers/pedidos-controller')
router.get('/',PedidosController.getPedidos)
router.post('/',PedidosController.postPedidos) //FIM PRODUTO

module.exports = router;