'use strict'

const express = require('express')
const api = express.Router()
const productCtrl = require('../controllers/products')

api.get('/products', productCtrl.getProducts)
api.get('/products/:productId', productCtrl.getProduct)
api.post('/products', productCtrl.saveProduct)
api.put('/products/:productId', productCtrl.updateProduct)
api.delete('/products/:productId', productCtrl.deleteProduct)

module.exports = api