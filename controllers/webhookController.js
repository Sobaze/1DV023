/**
 * Home Controller.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */

export class WebhookController {
  /**
   * To set up our webhook.
   *
   * @param {object} req - Express a request object.
   * @param {object} res - Express a response object.
   * @param {Function} next - Express middleware function /error handling.
   */
  async index (req, res, next) {
    let issueData = null
    if (req.body.event_type === 'issue') {
      issueData = {
        description: req.body.object_attributes.description,
        iid: req.body.object_attributes.iid,
        issueURL: req.body.object_attributes.url,
        title: req.body.object_attributes.title,
        state: req.body.object_attributes.state,
        user: req.body.user.name,
        avatarUrl: req.body.user.avatar_url
      }
    }
    if (issueData) {
      res.io.emit('issue', issueData)
    }
    next()
  }

  authorize (req, res, next) {
    if (req.headers['x-gitlab-token'] !== process.env.X_GITLAB_TOKEN) {
      res.status(403).send('This is not the correct secret!')
      return
    }
    next()
  }
}
