export default (function helpers (_hb) {
  const unregisteredHelpers = {
    smart: (contextArray, options) => {
      let html = '<ul>'
      contextArray.forEach(context => {
        html += `<li>${options.fn(context)}</li>`
      })
      return `${html}</ul>`
    },

    standard: (contextArray, options) => {
      let html = '<ul>'
      contextArray.forEach(context => {
        html += `<li>${options.fn(context)}</li>`
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
