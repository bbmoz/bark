const helpers = (function helpers () {
  return {
    'active-list': (barks, options) => {
      let html = '<ul>'
      barks.forEach(bark => {
        html += `<li>${options.fn(bark)}</li>`
      })
      return `${html}</ul>`
    },

    'date-list': (barks, options) => {
      let html = '<ul>'
      barks.forEach(bark => {
        html += `<li>${options.fn(bark)}</li>`
      })
      return `${html}</ul>`
    },

    'smart-list': (barks, options) => {
      let html = '<ul>'
      barks.forEach(bark => {
        html += `<li>${options.fn(bark)}</li>`
      })
      return `${html}</ul>`
    }
  }
}())

export default helpers