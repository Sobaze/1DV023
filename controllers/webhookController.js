/**
 * Home Controller.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

export class WebhookController {
  /**
   * Renders a view to the Home page. Where we fetch open and closed issues from out gitlab repo.
   *
   * @param {object} req - Express a request object.
   * @param {object} res - Express a response object.
   * @param {Function} next - Express middleware function /error handling.
   */
  index (req, res, next) {
    try {
      // const io = req.app.get('socketio')
      if (req.headers['x-gitlab-token'] !== process.env.X_GITLAB_TOKEN) {
        res.status(403).send('This is not the correct secret!')
      } else {
        console.log(req.body)
        const dataToEmit = {
          action: req.body
        }
        res.io.emit('issue', dataToEmit)
        res.status(200).send('Hook accepted')
      }
    } catch (error) {
      next(error)
    }
  }
}
