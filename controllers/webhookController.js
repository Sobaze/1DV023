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

  // Authorizes our connection to the gitlab repo.
  authorize (req, res, next) {
    if (req.headers['x-gitlab-token'] !== process.env.X_GITLAB_TOKEN) {
      res.status(403).send('This is not the correct secret!')
      return
    }
    next()
  }

  // Accept the hook call and returns a 200 if the hook is recieved
  acceptHook (req, res, next) {
    if (req.headers['x-gitlab-event']) {
      res.status(200).send('Hook accepted')
    }
  }
}
