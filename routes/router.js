/**
 * Home Routes.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

// const express = require('express')
// const router = express.Router()
// const homeRouter = require('./homeRouter')
// const webhookRouter = require('./webhookRouter')
import express from 'express'
import { router as homeRouter } from './homeRouter.js'
import { router as webhookRouter } from './webhookRouter.js'

export const router = express.Router()

router.use('/', homeRouter)

router.use('/webhook', webhookRouter)

router.use('*', (req, res, next) => {
  const error = new Error()
  error.status = 404
  error.message = 'Not Found'
  next(error)
})
