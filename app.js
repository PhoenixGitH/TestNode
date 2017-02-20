'use strict'

const express = require('express')
const body_parser = require('body-parser')

// Generate the app via express.
const app = express()
const api = require('./routes') // This will use index.js as default.

// Add body_parser to use json and urlencoded.
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())
app.use('/api',api)


module.exports = app
