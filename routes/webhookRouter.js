/**
 * Home Routes.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

import express from 'express'
import { WebhookController } from '../controllers/webhookController.js'
import { IssueController } from '../controllers/issueController.js'

export const router = express.Router()

const controller = new WebhookController()
const issueController = new IssueController()

// POST
router.post('/issue', controller.authorize, controller.index, issueController.createNewIssue)
