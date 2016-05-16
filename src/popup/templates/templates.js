import helpers from './helpers'

;(function templates (_w, _hb, __h) {
  const $main = _w.document.querySelector('main')

  const sources = {
    smart: _w.document.getElementById('templates-smart').innerHTML,
    date: _w.document.getElementById('templates-date').innerHTML,
    active: _w.document.getElementById('templates-active').innerHTML
  }

  function compileIntoTemplates (sources) {
    const compiledTemplates = {}
    Object.keys(sources).forEach(sourceKey => {
      compiledTemplates[sourceKey] = _hb.compile(sources[sourceKey])
    })
    return compiledTemplates
  }

  function registerHandlebarsHelpers () {
    Object.keys(__h).forEach(helperKey => {
      _hb.registerHelper(helperKey, __h[helperKey])
    })
  }

  _w.addEventListener('message', event => {
    const [command, name, context] = [event.data.command, event.data.name, event.data.context]

    if (command === 'render') {
      $main.innerHTML = compiledTemplates[name](context)

      event.source.postMessage({
        command: 'render-done'
      }, event.origin)
    }
  })

  registerHandlebarsHelpers()
  const compiledTemplates = compileIntoTemplates(sources)
}(window, Handlebars, helpers))
