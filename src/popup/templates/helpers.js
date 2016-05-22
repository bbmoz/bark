import { Handlebars } from './../globals'

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

export default {
  register: () => {
    Object.keys(unregisteredHelpers).forEach(helperKey => {
      Handlebars.registerHelper(helperKey, unregisteredHelpers[helperKey])
    })
  }
}
