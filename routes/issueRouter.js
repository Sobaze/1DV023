/**
 * Issue Routes.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

import express from 'express'
import { IssueController } from '../controllers/issueController.js'

export const router = express.Router()

const controller = new IssueController()

// GET
router.put('/:id', controller.index)
