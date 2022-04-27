/**
 * Starting point for the application.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */

const issueTemplate = document.querySelector('#issue-template')
// server socket
const socket = window.io('https://cscloud9-32.lnu.se/', { path: '/issues-app/socket.io' })

// ngrok socket for testing locally
// const socket = window.io('https://fac8-2001-2043-1e03-4e00-51df-933e-fba8-3a1d.ngrok.io', { path: '/socket.io' })
if (issueTemplate) {
  socket.on('issue', arg => {
    emithandler(arg)
  })
}
// Issue emithandler, that will create or update issues on our sire
const emithandler = (arg) => {
  const existingIssues = document.querySelector('.surround')

  // If issue does not exists we will create a new one from template
  if (!existingIssues.querySelector(`[issue-id="${arg.iid}"]`)) {
    const issueNode = issueTemplate.content.cloneNode(true)

    const headDiv = issueNode.querySelector('.issueSquareContent')
    const title = issueNode.querySelector('h5')
    const user = issueNode.querySelector('.theUser')
    const img = issueNode.querySelector('img')
    const issueId = issueNode.querySelector('.numberOfTheIssue')
    const description = issueNode.querySelector('.descriptForIssue')
    const state = issueNode.querySelector('.stateOfIssue')

    headDiv.setAttribute('issue-id', arg.iid)
    title.textContent = 'Title: ' + arg.title
    user.textContent = 'User: ' + arg.user
    img.setAttribute('src', arg.avatarUrl)
    issueId.textContent = 'Issue: ' + arg.iid
    description.textContent = 'Description: ' + arg.description
    state.textContent = 'State: ' + arg.state

    existingIssues.prepend(issueNode)
  }
  // If the issue exist already it will be needed to be updated
  if (existingIssues.querySelector(`[issue-id="${arg.iid}"]`)) {
    const issue2Update = document.querySelector(`[issue-id="${arg.iid}"]`)
    const title = issue2Update.querySelector('h5')
    const issueId = issue2Update.querySelector('.numberOfTheIssue')
    const description = issue2Update.querySelector('.descriptForIssue')
    const state = issue2Update.querySelector('.stateOfIssue')

    title.textContent = 'Title: ' + arg.title
    issueId.setAttribute('issue-id', arg.iid)
    issueId.textContent = 'Issue: ' + arg.iid
    description.textContent = 'Description: ' + arg.description
    state.textContent = 'State: ' + arg.state
  }
}
const surrouddd = document.querySelector('.surround')
surrouddd.addEventListener('click', (e) => {
  const isButton = e.target.nodeName === 'BUTTON'
  if (isButton) {
    const id = e.target.value
    if (e.target.id === 'open') {
      socket.emit('open', id)
    }
    if (e.target.id === 'close') {
      socket.emit('close', id)
    }
  }
})
