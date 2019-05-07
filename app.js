'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/products')

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/products', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: `GET Error petition: ${err}`})
        if (!products) return res.status(404).send({message: 'Products not find'})

        res.status(200).send({ products });  
    })
})

app.get('/api/products/:productId', (req, res) => {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: `GET Error petition: ${err}`})
        if (!product) return res.status(404).send({message: 'Product not find'})

        res.status(200).send({product});
    })
})

app.post('/api/products', (req, res) => {
    console.log('POST /api/products')
    console.log(req.body)

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored) => {
        if (err) res.status(500).send({message: `POST Error: ${err}`})

        res.status(200).send({product: productStored})
    })
})

app.put('/api/products/:productId', (req, res) => {
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
        if (err) res.status(500).send({message: `PUT Error: ${err}`})

        res.status(200).send({ product: productUpdate })
    })
})

app.delete('/api/products/:productId', (req, res) => {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({message: `DELETE Error: ${err}`})

        product.remove(err => {
            if (err) res.status(500).send({message: `DELETE error: ${err}`})
            res.status(200).send({message: `El producto ha sido eliminado`})
        })
    })
})

mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true }, (err, res) => {
    if(err) {
        return console.log(`DB connect error ${err}`)
    }
    console.log('DB connect success')

    app.listen(port, () => {
        console.log(`Node server running on http://localhost:${port}`)
    })
})