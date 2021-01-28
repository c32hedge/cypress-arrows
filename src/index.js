'use strict'

/* global Cypress */
const codes = {
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40
}

function keydownCommand ($el, key) {
  const message = `sending the "${key}" keydown event`
  const log = Cypress.log({
    name: `keydown: ${key}`,
    message: message,
    consoleProps: function () {
      return {
        Subject: $el
      }
    }
  })

  const e = $el.createEvent('KeyboardEvent')

  Object.defineProperty(e, 'key', {
    get: function () {
      return key
    }
  })

  Object.defineProperty(e, 'keyCode', {
    get: function () {
      return this.keyCodeVal
    }
  })
  Object.defineProperty(e, 'which', {
    get: function () {
      return this.keyCodeVal
    }
  })
  var metaKey = false

  Object.defineProperty(e, 'metaKey', {
    get: function () {
      return metaKey
    }
  })

  Object.defineProperty(e, 'shiftKey', {
    get: function () {
      return false
    }
  })
  e.keyCodeVal = codes[key]

  e.initKeyboardEvent('keydown', true, true,
    $el.defaultView, false, false, false, false, e.keyCodeVal, e.keyCodeVal)

  $el.dispatchEvent(e)
  log.snapshot().end()
  return $el
}

Cypress.Commands.add('keydown', { prevSubject: "dom" }, keydownCommand)
Cypress.Commands.add('left', { prevSubject: "dom" }, $el => keydownCommand($el, 'ArrowLeft'))
Cypress.Commands.add('right', { prevSubject: "dom" }, $el => keydownCommand($el, 'ArrowRight'))
Cypress.Commands.add('up', { prevSubject: "dom" }, $el => keydownCommand($el, 'ArrowUp'))
Cypress.Commands.add('down', { prevSubject: "dom" }, $el => keydownCommand($el, 'ArrowDown'))
