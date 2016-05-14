;(function renderer (_d, _h) {
  const sources = {
    active: _d.getElementById('active-template').innerHTML,
    date: _d.getElementById('date-template').innerHTML,
    smart: _d.getElementById('smart-template').innerHTML
  }

  function compileIntoTemplates (sources) {
    const templates = {}
    Object.keys(sources).forEach(sourceKey => {
      templates[sourceKey] = _h.compile(sources[sourceKey])
    })
    return templates
  }

  const templates = compileIntoTemplates(sources)

  // test context
  const testContext = {
    barks: [{
      name: 'bark #1'
    }, {
      name: 'bark #2'
    }, {
      name: 'bark #3'
    }]
  }
  const mainHtml = templates.smart(testContext)
  _d.querySelector('main').innerHTML = mainHtml
}(document, Handlebars))
