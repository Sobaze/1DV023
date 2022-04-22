/**
 * Home Controller.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */

export class IssueController {
  async createNewIssue (req, res, next) {
    // console.log(req.body)
    try {
      const dataToEmit = {
        author: req.body.author,
        avatar: req.body.avatar,
        title: req.body.title,
        description: req.body.description,
        state: req.body.state,
        id: req.body.id
      }
      if (req.headers['x-gitlab-event']) {
        res.status(200).send('Hook accepted')
        return
      }
      console.log(dataToEmit)
      res.io.emit('issue', dataToEmit)
    } catch (error) {
      console.log(error)
    }
  }
}
