/**
 * Home Controller.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

const fetch = require('node-fetch')

const homeController = {}

/**
 * Renders a view to the Home page. Where we fetch open and closed issues from out gitlab repo.
 *
 * @param {object} req - Express a request object.
 * @param {object} res - Express a response object.
 * @param {Function} next - Express next error.
 */
homeController.index = async (req, res, next) => {
  try {
    const data = await fetch('https://gitlab.lnu.se/api/v4/projects/941/issues', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'PRIVATE-TOKEN': process.env.PRIVATE_ACCESS_TOKEN
      }
    })
    const issues = await data.json()
    res.render('home/index', { issues })
  } catch (error) {
    next(error)
  }
}

// Exports.
module.exports = homeController
