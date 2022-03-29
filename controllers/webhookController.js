/**
 * Home Controller.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

const issuesController = {}

/**
 * Renders a view to the Home page. Where we fetch open and closed issues from out gitlab repo.
 *
 * @param {object} req - Express a request object.
 * @param {object} res - Express a response object.
 */
issuesController.index = (req, res) => {
  res.render('home/index')
}

// Exports.
module.exports = issuesController
