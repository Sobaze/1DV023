/**
 * Starting point for the application.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

const socket = window.io('https://cscloud9-32.lnu.se/', { path: '/test/socket.io' })

const emithandler = () => {
  socket.on('issue', () => {
    console.log('new issue is up')
  })
}

emithandler()
