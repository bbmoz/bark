;(function templates (_d, _h) {
  var sources = {
    active: _d.getElementById('active-template').innerHTML,
    date: _d.getElementById('date-template').innerHTML,
    smart: _d.getElementById('smart-template').innerHTML
  }

  function compileIntoTemplates (sources) {
    var templates = {}
    Object.keys(sources).forEach(function (sourceKey) {
      templates[sourceKey] = _h.compile(sources[sourceKey])
    })
    return templates
  }

  var templates = compileIntoTemplates(sources)

  // test context
  var testContext = {
    barks: [{
      name: 'bark #1'
    }, {
      name: 'bark #2'
    }, {
      name: 'bark #3'
    }]
  }
  var mainHtml = templates.smart(testContext)
  _d.querySelector('main').innerHTML = mainHtml
}(document, Handlebars))
