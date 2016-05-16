import helpers from './helpers'

;(function templates (_w, _hb, __h) {
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

  function generateHtmlFromContext (event) {
    const [command, context, mode] = [event.data.command, event.data.context, event.data.mode]
    const templateHtml = compiledTemplates[mode](context)
    const origin = event.origin || event.originalEvent.origin

    if (command === 'render-request') {
      event.source.postMessage({
        command: 'render-response',
        templateHtml: templateHtml
      }, origin)
    }
  }

  __h.register()
  _w.addEventListener('message', generateHtmlFromContext, false)
  const compiledTemplates = compileIntoTemplates(sources)
}(window, Handlebars, helpers))
