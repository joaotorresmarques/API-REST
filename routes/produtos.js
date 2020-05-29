const express = require("express")
const router = express.Router()

const multer = require('multer')
const login = require('../middleware/login')

const ProdutoController = require('../controllers/produtos-controller')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/')
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 }
}); //multer({ dest: 'uploads/' })

router.post('/', upload.single('produto_imagem'), login,ProdutoController.postProduto)
router.get('/', ProdutoController.getProdutos)
router.get('/:id', ProdutoController.UmProduto)
router.patch('/:id', ProdutoController.EditarProduto)
router.delete('/:id', ProdutoController.deletarProduto)


module.exports = router;
