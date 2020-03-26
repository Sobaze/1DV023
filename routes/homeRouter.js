/**
 * Home Routes.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/homeController')

// GET
router.get('/', controller.index)

// Exports.
module.exports = router
