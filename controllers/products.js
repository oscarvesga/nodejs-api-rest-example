'use strict'

const Product = require('../models/products')

function getProduct(req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: `GET Error petition: ${err}`})
        if (!product) return res.status(404).send({message: 'Product not find'})

        res.status(200).send({product});
    })
}

function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: `GET Error petition: ${err}`})
        if (!products) return res.status(404).send({message: 'Products not find'})

        res.status(200).send({ products });  
    })
}

function saveProduct(req, res) {
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
}

function updateProduct(req, res) {
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
        if (err) res.status(500).send({message: `PUT Error: ${err}`})

        res.status(200).send({ product: productUpdate })
    })
}

function deleteProduct(req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({message: `DELETE Error: ${err}`})

        product.remove(err => {
            if (err) res.status(500).send({message: `DELETE error: ${err}`})
            res.status(200).send({message: `El producto ha sido eliminado`})
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}