const helpers = (function helpers () {
  return {
    'active': (barks, options) => {
      let html = '<ul>'
      barks.forEach(bark => {
        html += `<li>${options.fn(bark)}</li>`
      })
      return `${html}</ul>`
    },

    'date': (barks, options) => {
      let html = '<ul>'
      barks.forEach(bark => {
        html += `<li>${options.fn(bark)}</li>`
      })
      return `${html}</ul>`
    },

    'smart': (barks, options) => {
      let html = '<ul>'
      barks.forEach(bark => {
        html += `<li>${options.fn(bark)}</li>`
      })
      return `${html}</ul>`
    }
  }
}())

export default helpers
