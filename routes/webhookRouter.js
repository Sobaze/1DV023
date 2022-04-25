/**
 * Home Routes.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

import express from 'express'
import { WebhookController } from '../controllers/webhookController.js'

export const router = express.Router()

const controller = new WebhookController()

// POST
router.post('/issue', controller.authorize, controller.index, controller.acceptHook)
