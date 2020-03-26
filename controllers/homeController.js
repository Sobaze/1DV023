/**
 * Home Controller.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

const homeController = {}

/**
 * Renders a view to the Home page. Where we fetch open and cloed issues from out gitlab repo.
 *
 * @param {object} req - Express a request object.
 * @param {object} res - Express a response object.
 */
homeController.index = (req, res) => {
  res.render('home/index')
}

// Exports.
module.exports = homeController
