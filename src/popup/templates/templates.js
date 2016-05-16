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

  function getHeight () {
    const [body, html] = [_w.document.body, _w.document.documentElement]

    return Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    )
  }

  $main.innerHTML = 'did this work?'

  _w.addEventListener('message', event => {
    const [command, context, mode] = [event.data.command, event.data.context, event.data.mode]

    $main.innerHTML = command

    if (command === 'render') {
      $main.innerHTML = compiledTemplates[mode](context)

      event.source.postMessage({
        command: 'render-done',
        height: getHeight()
      }, event.origin || event.originalEvent.origin)
    }
  }, false)

  registerHandlebarsHelpers()
  const compiledTemplates = compileIntoTemplates(sources)
}(window, Handlebars, helpers))
