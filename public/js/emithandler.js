/**
 * Starting point for the application.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

// const socket = window.io('https://cscloud9-32.lnu.se/', { path: '/issues-app/socket.io' })

const issueTemplate = document.querySelector('#issue-template')
if (issueTemplate) {
  const socket = window.io('https://e7f9-194-47-188-32.ngrok.io/', { path: '/socket.io' })

  socket.on('issue', arg => {
    emithandler(arg)
  })
}

const emithandler = (arg) => {
  const existingIssues = document.querySelector('#surround')

  if (!existingIssues.querySelector(`[issue-id="${arg.iid}]`)) {
    console.log('issue finns redan')
  }
}

emithandler()
