const express = require('express')
const app = express()
const morgan = require('morgan')
const rotaProdutos = require('./routes/produtos')
const rotaPedidos = require('./routes/pedidos')
const bodyParser = require('body-parser')

//MODELS
const Pedido = require('./models/pedido')



app.use(bodyParser.urlencoded({extended: false})) //apenas dados simples
app.use(bodyParser.json()) //so aceita json

app.use(morgan())
app.use('/produtos',rotaProdutos)
app.use('/pedidos',rotaPedidos)

//CORS() - controle na API
app.use((req,res)=>{
  res.header('Acces-Control-Allow-Origin','*')
  res.header('Acces-Control-Allow-Header','Content-type, Accept, Authorization')
  if(req.method === 'OPTIONS'){
    res.render('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
    return res.status(200).send({})
  }
  next()
})

//SE NAO ENCONTROU ROTA, PASSA AQUI EM BAIXO
/*app.use((req,res)=>{
  const erro = new Error('Nao encontrado a rota')
  erro.status(404)
  next(erro)
})

app.use((error,req,res)=>{
  res.status(error.status || 500)
  return res.send({
    error: { 
      msg: error.message
    }
  })
})*/

const port = 8089
app.listen(port,()=>{
  console.log('rodando')
})
