/**
 * Home Routes.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/webhookController')

// POST
router.post('/', controller.index)

// Exports.
module.exports = router
