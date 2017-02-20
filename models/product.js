'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductScheme = Schema({
  name: String,
  picture: String,
  price: { type: Number, default: 0 },
  category: { type: String, enum: ['computer', 'phones', 'accesories'] },
  description: String
})

module.exports = mongoose.model('Product',ProductScheme)
