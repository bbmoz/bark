;(function helpers (_h) {
  _h.registerHelper('active-list', (barks, options) => {
    let html = '<ul>'
    barks.forEach(bark => {
      html += `<li>${options.fn(bark)}</li>`
    })
    return `${html}</ul>`
  })

  _h.registerHelper('date-list', (barks, options) => {
    let html = '<ul>'
    barks.forEach(bark => {
      html += `<li>${options.fn(bark)}</li>`
    })
    return `${html}</ul>`
  })

  _h.registerHelper('smart-list', (barks, options) => {
    let html = '<ul>'
    barks.forEach(bark => {
      html += `<li>${options.fn(bark)}</li>`
    })
    return `${html}</ul>`
  })
}(Handlebars))
