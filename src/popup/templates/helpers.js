;(function helpers (_h) {
  _h.registerHelper('active-list', function (barks, options) {
    var html = '<ul>'
    barks.forEach(function (bark) {
      html += '<li>' + options.fn(bark) + '</li>'
    })
    return html + '</ul>'
  })

  _h.registerHelper('date-list', function (barks, options) {
    var html = '<ul>'
    barks.forEach(function (bark) {
      html += '<li>' + options.fn(bark) + '</li>'
    })
    return html + '</ul>'
  })

  _h.registerHelper('smart-list', function (barks, options) {
    var html = '<ul>'
    barks.forEach(function (bark) {
      html += '<li>' + options.fn(bark) + '</li>'
    })
    return html + '</ul>'
  })
}(Handlebars))
