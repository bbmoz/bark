export default (function helpers (_hb) {
  const unregisteredHelpers = {
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

  return {
    register: () => {
      Object.keys(unregisteredHelpers).forEach(helperKey => {
        _hb.registerHelper(helperKey, unregisteredHelpers[helperKey])
      })
    }
  }
}(Handlebars))
