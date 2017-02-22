'use strict'

// Data base models
const Product = require('../models/product')

function getProducts (req, res) {
  Product.find({}, (err, products) => {
    if (err) {
      res.status(500).send({ message: 'Error al recuperar los productos' })
    }
    if (!products) {
      res.status(404).send({ message: 'No existe productos' })
    }
    console.log(`Productos recuperados: ${products}`)
    // Just specify product as the key and the value has the same name.
    res.status(200).send({products})
  })
}

function getProduct (req, res) {
  console.log('GET /api/product/productId')

  // Store the params in variables.
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) {
      res.status(500).send({ message: 'Error al recuperar el objeto indicado' })
    }
    if (!product) {
      res.status(404).send({ message: 'No existe un producto con ese id' })
    }
    console.log(`Producto recuperado: ${product}`)
    // Just specify product as the key and the value has the same name.
    res.status(200).send({product})
  })
}

function sendProduct (req, res) {
  /* Testing post.
  console.log(req.body)
  res.status(200).send({message: 'El producto se ha recibido'}) */
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) {
      res.status(500).send({message: `Error al salvar producto en la base de datos: ${err}`})
    }
    res.status(200).send({product: productStored})
  })
}

function updateProduct (req, res) {
  console.log('PUT /api/product/productId')

  let productId = req.params.productId
  /* Not do the things like this.
    Product.findById(productId, (err,product) => {
    if(err) return res.status(500).send( { message: 'Error al recuperar el objeto indicado' })
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body. price
    product.category = req.body.category
    product.description = req.body.description
    product.save((err,productStored) => {
      if(err) return res.status(500).send({ message: `Error al salvar producto con id: ${productId} en la base: ${err}` })
      res.status(200).send({ message: 'Se ha guardado el producto correctamente. '})
    })
  }) */
  // This is the correct one.
  // The object that contains de data is de request body.
  Product.findByIdAndUpdate(productId, req.body, (err, productUpdate) => {
    if (err) {
      res.status(500).send({ message: `Error al actualizar producto con id: ${productId} en la base: ${err}` })
    }
    if (!productUpdate) {
      res.status(404).send({ message: 'No existe un producto con ese id' })
    }
    res.status(200).send({message: `Se ha guardado el producto correctamente: ${productUpdate}`})
  })
}

function deleteProduct (req, res) {
  let productId = req.params.productId
  Product.findById(productId, (err, product) => {
    if (err) {
      res.status(500).send({ message: `Error al borrar el producto : ${err}` })
    }
    if (!product) {
      res.status(404).send({ message: 'No existe producto con ese id' })
    }
    product.remove(err => {
      if (err) {
        res.status(500).send({ message: `Error al borrar el producto : ${err}` })
      }
      res.status(200).send({ message: `Producto con id: ${productId} eliminado.` })
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  updateProduct,
  sendProduct,
  deleteProduct
}
