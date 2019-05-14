'use strict'

const express = require('express')
const api = express.Router()
const productCtrl = require('../controllers/products')
const userCtrl = require('../controllers/users')
const auth = require('../middleware/auth')

api.get('/products', productCtrl.getProducts)
api.get('/products/:productId', productCtrl.getProduct)
api.post('/products', auth, productCtrl.saveProduct)
api.put('/products/:productId', auth, productCtrl.updateProduct)
api.delete('/products/:productId', auth, productCtrl.deleteProduct)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: `Access allowed` })
})

module.exports = api