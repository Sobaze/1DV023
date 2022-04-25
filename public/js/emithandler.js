/**
 * Starting point for the application.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

const issueTemplate = document.querySelector('#issue-template')
if (issueTemplate) {
  // server socket
  const socket = window.io('https://cscloud9-32.lnu.se/', { path: '/issues-app/socket.io' })

  // ngrok socket for testing locally
  // const socket = window.io('https://e7f9-194-47-188-32.ngrok.io/', { path: '/socket.io' })

  socket.on('issue', arg => {
    emithandler(arg)
  })
}

const emithandler = (arg) => {
  const existingIssues = document.querySelector('.surround')

  if (existingIssues.querySelector(`[issue-id="${arg.iid}"]`)) {
    const issueNode = issueTemplate.content.cloneNode(true)

    const title = issueNode.querySelector('h5')
    const user = issueNode.querySelector('.theUser')
    const img = issueNode.querySelector('img')
    const issueId = issueNode.querySelector('.numberOfTheIssue')
    const description = issueNode.querySelector('.descriptForIssue')
    const state = issueNode.querySelector('.stateOfIssue')

    title.textContent = 'Title: ' + arg.title
    user.textContent = 'User: ' + arg.user
    img.setAttribute('src', arg.avatarUrl)
    issueId.setAttribute('issue-id', arg.iid)
    issueId.textContent = 'Issue: ' + arg.iid
    description.textContent = 'Description: ' + arg.description
    state.textContent = 'State: ' + arg.state

    existingIssues.appendChild(issueNode)
  }
}

emithandler()
