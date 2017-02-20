'use strict'

const express = require('express')
const api = express.Router()

// Controllers.
const proCrtl = require('../controllers/product')

api.get('/product', proCrtl.getProducts)
// Get product info by id.
api.get('/product/:productId', proCrtl.getProduct)
// Access data via post.
api.post('/product', proCrtl.sendProduct)
// Modify data using product id.
api.put('/product/:productId', proCrtl.updateProduct)
api.delete('/product/:productId', proCrtl.deleteProduct)

module.exports = api
