/**
 * Home Routes.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

import express from 'express'
import { HomeController } from '../controllers/homeController.js'

export const router = express.Router()

const controller = new HomeController()

// GET
router.get('/', controller.index)
